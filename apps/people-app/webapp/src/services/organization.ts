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
import { createApi } from "@reduxjs/toolkit/query/react";

import { AppConfig } from "@config/config.ts";

import { RootState } from "../slices/store.ts";
import { baseQueryWithRetry } from "./BaseQuery.ts";

export interface Head {
  name: string;
  title: string;
  avatar?: string;
}

export interface FunctionalLead {
  name: string;
  title: string;
  avatar?: string;
}

export interface Unit {
  id: string;
  name: string;
  headCount: number;
  head?: Head;
  functionalLead?: FunctionalLead;
}

export interface SubTeam {
  id: string;
  name: string;
  headCount: number;
  head?: Head;
  functionalLead?: FunctionalLead;
  units: Unit[];
}

export interface Team {
  id: string;
  name: string;
  headCount: number;
  head?: Head;
  functionalLead?: FunctionalLead;
  subTeams: SubTeam[];
}

export interface BusinessUnit {
  id: string;
  name: string;
  headCount: number;
  head?: Head;
  functionalLead?: FunctionalLead;
  teams: Team[];
}

export interface Company {
  id: string;
  name: string;
  headCount: number;
  head?: Head;
  functionalLead?: FunctionalLead;
  businessUnits: BusinessUnit[];
}

interface payloadType {
  name: string;
  headEmail: string;
}

export const organizationApi = createApi({
  reducerPath: "organizationApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["BU", "TEAM", "SUB_TEAM", "UNIT"],
  endpoints: (builder) => ({
    getOrgStructure: builder.query<Company, void>({
      query: () => AppConfig.serviceUrls.organization,
      transformResponse: (response: Company) => {
        response.businessUnits.forEach((bu) => {
          bu.teams.forEach((team) => {
            const teamLeadTitle = `${bu.name} ${team.name} Lead`;
            if (team.functionalLead?.title) team.functionalLead.title = teamLeadTitle;

            team.subTeams.forEach((subTeam) => {
              const subTeamLeadTitle = `${teamLeadTitle} ${subTeam.name} Lead`;
              if (subTeam.functionalLead?.title) subTeam.functionalLead.title = subTeamLeadTitle;

              subTeam.units.forEach((unit) => {
                const unitLeadTitle = `${subTeamLeadTitle} ${unit.name} Lead`;
                if (unit.functionalLead?.title) unit.functionalLead.title = unitLeadTitle;
              });
            });
          });
        });
        return response;
      },
      providesTags: ["BU", "TEAM", "SUB_TEAM", "UNIT"],
    }),
  }),
});

export const { useGetOrgStructureQuery } = organizationApi;
