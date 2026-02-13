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
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Box, Divider, Tooltip, Typography, alpha, useTheme } from "@mui/material";

import { useMemo } from "react";

import ErrorHandler from "@component/common/ErrorHandler";
import { useGetEmployeeQuery } from "@services/employee";
import { useAppSelector } from "@slices/store";

import InfoSkeleton from "../components/shared/InfoSkeleton";

interface InfoItemProps {
  label: string;
  value?: string | null;
}

const InfoItem = ({ label, value }: InfoItemProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        flex: 1,
        minWidth: 0,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: theme.palette.customText.primary.p3.active,
        }}
      >
        {label}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: theme.palette.customText.primary.p2.active,
        }}
      >
        {value || "-"}
      </Typography>
    </Box>
  );
};

export default function GeneralInfo() {
  const theme = useTheme();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const employeeId = userInfo?.employeeId;

  const {
    data: employee,
    isLoading,
    isError,
    error,
  } = useGetEmployeeQuery(employeeId || "", {
    skip: !employeeId,
  });

  // Format date function
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  // Memoize employee data to avoid unnecessary re-renders
  const infoRows = useMemo(() => {
    if (!employee) return [];

    return [
      [
        { label: "Employee Id", value: employee.employeeId },
        { label: "Name", value: `${employee.firstName} ${employee.lastName}` },
        { label: "Work Email", value: employee.workEmail },
        { label: "EPF", value: employee.epf },
      ],
      [
        { label: "Designation", value: employee.designation },
        { label: "Secondary Job Title", value: employee.secondaryJobTitle },
        { label: "Office", value: employee.office },
        { label: "Business Unit", value: employee.businessUnit },
      ],
      [
        { label: "Team", value: employee.team },
        { label: "Sub Team", value: employee.subTeam },
        { label: "Unit", value: employee.unit },
        { label: "Employment Location", value: employee.employmentLocation },
      ],
      [
        { label: "Work Location", value: employee.workLocation },
        { label: "Employment Type", value: employee.employmentType },
        { label: "Employee Status", value: employee.employeeStatus },
        { label: "Start Date", value: formatDate(employee.startDate) },
      ],
      [
        { label: "Probation End Date", value: formatDate(employee.probationEndDate) },
        { label: "Agreement End Date", value: formatDate(employee.agreementEndDate) },
        { label: "Work Phone Number", value: employee.workPhoneNumber },
        { label: "Manager Email", value: employee.managerEmail },
      ],
      [{ label: "Additional Manager Emails", value: employee.additionalManagerEmails }],
    ];
  }, [employee]);

  // Handle loading state
  if (isLoading) {
    return <InfoSkeleton />;
  }

  // Handle error state
  if (isError || !employee) {
    return (
      <ErrorHandler
        message={
          error &&
            "data" in error &&
            typeof error.data === "object" &&
            error.data &&
            "message" in error.data
            ? String(error.data.message)
            : "Failed to load employee information. Please try again later."
        }
      />
    );
  }

  return (
    <Box
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
          General Information
        </Typography>

        <Tooltip title="Readable Content">
          <VisibilityOutlinedIcon
            sx={{
              cursor: "pointer",
              fontSize: 24,
              color: theme.palette.customText.secondary.p1.active,
            }}
          />
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
        {infoRows.map((row, rowIndex) => (
          <>
            <Box
              sx={{
                display: "flex",
                gap: 2.5,
                alignItems: "center",
              }}
            >
              {row.map((item, itemIndex) => (
                <InfoItem key={itemIndex} label={item.label} value={item.value} />
              ))}
            </Box>

            {rowIndex < infoRows.length - 1 && (
              <Divider
                sx={{
                  borderColor: theme.palette.customBorder.primary.b2.active,
                }}
              />
            )}
          </>
        ))}
      </Box>
    </Box>
  );
}
