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
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
import { Box } from "@mui/material";

import OrgStructureCard from "./OrgStructureCard";

interface OrgStructureTreeProps {
  node: any; // BusinessUnit | Team | SubTeam | Unit
  type: "BUSINESS_UNIT" | "TEAM" | "SUB_TEAM" | "UNIT";
  depth: number;
  expandedNodes: Set<string>;
  onToggle: (id: string) => void;
  onEdit: (id: string, type: string) => void;
  onAdd: (id: string, type: string) => void;
}

const OrgStructureTree = ({
  node,
  type,
  depth,
  expandedNodes,
  onToggle,
  onEdit,
  onAdd,
}: OrgStructureTreeProps) => {
  // Determine if this node has children
  const hasChildren =
    (type === "BUSINESS_UNIT" && node.teams?.length > 0) ||
    (type === "TEAM" && node.subTeams?.length > 0) ||
    (type === "SUB_TEAM" && node.units?.length > 0);

  const isExpanded = expandedNodes.has(node.id);

  // Get children based on node type
  const getChildren = () => {
    switch (type) {
      case "BUSINESS_UNIT":
        return { items: node.teams || [], childType: "TEAM" as const };
      case "TEAM":
        return { items: node.subTeams || [], childType: "SUB_TEAM" as const };
      case "SUB_TEAM":
        return { items: node.units || [], childType: "UNIT" as const };
      default:
        return { items: [], childType: "UNIT" as const };
    }
  };

  const children = getChildren();

  return (
    <Box
      sx={{
        display: "flex",
        gap: "64px",
        alignItems: "flex-start",
        position: "relative",
      }}
    >
      {/* Current Node Card */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0px",
          // mb: type !== "BUSINESS_UNIT" ? "120px" : "0",
        }}
      >
        <OrgStructureCard
          name={node.name}
          type={type}
          headCount={node.headCount}
          teamHead={node.teamHead}
          functionLead={node.functionLead}
          hasChildren={hasChildren}
          isExpanded={isExpanded}
          onCollapse={() => onToggle(node.id)}
          onEdit={() => onEdit(node.id, type)}
          onAdd={() => onAdd(node.id, type)}
        />
      </Box>

      {/* Children - Only render if expanded and has children */}
      {hasChildren && isExpanded && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "64px",
            alignItems: "flex-start",
            position: "relative",
            // mb: "140px"
          }}
        >
          {children.items.map((child: any) => (
            <OrgStructureTree
              key={child.id}
              node={child}
              type={children.childType}
              depth={depth + 1}
              expandedNodes={expandedNodes}
              onToggle={onToggle}
              onEdit={onEdit}
              onAdd={onAdd}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default OrgStructureTree;
