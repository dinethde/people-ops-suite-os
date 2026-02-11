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

import { baseQueryWithRetry } from "./BaseQuery.ts";

export interface TeamHead {
  name: string;
  title: string;
  avatar?: string;
}

export interface FunctionLead {
  name: string;
  title: string;
  avatar?: string;
}

export interface Unit {
  id: string;
  name: string;
  headCount: number;
  teamHead?: TeamHead;
  functionLead?: FunctionLead;
}

export interface SubTeam {
  id: string;
  name: string;
  headCount: number;
  teamHead?: TeamHead;
  functionLead?: FunctionLead;
  units: Unit[];
}

export interface Team {
  id: string;
  name: string;
  headCount: number;
  teamHead?: TeamHead;
  functionLead?: FunctionLead;
  subTeams: SubTeam[];
}

export interface BusinessUnit {
  id: string;
  name: string;
  headCount: number;
  teamHead?: TeamHead;
  functionLead?: FunctionLead;
  teams: Team[];
}

export interface Company {
  id: string;
  name: string;
  headCount: number;
  teamHead?: TeamHead;
  functionLead?: FunctionLead;
  businessUnits: BusinessUnit[];
}

export const orgStructureApi = createApi({
  reducerPath: "orgStructureApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["BU", "TEAM", "SUB_TEAM", "UNIT"],
  endpoints: (builder) => ({
    getOrgStructure: builder.query<Company, void>({
      query: () => AppConfig.serviceUrls.orgStructure,
    }),
  }),
});

export const { useGetOrgStructureQuery } = orgStructureApi;
