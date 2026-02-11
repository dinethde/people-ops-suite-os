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

import { useLayoutEffect, useRef, useState } from "react";

import { BusinessUnit, Company, SubTeam, Team, Unit } from "@services/orgStructure";

import OrgStructureCard from "./OrgStructureCard";

interface OrgStructureTreeProps {
  company: Company;
  expandedNodes: Set<string>;
  onToggle: (id: string) => void;
  onEdit: (id: string, type: string) => void;
  onAdd: (id: string, type: string) => void;
}

interface Connection {
  parentId: string;
  childId: string;
}

const OrgStructureTree = ({
  company,
  expandedNodes,
  onToggle,
  onEdit,
  onAdd,
}: OrgStructureTreeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [connections, setConnections] = useState<Connection[]>([]);

  // Register card ref
  const registerCardRef = (id: string, element: HTMLDivElement | null) => {
    if (element) {
      cardRefs.current.set(id, element);
    } else {
      cardRefs.current.delete(id);
    }
  };

  // Build connections based on expanded nodes
  useLayoutEffect(() => {
    const newConnections: Connection[] = [];

    // Company -> Business Units
    if (expandedNodes.has(company.id)) {
      company.businessUnits?.forEach((bu) => {
        newConnections.push({ parentId: company.id, childId: bu.id });
      });

      // Business Units -> Teams
      company.businessUnits?.forEach((bu) => {
        if (expandedNodes.has(bu.id)) {
          bu.teams?.forEach((team) => {
            newConnections.push({ parentId: bu.id, childId: team.id });
          });

          // Teams -> Sub Teams
          bu.teams?.forEach((team) => {
            if (expandedNodes.has(team.id)) {
              team.subTeams?.forEach((subTeam) => {
                newConnections.push({ parentId: team.id, childId: subTeam.id });
              });

              // Sub Teams -> Units
              team.subTeams?.forEach((subTeam) => {
                if (expandedNodes.has(subTeam.id)) {
                  subTeam.units?.forEach((unit) => {
                    newConnections.push({ parentId: subTeam.id, childId: unit.id });
                  });
                }
              });
            }
          });
        }
      });
    }

    setConnections(newConnections);
  }, [company, expandedNodes]);

  // Calculate SVG path for arrow with straight lines
  const getArrowPath = (parentId: string, childId: string): string | null => {
    const parentEl = cardRefs.current.get(parentId);
    const childEl = cardRefs.current.get(childId);
    const container = containerRef.current;

    if (!parentEl || !childEl || !container) return null;

    const containerRect = container.getBoundingClientRect();
    const parentRect = parentEl.getBoundingClientRect();
    const childRect = childEl.getBoundingClientRect();

    // Calculate positions relative to container
    const x1 = parentRect.left - containerRect.left + parentRect.width / 2;
    const y1 = parentRect.bottom - containerRect.top;

    // Stop the line 12px before the card edge to leave space for the arrow
    const x2 = childRect.left - containerRect.left;
    const y2 = childRect.top - containerRect.top + childRect.height / 2;

    // Create path with straight lines and right angles
    // Line goes: down from parent -> right -> to child
    return `M ${x1} ${y1} L ${x1} ${y2} L ${x2} ${y2}`;
  };

  const renderUnit = (unit: Unit) => (
    <Box
      key={unit.id}
      sx={{
        display: "flex",
        gap: "16px",
        alignItems: "flex-start",
        position: "relative",
      }}
    >
      <Box
        ref={(el) => registerCardRef(unit.id, el as HTMLDivElement | null)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0px",
        }}
      >
        <OrgStructureCard
          name={unit.name}
          type="UNIT"
          headCount={unit.headCount}
          teamHead={unit.teamHead}
          functionLead={unit.functionLead}
          hasChildren={false}
          isExpanded={false}
          onCollapse={() => { }}
          onEdit={() => onEdit(unit.id, "UNIT")}
          onAdd={() => onAdd(unit.id, "UNIT")}
        />
      </Box>
    </Box>
  );

  const renderSubTeam = (subTeam: SubTeam) => {
    const hasUnits = subTeam.units?.length > 0;
    const isExpanded = expandedNodes.has(subTeam.id);

    return (
      <Box
        key={subTeam.id}
        sx={{
          display: "flex",
          gap: "16px",
          alignItems: "flex-start",
          position: "relative",
        }}
      >
        <Box
          ref={(el) => registerCardRef(subTeam.id, el as HTMLDivElement | null)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0px",
          }}
        >
          <OrgStructureCard
            name={subTeam.name}
            type="SUB_TEAM"
            headCount={subTeam.headCount}
            teamHead={subTeam.teamHead}
            functionLead={subTeam.functionLead}
            hasChildren={hasUnits}
            isExpanded={isExpanded}
            onCollapse={() => onToggle(subTeam.id)}
            onEdit={() => onEdit(subTeam.id, "SUB_TEAM")}
            onAdd={() => onAdd(subTeam.id, "SUB_TEAM")}
          />
        </Box>

        {hasUnits && isExpanded && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "64px",
              alignItems: "flex-start",
              position: "relative",
              mt: "200px",
            }}
          >
            {subTeam.units.map(renderUnit)}
          </Box>
        )}
      </Box>
    );
  };

  const renderTeam = (team: Team) => {
    const hasSubTeams = team.subTeams?.length > 0;
    const isExpanded = expandedNodes.has(team.id);

    return (
      <Box
        key={team.id}
        sx={{
          display: "flex",
          gap: "16px",
          alignItems: "flex-start",
          position: "relative",
        }}
      >
        <Box
          ref={(el) => registerCardRef(team.id, el as HTMLDivElement | null)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0px",
          }}
        >
          <OrgStructureCard
            name={team.name}
            type="TEAM"
            headCount={team.headCount}
            teamHead={team.teamHead}
            functionLead={team.functionLead}
            hasChildren={hasSubTeams}
            isExpanded={isExpanded}
            onCollapse={() => onToggle(team.id)}
            onEdit={() => onEdit(team.id, "TEAM")}
            onAdd={() => onAdd(team.id, "TEAM")}
          />
        </Box>

        {hasSubTeams && isExpanded && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "64px",
              alignItems: "flex-start",
              position: "relative",
              mt: "200px",
            }}
          >
            {team.subTeams.map(renderSubTeam)}
          </Box>
        )}
      </Box>
    );
  };

  const renderBusinessUnit = (bu: BusinessUnit) => {
    const hasTeams = bu.teams?.length > 0;
    const isExpanded = expandedNodes.has(bu.id);

    return (
      <Box
        key={bu.id}
        sx={{
          display: "flex",
          gap: "16px",
          alignItems: "flex-start",
          position: "relative",
        }}
      >
        <Box
          ref={(el) => registerCardRef(bu.id, el as HTMLDivElement | null)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0px",
          }}
        >
          <OrgStructureCard
            name={bu.name}
            type="BUSINESS_UNIT"
            headCount={bu.headCount}
            teamHead={bu.teamHead}
            functionLead={bu.functionLead}
            hasChildren={hasTeams}
            isExpanded={isExpanded}
            onCollapse={() => onToggle(bu.id)}
            onEdit={() => onEdit(bu.id, "BUSINESS_UNIT")}
            onAdd={() => onAdd(bu.id, "BUSINESS_UNIT")}
          />
        </Box>

        {hasTeams && isExpanded && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "64px",
              alignItems: "flex-start",
              position: "relative",
              mt: "200px",
            }}
          >
            {bu.teams.map(renderTeam)}
          </Box>
        )}
      </Box>
    );
  };

  const hasBusinessUnits = company.businessUnits?.length > 0;
  const isCompanyExpanded = expandedNodes.has(company.id);

  return (
    <Box
      ref={containerRef}
      sx={{
        display: "flex",
        gap: "16px",
        alignItems: "flex-start",
        position: "relative",
      }}
    >
      {/* SVG Overlay for Arrows */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
          overflow: "visible",
        }}
      >
        {connections.map(({ parentId, childId }) => {
          const path = getArrowPath(parentId, childId);
          if (!path) return null;

          return (
            <path
              key={`${parentId}-${childId}`}
              d={path}
              stroke="#FF6B2C"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead)"
            />
          );
        })}
      </svg>

      {/* Company Card */}
      <Box
        ref={(el) => registerCardRef(company.id, el as HTMLDivElement | null)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <OrgStructureCard
          name={company.name}
          type="COMPANY"
          headCount={company.headCount}
          teamHead={company.teamHead}
          functionLead={company.functionLead}
          hasChildren={hasBusinessUnits}
          isExpanded={isCompanyExpanded}
          onCollapse={() => onToggle(company.id)}
          onEdit={() => onEdit(company.id, "COMPANY")}
          onAdd={() => onAdd(company.id, "COMPANY")}
        />
      </Box>

      {/* Business Units */}
      {hasBusinessUnits && isCompanyExpanded && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "64px",
            alignItems: "flex-start",
            position: "relative",
            mt: "200px",
            zIndex: 1,
          }}
        >
          {company.businessUnits.map(renderBusinessUnit)}
        </Box>
      )}
    </Box>
  );
};

export default OrgStructureTree;

