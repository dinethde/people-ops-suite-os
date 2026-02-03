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
import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { useEffect, useMemo, useState } from "react";

import ErrorHandler from "@component/common/ErrorHandler";
import {
  EmployeePersonalInfoUpdate,
  useGetEmployeePersonalInfoQuery,
  useUpdateEmployeePersonalInfoMutation,
} from "@services/employee";
import { useAppSelector } from "@slices/store";

import PersonalInfoSkeleton from "./PersonalInfoSkeleton";

// Validation schema
const personalInfoSchema = z.object({
  personalEmail: z.string().email("Invalid email address").nullable(),
  personalPhone: z.string().nullable(),
  residentNumber: z.string().nullable(),
  nationality: z.string().nullable(),
  addressLine1: z.string().nullable(),
  addressLine2: z.string().nullable(),
  city: z.string().nullable(),
  postalCode: z.string().nullable(),
  stateOrProvince: z.string().nullable(),
  country: z.string().nullable(),
});

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;

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

export default function PersonalInfo() {
  const theme = useTheme();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const employeeId = userInfo?.employeeId;
  const [isEditing, setIsEditing] = useState(false);

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
    formState: { errors },
  } = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      personalEmail: "",
      personalPhone: "",
      residentNumber: "",
      nationality: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      postalCode: "",
      stateOrProvince: "",
      country: "",
    },
  });

  // Update form when data loads
  useEffect(() => {
    if (personalInfo) {
      reset({
        personalEmail: personalInfo.personalEmail,
        personalPhone: personalInfo.personalPhone,
        residentNumber: personalInfo.residentNumber,
        nationality: personalInfo.nationality,
        addressLine1: personalInfo.addressLine1,
        addressLine2: personalInfo.addressLine2,
        city: personalInfo.city,
        postalCode: personalInfo.postalCode,
        stateOrProvince: personalInfo.stateOrProvince,
        country: personalInfo.country,
      });
    }
  }, [personalInfo, reset]);

  // Format date function
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  // Non-editable data rows
  const readOnlyRows = useMemo(() => {
    if (!personalInfo) return [];

    return [
      [
        { label: "Title", value: personalInfo.title },
        { label: "First Name", value: personalInfo.firstName },
        { label: "Last Name", value: personalInfo.lastName },
        { label: "Name With Initials", value: personalInfo.nameWithInitials },
      ],
      [
        { label: "Full name", value: personalInfo.fullName },
        { label: "NIC", value: personalInfo.nicOrPassport },
        { label: "Date of Birth", value: formatDate(personalInfo.dob) },
      ],
    ];
  }, [personalInfo]);

  const handleCancel = () => {
    setIsEditing(false);
    reset();
  };

  const onSubmit = async (data: PersonalInfoFormValues) => {
    if (!employeeId) return;

    try {
      const updatePayload: EmployeePersonalInfoUpdate = {
        personalEmail: data.personalEmail,
        personalPhone: data.personalPhone,
        residentNumber: data.residentNumber,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        stateOrProvince: data.stateOrProvince,
        postalCode: data.postalCode,
        country: data.country,
        emergencyContacts: personalInfo?.emergencyContacts || null,
      };

      await updatePersonalInfo({
        employeeId,
        data: updatePayload,
      }).unwrap();

      setIsEditing(false);
    } catch (err) {
      // Error is handled by RTK Query
      console.error("Failed to update personal info:", err);
    }
  };

  // Handle loading state
  if (isLoading) {
    return <PersonalInfoSkeleton />;
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
        bgcolor: alpha(theme.palette.fill.secondary_light.active, 0.5),
        border: `1px solid ${theme.palette.customBorder.territory.active}`,
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: "16px 4px 16px 4px",
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

        {!isEditing && (
          <Tooltip title="Edit Personal Information">
            <IconButton
              onClick={() => setIsEditing(true)}
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
        )}
      </Box>

      {/* Body */}
      <Box
        sx={{
          bgcolor: alpha(theme.palette.surface.secondary.active, 0.5),
          border: `0.5px solid ${theme.palette.customBorder.territory.active}`,
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
          p: "20px 16px",
        }}
      >
        {/* Read-only rows */}
        {readOnlyRows.map((row, rowIndex) => (
          <>
            <Box
              key={rowIndex}
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

            <Divider
              sx={{
                borderColor: theme.palette.customBorder.territory.active,
              }}
            />
          </>
        ))}

        {/* Editable fields row 1 */}
        <Box
          sx={{
            display: "flex",
            gap: 2.5,
            alignItems: isEditing ? "flex-start" : "center",
          }}
        >
          {isEditing ? (
            <>
              <Controller
                name="personalEmail"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={field.value || ""}
                    label="Personal Email"
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={!!errors.personalEmail}
                    helperText={errors.personalEmail?.message}
                    sx={{
                      flex: 1,
                      "& .MuiInputLabel-root": {
                        fontSize: "12px",
                        color: theme.palette.customText.primary.p4.active,
                      },
                      "& .MuiOutlinedInput-root": {
                        fontSize: "16px",
                        color: theme.palette.customText.primary.p2.active,
                        "& fieldset": {
                          borderColor: theme.palette.customBorder.territory.active,
                        },
                      },
                    }}
                  />
                )}
              />
              <Controller
                name="personalPhone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={field.value || ""}
                    label="Personal Phone"
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={!!errors.personalPhone}
                    helperText={errors.personalPhone?.message}
                    sx={{
                      flex: 1,
                      "& .MuiInputLabel-root": {
                        fontSize: "12px",
                        color: theme.palette.customText.primary.p4.active,
                      },
                      "& .MuiOutlinedInput-root": {
                        fontSize: "16px",
                        color: theme.palette.customText.primary.p2.active,
                        "& fieldset": {
                          borderColor: theme.palette.customBorder.territory.active,
                        },
                      },
                    }}
                  />
                )}
              />
              <Controller
                name="residentNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={field.value || ""}
                    label="Resident Phone"
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={!!errors.residentNumber}
                    helperText={errors.residentNumber?.message}
                    sx={{
                      flex: 1,
                      "& .MuiInputLabel-root": {
                        fontSize: "12px",
                        color: theme.palette.customText.primary.p4.active,
                      },
                      "& .MuiOutlinedInput-root": {
                        fontSize: "16px",
                        color: theme.palette.customText.primary.p2.active,
                        "& fieldset": {
                          borderColor: theme.palette.customBorder.territory.active,
                        },
                      },
                    }}
                  />
                )}
              />
              <Controller
                name="nationality"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={field.value || ""}
                    label="Nationality"
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={!!errors.nationality}
                    helperText={errors.nationality?.message}
                    sx={{
                      flex: 1,
                      "& .MuiInputLabel-root": {
                        fontSize: "12px",
                        color: theme.palette.customText.primary.p4.active,
                      },
                      "& .MuiOutlinedInput-root": {
                        fontSize: "16px",
                        color: theme.palette.customText.primary.p2.active,
                        "& fieldset": {
                          borderColor: theme.palette.customBorder.territory.active,
                        },
                      },
                    }}
                  />
                )}
              />
            </>
          ) : (
            <>
              <InfoItem label="Personal Email" value={personalInfo.personalEmail} />
              <InfoItem label="Personal Phone" value={personalInfo.personalPhone} />
              <InfoItem label="Resident Number" value={personalInfo.residentNumber} />
              <InfoItem label="Nationality" value={personalInfo.nationality} />
            </>
          )}
        </Box>

        <Divider
          sx={{
            borderColor: theme.palette.customBorder.territory.active,
          }}
        />

        {/* Editable fields row 2 */}
        <Box
          sx={{
            display: "flex",
            gap: 2.5,
            alignItems: isEditing ? "flex-start" : "center",
          }}
        >
          {isEditing ? (
            <>
              <Controller
                name="addressLine1"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={field.value || ""}
                    label="Address Line 1"
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={!!errors.addressLine1}
                    helperText={errors.addressLine1?.message}
                    sx={{
                      flex: 1,
                      "& .MuiInputLabel-root": {
                        fontSize: "12px",
                        color: theme.palette.customText.primary.p4.active,
                      },
                      "& .MuiOutlinedInput-root": {
                        fontSize: "16px",
                        color: theme.palette.customText.primary.p2.active,
                        "& fieldset": {
                          borderColor: theme.palette.customBorder.territory.active,
                        },
                      },
                    }}
                  />
                )}
              />
              <Controller
                name="addressLine2"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={field.value || ""}
                    label="Address Line 2"
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={!!errors.addressLine2}
                    helperText={errors.addressLine2?.message}
                    sx={{
                      flex: 1,
                      "& .MuiInputLabel-root": {
                        fontSize: "12px",
                        color: theme.palette.customText.primary.p4.active,
                      },
                      "& .MuiOutlinedInput-root": {
                        fontSize: "16px",
                        color: theme.palette.customText.primary.p2.active,
                        "& fieldset": {
                          borderColor: theme.palette.customBorder.territory.active,
                        },
                      },
                    }}
                  />
                )}
              />
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={field.value || ""}
                    label="City"
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={!!errors.city}
                    helperText={errors.city?.message}
                    sx={{
                      flex: 1,
                      "& .MuiInputLabel-root": {
                        fontSize: "12px",
                        color: theme.palette.customText.primary.p4.active,
                      },
                      "& .MuiOutlinedInput-root": {
                        fontSize: "16px",
                        color: theme.palette.customText.primary.p2.active,
                        "& fieldset": {
                          borderColor: theme.palette.customBorder.territory.active,
                        },
                      },
                    }}
                  />
                )}
              />
              <Controller
                name="postalCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={field.value || ""}
                    label="Postal Code"
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={!!errors.postalCode}
                    helperText={errors.postalCode?.message}
                    sx={{
                      flex: 1,
                      "& .MuiInputLabel-root": {
                        fontSize: "12px",
                        color: theme.palette.customText.primary.p4.active,
                      },
                      "& .MuiOutlinedInput-root": {
                        fontSize: "16px",
                        color: theme.palette.customText.primary.p2.active,
                        "& fieldset": {
                          borderColor: theme.palette.customBorder.territory.active,
                        },
                      },
                    }}
                  />
                )}
              />
            </>
          ) : (
            <>
              <InfoItem label="Address Line 1" value={personalInfo.addressLine1} />
              <InfoItem label="Address Line 2" value={personalInfo.addressLine2} />
              <InfoItem label="City" value={personalInfo.city} />
              <InfoItem label="Postal Code" value={personalInfo.postalCode} />
            </>
          )}
        </Box>

        <Divider
          sx={{
            borderColor: theme.palette.customBorder.territory.active,
          }}
        />

        {/* Editable fields row 3 */}
        <Box
          sx={{
            display: "flex",
            gap: 2.5,
            alignItems: isEditing ? "flex-start" : "center",
          }}
        >
          {isEditing ? (
            <>
              <Controller
                name="stateOrProvince"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={field.value || ""}
                    label="State/Province"
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={!!errors.stateOrProvince}
                    helperText={errors.stateOrProvince?.message}
                    sx={{
                      flex: 1,
                      "& .MuiInputLabel-root": {
                        fontSize: "12px",
                        color: theme.palette.customText.primary.p4.active,
                      },
                      "& .MuiOutlinedInput-root": {
                        fontSize: "16px",
                        color: theme.palette.customText.primary.p2.active,
                        "& fieldset": {
                          borderColor: theme.palette.customBorder.territory.active,
                        },
                      },
                    }}
                  />
                )}
              />
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={field.value || ""}
                    label="Country"
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={!!errors.country}
                    helperText={errors.country?.message}
                    sx={{
                      flex: 1,
                      "& .MuiInputLabel-root": {
                        fontSize: "12px",
                        color: theme.palette.customText.primary.p4.active,
                      },
                      "& .MuiOutlinedInput-root": {
                        fontSize: "16px",
                        color: theme.palette.customText.primary.p2.active,
                        "& fieldset": {
                          borderColor: theme.palette.customBorder.territory.active,
                        },
                      },
                    }}
                  />
                )}
              />
            </>
          ) : (
            <>
              <InfoItem label="State/Province" value={personalInfo.stateOrProvince} />
              <InfoItem label="Country" value={personalInfo.country} />
            </>
          )}
        </Box>
      </Box>

      {/* Action buttons - only shown when editing */}
      {isEditing && (
        <Box
          sx={{
            display: "flex",
            gap: 3,
            justifyContent: "flex-end",
            px: 2,
          }}
        >
          <Button
            variant="outlined"
            onClick={handleCancel}
            disabled={isUpdating}
            sx={{
              borderColor: theme.palette.customBorder.brand.active,
              color: theme.palette.customText.brand.p1.active,
              textTransform: "none",
              fontSize: "14px",
              fontWeight: 500,
              px: 2,
              py: 1,
              borderRadius: "8px",
              "&:hover": {
                borderColor: theme.palette.customBorder.brand.active,
                bgcolor: alpha(theme.palette.customBorder.brand.active, 0.04),
              },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isUpdating}
            sx={{
              bgcolor: theme.palette.fill.primary.clicked,
              color: "#FFFFFF",
              textTransform: "none",
              fontSize: "14px",
              fontWeight: 500,
              px: 2,
              py: 1,
              borderRadius: "8px",
              "&:hover": {
                bgcolor: theme.palette.fill.primary.hover,
              },
              "&:disabled": {
                bgcolor: theme.palette.fill.primary.disabled,
              },
            }}
          >
            {isUpdating ? "Updating..." : "Update Info"}
          </Button>
        </Box>
      )}
    </Box>
  );
}
