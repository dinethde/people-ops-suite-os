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
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Controller, useForm } from "react-hook-form";

import {
  useUpdateBusinessUnitMutation,
  useUpdateSubTeamMutation,
  useUpdateTeamMutation,
  useUpdateUnitMutation,
} from "@services/organization";

export type RenameEntityType = "Business Unit" | "Team" | "Sub-Team" | "Unit";

interface RenameFormValues {
  entityName: string;
}

interface RenameFieldProps {
  entityId: string;
  entityType: RenameEntityType;
  currentName: string;
  onRenameSuccess?: () => void;
}

export const RenameField: React.FC<RenameFieldProps> = ({
  entityId,
  entityType,
  currentName,
  onRenameSuccess,
}) => {
  const theme = useTheme();

  const [updateBusinessUnit, { isLoading: isUpdatingBU }] = useUpdateBusinessUnitMutation();
  const [updateTeam, { isLoading: isUpdatingTeam }] = useUpdateTeamMutation();
  const [updateSubTeam, { isLoading: isUpdatingSubTeam }] = useUpdateSubTeamMutation();
  const [updateUnit, { isLoading: isUpdatingUnit }] = useUpdateUnitMutation();

  const isLoading = isUpdatingBU || isUpdatingTeam || isUpdatingSubTeam || isUpdatingUnit;

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<RenameFormValues>({
    defaultValues: { entityName: currentName },
    mode: "onChange",
  });

  const onSubmit = async ({ entityName }: RenameFormValues) => {
    const payload = { name: entityName };

    switch (entityType) {
      case "Business Unit":
        await updateBusinessUnit({ id: entityId, payload });
        break;
      case "Team":
        await updateTeam({ id: entityId, payload });
        break;
      case "Sub-Team":
        await updateSubTeam({ id: entityId, payload });
        break;
      case "Unit":
        await updateUnit({ id: entityId, payload });
        break;
    }
    onRenameSuccess?.();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "100%",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.customText.primary.p2.active,
        }}
      >
        {entityType} Name
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Controller
          name="entityName"
          control={control}
          rules={{ required: "Name is required", minLength: 1 }}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder={`Enter ${entityType} name`}
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Button
          type="submit"
          variant="outlined"
          color="error"
          disabled={!isDirty || !isValid || isLoading}
          startIcon={isLoading ? <CircularProgress size={14} color="inherit" /> : undefined}
        >
          Rename
        </Button>
      </Box>
    </Box>
  );
};
