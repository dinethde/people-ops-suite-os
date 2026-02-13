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
import { Box, Divider, Typography, useTheme } from "@mui/material";

import { EmployeePersonalInfo } from "@root/src/services/employee";
import { formatDate } from "@root/src/utils/utils";

type DisplayableField = Exclude<keyof EmployeePersonalInfo, "id" | "emergencyContacts">;

interface FieldConfig {
  key: DisplayableField;
  label: string;
  formatter?: (value: string | null) => string | null;
}

interface ReadOnlyFieldRowProps {
  fields: FieldConfig[];
  personalInfo: EmployeePersonalInfo;
}

const ReadOnlyFieldRow = ({ fields, personalInfo }: ReadOnlyFieldRowProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 2.5,
        alignItems: "center",
      }}
    >
      {fields.map((field) => {
        const value = personalInfo[field.key];
        const displayValue = field.formatter
          ? field.formatter(value as string | null)
          : (value as string | null);

        return (
          <Box
            key={field.key}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              minWidth: 0,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.customText.primary.p3.active,
              }}
            >
              {field.label}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: theme.palette.customText.primary.p2.active,
              }}
            >
              {displayValue || "-"}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

interface ReadOnlyRowsProps {
  personalInfo: EmployeePersonalInfo;
}

export default function ReadOnlyRows({ personalInfo }: ReadOnlyRowsProps) {
  const theme = useTheme();

  return (
    <>
      {/* Read-only fields row 1 */}
      <ReadOnlyFieldRow
        fields={[
          { key: "title", label: "Title" },
          { key: "firstName", label: "First Name" },
          { key: "lastName", label: "Last Name" },
          { key: "nameWithInitials", label: "Name With Initials" },
        ]}
        personalInfo={personalInfo}
      />

      <Divider
        sx={{
          borderColor: theme.palette.customBorder.primary.b2.active,
        }}
      />

      {/* Read-only fields row 2 */}
      <ReadOnlyFieldRow
        fields={[
          { key: "fullName", label: "Full Name" },
          { key: "nicOrPassport", label: "NIC" },
          { key: "dob", label: "Date of Birth", formatter: formatDate },
        ]}
        personalInfo={personalInfo}
      />

      <Divider
        sx={{
          borderColor: theme.palette.customBorder.primary.b2.active,
        }}
      />
    </>
  );
}

// Maintain backward compatibility - export as named export too
export const ReadOnlyRow = ReadOnlyRows;
