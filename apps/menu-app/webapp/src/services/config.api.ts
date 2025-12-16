// RTK Query API for application configuration endpoints
import { createApi } from "@reduxjs/toolkit/query/react";

import { AppConfig } from "@config/config";

import { baseQueryWithRetry } from "./BaseQuery";

const THEME_STORAGE_KEY = "app_theme_config";

interface SupportTeamEmail {
  team: string;
  email: string;
}

export interface AppConfigInfo {
  supportTeamEmails: SupportTeamEmail[];
}

export enum Themes {
  DEFAULT_THEME = "Default Theme",
  XMAS_THEME = "Christmas Theme",
}

export interface ThemeConfig {
  theme: Themes;
  audio: string | null;
}

const saveThemeInLocalStorage = (themeConfig: ThemeConfig) => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(themeConfig));
    return { data: undefined };
  } catch (error) {
    return {
      error: {
        status: 500,
        statusText: "Local Storage Error",
        data: (error as Error).message,
      },
    };
  }
};

const getThemeFromLocalStorage = () => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    const data = stored ? (JSON.parse(stored) as ThemeConfig) : null;
    return { data };
  } catch (error) {
    return {
      error: {
        status: 500,
        statusText: "Local Storage Error",
        data: (error as Error).message,
      },
    };
  }
};

export const configApi = createApi({
  reducerPath: "configApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["Config"],
  endpoints: (builder) => ({
    getAppConfig: builder.query<AppConfigInfo, void>({
      query: () => AppConfig.serviceUrls.appConfig,
      providesTags: ["Config"],
    }),
    setTheme: builder.mutation<void, ThemeConfig>({
      queryFn: (themeConfig) => saveThemeInLocalStorage(themeConfig),
      invalidatesTags: ["Config"],
    }),
    getTheme: builder.query<ThemeConfig | null, void>({
      queryFn: () => getThemeFromLocalStorage(),
      providesTags: ["Config"],
    }),
  }),
});

export const { useGetAppConfigQuery, useSetThemeMutation, useGetThemeQuery } = configApi;
