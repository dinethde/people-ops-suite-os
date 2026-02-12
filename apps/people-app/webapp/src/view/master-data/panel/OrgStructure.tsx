// Copyright (c) 2026 WSO2 LLC. (https://www.wso2.com).
//
// WSO2 LLC. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied. See the License for the
// specific language governing permissions and limitations
// under the License
import { Box } from "@mui/material";

import { useEffect, useState } from "react";

import ErrorHandler from "@component/common/ErrorHandler";
import PreLoader from "@component/common/PreLoader";
import { EXPANDED_NODES_KEY } from "@root/src/config/constant";
import { useGetOrgStructureQuery } from "@services/organization";

import OrgStructureTree from "./components/OrgStructureTree";

export default function OrgStructure() {
  const { data: orgStructure, isLoading, isError } = useGetOrgStructureQuery();

  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(() => {
    const stored = sessionStorage.getItem(EXPANDED_NODES_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  useEffect(() => {
    sessionStorage.setItem(EXPANDED_NODES_KEY, JSON.stringify(Array.from(expandedNodes)));
  }, [expandedNodes]);

  // Expand company by default when data loads
  useEffect(() => {
    if (orgStructure && !expandedNodes.has(orgStructure.id)) {
      setExpandedNodes(new Set([orgStructure.id]));
    }
  }, [orgStructure]);

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleEdit = (id: string, type: string) => {
    console.log(`Edit ${type} with id: ${id}`);
    // Implement edit functionality here
  };

  const handleAdd = (id: string, type: string) => {
    console.log(`Add to ${type} with id: ${id}`);
    // Implement add functionality here
  };

  if (isLoading) {
    return <PreLoader isLoading message="Loading organization structure ..." />;
  }

  if (isError) {
    return <ErrorHandler message="Failled to load organization structure" />;
  }

  if (!orgStructure) {
    return <ErrorHandler message="No organization structure data available" />;
  }

  return (
    <Box
      sx={{
        p: 1,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        overflowX: "auto",
        overflowY: "auto",
        height: "100%",
      }}
    >
      {/* Display organization structure as centered tree */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "64px",
          minWidth: "max-content",
        }}
      >
        <OrgStructureTree
          company={orgStructure}
          expandedNodes={expandedNodes}
          onToggle={toggleNode}
          onEdit={handleEdit}
          onAdd={handleAdd}
        />
      </Box>
    </Box>
  );
}
