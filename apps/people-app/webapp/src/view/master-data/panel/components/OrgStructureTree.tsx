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

import { BusinessUnit, Company, SubTeam, Team, Unit } from "@services/orgStructure";

import OrgStructureCard from "./OrgStructureCard";

interface OrgStructureTreeProps {
  company: Company;
  expandedNodes: Set<string>;
  onToggle: (id: string) => void;
  onEdit: (id: string, type: string) => void;
  onAdd: (id: string, type: string) => void;
}

const OrgStructureTree = ({
  company,
  expandedNodes,
  onToggle,
  onEdit,
  onAdd,
}: OrgStructureTreeProps) => {
  const renderUnit = (unit: Unit) => (
    <Box
      key={unit.id}
      sx={{
        display: "flex",
        gap: "64px",
        alignItems: "flex-start",
        position: "relative",
      }}
    >
      <Box
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
          onCollapse={() => {}}
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
          gap: "64px",
          alignItems: "flex-start",
          position: "relative",
        }}
      >
        <Box
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
          gap: "64px",
          alignItems: "flex-start",
          position: "relative",
        }}
      >
        <Box
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
          gap: "64px",
          alignItems: "flex-start",
          position: "relative",
        }}
      >
        <Box
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
      sx={{
        display: "flex",
        gap: "64px",
        alignItems: "flex-start",
        position: "relative",
      }}
    >
      {/* Company Card */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0px",
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
          }}
        >
          {company.businessUnits.map(renderBusinessUnit)}
        </Box>
      )}
    </Box>
  );
};

export default OrgStructureTree;
