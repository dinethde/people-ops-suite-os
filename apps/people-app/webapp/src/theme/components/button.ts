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

import type { Components, Theme } from "@mui/material/styles";

export const muiButton: Components<Theme>["MuiButton"] = {
  defaultProps: {
    disableElevation: true,
  },
  styleOverrides: {
    root: {
      textTransform: "none",
      borderRadius: 6,
      fontWeight: 500,
    },
  },
  variants: [
    {
      props: { variant: "primary" as any },
      style: ({ theme }) => ({
        backgroundColor: theme.palette.fill.primary.clicked,
        color: theme.palette.customText.brand.p2.active,
        boxShadow: "none" as const,
        "&:hover": {
          backgroundColor: theme.palette.fill.primary.hover,
          boxShadow: "none" as const,
        },
        "&.Mui-disabled": {
          backgroundColor: theme.palette.fill.primary.disabled,
          color: theme.palette.customText.brand.p2.disabled,
        }
      }),
    },

    {
      props: { variant: "secondary" as any },
      style: ({ theme }) => ({
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        "&:hover": { backgroundColor: theme.palette.secondary.dark },
      }),
    },

    {
      props: { variant: "outlined" as any },
      style: ({ theme }) => ({
        backgroundColor: "transparent",
        border: `1px solid ${theme.palette.customBorder.brand.active}`,
        color: theme.palette.customText.primary.p2.active,
        "&:hover": {
          backgroundColor: theme.palette.fill.neutral_light
        },
      }),
    },

  ],
};
