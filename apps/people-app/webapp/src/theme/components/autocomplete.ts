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

export const muiAutocomplete = (colors: any): Components<Theme>["MuiAutocomplete"] => ({
  styleOverrides: {
    root: {
      "& .MuiOutlinedInput-root": {
        minHeight: "35px",
        height: "35px",
        borderRadius: "6px",
        fontSize: "14px",
        fontWeight: 400,
        fontFamily: "'Geist', sans-serif",
        lineHeight: 1.5,
        padding: "6px 16px",
        display: "flex",
        alignItems: "center",
        "& .MuiOutlinedInput-input": {
          color: colors.text.primary.p3.active || "#666",
          padding: "0 !important",
          height: "auto",
          lineHeight: 1.5,
        },
        "& fieldset": {
          borderColor: colors.border.primary.b2.active || "#e5e5e5",
          borderWidth: "1px",
        },
        "&:hover fieldset": {
          borderColor: colors.border.primary.b2.hover || "#ccc",
        },
        "&.Mui-focused fieldset": {
          borderColor: colors.border.secondary.b1.active || "#00bfff",
          borderWidth: "1px",
        },
        "&.Mui-error fieldset": {
          borderColor: "#f30",
        },
        "&.Mui-disabled": {
          opacity: 0.59,
          "& fieldset": {
            borderColor: colors.border.primary.b2.active || "#e5e5e5",
          },
          "& .MuiOutlinedInput-input": {
            color: colors.text.primary.p3.active || "#666",
          },
        },
        "& .MuiAutocomplete-input": {
          color: colors.text.primary.p3.active || "#666",
          fontSize: "14px",
          fontFamily: "'Geist', sans-serif",
          fontWeight: 400,
          lineHeight: 1.5,
          padding: "0 !important",
        },
        // When option is selected, text should be darker
        "&.Mui-focused .MuiAutocomplete-input": {
          color: colors.text.primary.p2.active || "#333",
        },
      },
    },

    // Input label styles
    inputRoot: {
      "& .MuiInputLabel-root": {
        fontSize: "14px",
        fontWeight: 400,
        fontFamily: "'Geist', sans-serif",
        color: colors.text.primary.p3.active || "#666",
        "&.Mui-focused": {
          color: colors.text.primary.p2.active || "#333",
        },
        "&.Mui-error": {
          color: "#f30",
        },
        "&.Mui-disabled": {
          color: colors.text.primary.p3.active || "#666",
          opacity: 0.59,
        },
      },
    },
  },
});
