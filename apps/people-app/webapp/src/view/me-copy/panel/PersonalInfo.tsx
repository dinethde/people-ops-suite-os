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
import { zodResolver } from "@hookform/resolvers/zod";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Button, IconButton, Tooltip, Typography, alpha, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";

import ErrorHandler from "@component/common/ErrorHandler";
import {
  useGetEmployeePersonalInfoQuery,
  useUpdateEmployeePersonalInfoMutation,
} from "@services/employee";
import { useAppSelector } from "@slices/store";

import EditableFieldRows from "../components/personal-info/EditableFieldRows";
import ReadOnlyRows from "../components/personal-info/ReadOnlyRows";
import InfoSkeleton from "../components/shared/InfoSkeleton";
import { PersonalInfoFormValues, personalInfoSchema } from "../utils/personalInfoSchema";
import { getChangedFields } from "../utils/utils";

export default function PersonalInfo() {
  const theme = useTheme();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const employeeId = userInfo?.employeeId;

  const {
    data: personalInfo,
    isLoading,
    isError,
    error,
  } = useGetEmployeePersonalInfoQuery(employeeId || "", {
    skip: !employeeId,
  });

  const [updatePersonalInfo, { isLoading: isUpdating }] = useUpdateEmployeePersonalInfoMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    mode: "onChange",
    values: personalInfo
      ? {
          personalEmail: personalInfo.personalEmail ?? "",
          personalPhone: personalInfo.personalPhone ?? "",
          residentNumber: personalInfo.residentNumber ?? "",
          nationality: personalInfo.nationality ?? "",
          addressLine1: personalInfo.addressLine1 ?? "",
          addressLine2: personalInfo.addressLine2 ?? null,
          city: personalInfo.city ?? "",
          postalCode: personalInfo.postalCode ?? "",
          stateOrProvince: personalInfo.stateOrProvince ?? null,
          country: personalInfo.country ?? "",
        }
      : undefined,
  });

  const onSubmit = async (data: PersonalInfoFormValues) => {
    if (!employeeId || !personalInfo) return;

    try {
      const updatePayload = getChangedFields(data, personalInfo);

      await updatePersonalInfo({
        employeeId,
        data: updatePayload,
      }).unwrap();
    } catch (err) {
      reset();
      console.error("Failed to update personal info:", err);
    }
  };

  // Handle loading state
  if (isLoading) {
    return <InfoSkeleton />;
  }

  // Handle error state
  if (isError || !personalInfo) {
    return (
      <ErrorHandler
        message={
          error &&
          "data" in error &&
          typeof error.data === "object" &&
          error.data &&
          "message" in error.data
            ? String(error.data.message)
            : "Failed to load personal information. Please try again later."
        }
      />
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        bgcolor: alpha(theme.palette.fill.secondary.light.active, 0.5),
        border: `1px solid ${theme.palette.customBorder.primary.b2.active}`,
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: "16px 4px 4px 4px",
        width: "100%",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 1.5,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.customText.primary.p2.active,
          }}
        >
          Personal Information
        </Typography>

        <Tooltip title="Editable Content">
          <IconButton
            sx={{
              p: 0,
              cursor: "pointer",
            }}
          >
            <EditOutlinedIcon
              sx={{
                fontSize: 22,
                color: theme.palette.customText.secondary.p1.active,
              }}
            />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Body */}
      <Box
        sx={{
          bgcolor: alpha(theme.palette.surface.secondary.active, 0.5),
          border: `0.5px solid ${theme.palette.customBorder.primary.b2.active}`,
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
          p: "20px 16px",
        }}
      >
        {/* Read-only rows */}
        <ReadOnlyRows personalInfo={personalInfo} />

        {/* Editable fields row 1 */}
        <EditableFieldRows control={control} errors={errors} />

        {/* Action buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            justifyContent: "flex-end",
            px: 2,
          }}
        >
          <Button variant="outlined" onClick={() => reset()} disabled={isUpdating || !isDirty}>
            Cancel
          </Button>

          <Button variant="primary" disabled={isUpdating || !isValid || !isDirty}>
            {isUpdating ? "Updating..." : "Update Info"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
