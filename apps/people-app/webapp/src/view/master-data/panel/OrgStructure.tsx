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
import { Box, Typography } from "@mui/material";

import { useState } from "react";

import { useGetOrgStructureQuery } from "@root/src/services/orgStructure";

import OrgStructureTree from "./components/OrgStructureTree";

export default function OrgStructure() {
  const { data: orgStructure, isLoading, isError } = useGetOrgStructureQuery();
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

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
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading organization structure...</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Failed to load organization structure</Typography>
      </Box>
    );
  }

  if (!orgStructure || orgStructure.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>No organization structure data available</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        overflowX: "auto",
        overflowY: "auto",
        height: "100%",
      }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        Organization Structure
      </Typography>

      {/* Display organization structure as vertical tree */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "64px",
          minWidth: "max-content",
          pb: 4,
        }}
      >
        {orgStructure.map((businessUnit) => (
          <OrgStructureTree
            key={businessUnit.id}
            node={businessUnit}
            type="BUSINESS_UNIT"
            depth={0}
            expandedNodes={expandedNodes}
            onToggle={toggleNode}
            onEdit={handleEdit}
            onAdd={handleAdd}
          />
        ))}
      </Box>
    </Box>
  );
}
