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
import {
  BusinessUnit,
  Company,
  SubTeam,
  Team,
  Unit,
  useGetOrgStructureQuery,
} from "@services/organization";

import { EditModal } from "./components/EditModal";
import OrgStructureTree from "./components/OrgStructureTree";

export default function OrgStructure() {
  const { data: orgStructure, isLoading, isError } = useGetOrgStructureQuery();
  const [editModal, setEditModal] = useState<
    {
      open: boolean;
      data: Company | BusinessUnit | Team | SubTeam | Unit | null;
      type: string
    }
  >(
    {
      open: false,
      data: null,
      type: ""
    }
  );

  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(() => {
    const stored = sessionStorage.getItem(EXPANDED_NODES_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  useEffect(() => {
    sessionStorage.setItem(EXPANDED_NODES_KEY, JSON.stringify(Array.from(expandedNodes)));
  }, [expandedNodes]);

  const findNodeById = (
    id: string,
    type: string,
  ): Company | BusinessUnit | Team | SubTeam | Unit | null => {
    if (!orgStructure) return null;

    if (type === "COMPANY" && orgStructure.id === id) {
      return orgStructure;
    }

    // Search in business units
    if (type === "BUSINESS_UNIT") {
      return orgStructure.businessUnits?.find((bu) => bu.id === id) || null;
    }

    // Search in teams
    if (type === "TEAM") {
      for (const bu of orgStructure.businessUnits || []) {
        const team = bu.teams?.find((t) => t.id === id);
        if (team) return team;
      }
    }

    // Search in sub teams
    if (type === "SUB_TEAM") {
      for (const bu of orgStructure.businessUnits || []) {
        for (const team of bu.teams || []) {
          const subTeam = team.subTeams?.find((st) => st.id === id);
          if (subTeam) return subTeam;
        }
      }
    }

    // Search in units
    if (type === "UNIT") {
      for (const bu of orgStructure.businessUnits || []) {
        for (const team of bu.teams || []) {
          for (const subTeam of team.subTeams || []) {
            const unit = subTeam.units?.find((u) => u.id === id);
            if (unit) return unit;
          }
        }
      }
    }

    return null;
  };

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
    const nodeData = findNodeById(id, type);
    console.log("data : ", nodeData)
    if (nodeData) {
      setEditModal({
        open: true,
        data: nodeData,
        type,
      });
    }
  };


  const handleClose = () => {
    setEditModal({
      open: false,
      data: null,
      type: ""
    })
  }

  const handleAdd = (id: string, type: string) => {
    console.log(`Add to ${type} with id: ${id}`);
    // Implement add functionality here
  };

  if (isLoading) {
    return <PreLoader isLoading message="Loading organization structure ..." />;
  }

  if (isError) {
    return <ErrorHandler message="Failed to load organization structure" />;
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

      {
        editModal.open && editModal.data && (
          <EditModal
            open={editModal.open}
            data={editModal.data as BusinessUnit}
            type={editModal.type}
            onClose={handleClose}
          />

        )
      }
    </Box>
  );
}
