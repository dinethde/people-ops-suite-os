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

export const muiTextField = (colors: any): Components<Theme>["MuiTextField"] => ({
  styleOverrides: {
    root: {
      "& .MuiOutlinedInput-root": {
        borderRadius: 8,
        fontSize: "16px",
        fontWeight: 400,
        "& .MuiOutlinedInput-input": {
          color: colors.text.primary.p2.active,
          padding: "10px 12px",
        },
        "& fieldset": {
          borderColor: colors.border.territory.active,
          borderWidth: "1px",
        },
        "&:hover fieldset": {
          borderColor: colors.border.territory.hover,
        },
        "&.Mui-focused fieldset": {
          borderColor: colors.border.secondary.active,
          borderWidth: "2px",
        },
        "&.Mui-error fieldset": {
          borderColor: "#F23B0D",
        },
        "&.Mui-disabled fieldset": {
          borderColor: colors.border.territory.disabled,
        },
      },
      "& .MuiInputLabel-root": {
        color: colors.text.primary.p2.active,
        fontSize: "14px",
        fontWeight: 400,
        "&.Mui-focused": {
          color: colors.border.brand.active,
        },
        "&.Mui-error": {
          color: "#F23B0D",
        },
        "&.MuiInputLabel-shrink": {
          color: colors.text.primary.p3.active,
          fontSize: "18px", // This sets the label size when focused/shrunk (will scale to 75% = 13.5px)
        },
      },
      "& .MuiFormHelperText-root": {
        fontSize: "12px",
        fontWeight: 400,
        marginLeft: "2px",
        marginTop: "4px",
        "&.Mui-error": {
          color: "#F23B0D",
        },
      },
    },
  },
});
