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
import { Box, Divider, TextField, Typography, useTheme } from "@mui/material";
import { Control, Controller, FieldErrors } from "react-hook-form";

import { PersonalInfoFormValues } from "../../utils/personalInfoSchema";

interface FieldConfig {
  name: keyof PersonalInfoFormValues;
  label: string;
}

interface EditableFieldRowProps {
  fields: FieldConfig[];
  control: Control<PersonalInfoFormValues>;
  errors: FieldErrors<PersonalInfoFormValues>;
}

const EditableFieldRow = ({ fields, control, errors }: EditableFieldRowProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2.5,
        alignItems: "flex-start",
        mt: 0.75,
        mb: 1,
      }}
    >
      {fields.map((field) => (
        <Controller
          key={field.name}
          name={field.name}
          control={control}
          render={({ field: fieldProps }) => (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, flex: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  ml: 0.5,
                  color: theme.palette.customText.primary.p3.active,
                }}
              >
                {field.label}
              </Typography>

              <TextField
                {...fieldProps}
                value={fieldProps.value ?? ""}
                variant="outlined"
                size="small"
                fullWidth
                error={!!errors[field.name]}
                helperText={errors[field.name]?.message as string | undefined}
              />
            </Box>
          )}
        />
      ))}
    </Box>
  );
};

interface EditableFieldRowsProps {
  control: Control<PersonalInfoFormValues>;
  errors: FieldErrors<PersonalInfoFormValues>;
}

export default function EditableFieldRows({ control, errors }: EditableFieldRowsProps) {
  const theme = useTheme();

  return (
    <>
      {/* Editable fields row 1 */}
      <EditableFieldRow
        fields={[
          { name: "personalEmail", label: "Personal Email" },
          { name: "personalPhone", label: "Personal Phone" },
          { name: "residentNumber", label: "Resident Phone" },
          { name: "nationality", label: "Nationality" },
        ]}
        control={control}
        errors={errors}
      />

      <Divider
        sx={{
          borderColor: theme.palette.customBorder.territory.active,
        }}
      />

      {/* Editable fields row 2 */}
      <EditableFieldRow
        fields={[
          { name: "addressLine1", label: "Address Line 1" },
          { name: "addressLine2", label: "Address Line 2" },
          { name: "city", label: "City" },
          { name: "postalCode", label: "Postal Code" },
        ]}
        control={control}
        errors={errors}
      />

      <Divider
        sx={{
          borderColor: theme.palette.customBorder.territory.active,
        }}
      />

      {/* Editable fields row 3 */}
      <EditableFieldRow
        fields={[
          { name: "stateOrProvince", label: "State/Province" },
          { name: "country", label: "Country" },
        ]}
        control={control}
        errors={errors}
      />
    </>
  );
}
