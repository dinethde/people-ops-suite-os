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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";

import { FunctionLead, TeamHead } from "@root/src/services/orgStructure";

interface OrgStructureCardProps {
  name: string;
  type: "BUSINESS_UNIT" | "TEAM" | "SUB_TEAM" | "UNIT";
  headCount: number;
  teamHead?: TeamHead;
  functionLead?: FunctionLead;
  hasChildren?: boolean;
  isExpanded?: boolean;
  onCollapse?: () => void;
  onEdit?: () => void;
  onAdd?: () => void;
}

const TYPE_LABELS = {
  BUSINESS_UNIT: "Business Unit",
  TEAM: "Team",
  SUB_TEAM: "Sub Team",
  UNIT: "Unit",
};

const OrgStructureCard = ({
  name,
  type,
  headCount,
  teamHead,
  functionLead,
  hasChildren,
  isExpanded,
  onCollapse,
  onEdit,
  onAdd,
}: OrgStructureCardProps) => {
  const theme = useTheme();

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.();
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAdd?.();
  };

  const handleCollapse = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCollapse?.();
  };

  // Helper function to truncate name if too long
  const truncateName = (name: string, maxLength: number = 15) => {
    if (name.length <= maxLength) return name;
    return name.substring(0, maxLength) + "...";
  };

  return (
    <Box
      sx={{
        minWidth: "350PX",
        backgroundColor: theme.palette.surface.secondary.active,
        borderTop: "2px solid",
        borderTopColor: theme.palette.customBorder.brand.active,
        borderRadius: "6px",
        padding: "12px",       boxShadow: "0px 1px 6px 0px rgba(0, 0, 0, 0.12)",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* Top Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {/* Header: Title and Collapse Icon */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 500,
              lineHeight: 1.3,
              letterSpacing: type === "BUSINESS_UNIT" ? "-0.54px" : "0",
              color: theme.palette.customText.primary.p2.active,
            }}
          >
            {name}
          </Typography>

          <IconButton
            onClick={handleCollapse}
            size="small"
            disabled={!hasChildren}
            sx={{
              width: "20px",
              height: "20px",
              padding: 0,
              color: theme.palette.customText.primary.p3.active,
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
              opacity: hasChildren ? 1 : 0.3,
              cursor: hasChildren ? "pointer" : "default",
            }}
          >
            <ExpandMoreIcon sx={{ fontSize: "20px" }} />
          </IconButton>
        </Box>

        {/* Team Head and Function Lead */}
        {(teamHead || functionLead) && (
          <Box
            sx={{
              display: "flex",
              gap: "16px",
              alignItems: "flex-start",
              mr: 4,
            }}
          >
            {/* Team Head */}
            {teamHead && (
              <Box
                sx={{
                  backgroundColor: "#FFFFFF",
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  padding: "4px",
                  borderRadius: "4px",
                }}
              >
                <Avatar
                  src={teamHead.avatar}
                  sx={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "4px",
                  }}
                >
                  {teamHead.name.charAt(0)}
                </Avatar>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      lineHeight: 1.6,
                      letterSpacing: "0.12px",
                      color: theme.palette.customText.primary.p2.active,
                      textTransform: "capitalize",
                    }}
                  >
                    {truncateName(teamHead.name)}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 500,
                      lineHeight: 1.2,
                      color: theme.palette.customText.primary.p4.active,
                    }}
                  >
                    {teamHead.title}
                  </Typography>
                </Box>
              </Box>
            )}

            {/* Function Lead */}
            {functionLead && (
              <Box
                sx={{
                  backgroundColor: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  padding: "4px",
                  gap: "8px",
                  borderRadius: "4px",
                }}
              >
                <Avatar
                  src={functionLead.avatar}
                  sx={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "4px",
                  }}
                >
                  {functionLead.name.charAt(0)}
                </Avatar>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      lineHeight: 1.6,
                      letterSpacing: "0.12px",
                      color: theme.palette.customText.primary.p2.active,
                      textTransform: "capitalize",
                    }}
                  >
                    {truncateName(functionLead.name, 12)}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: 400,
                      lineHeight: 1.6,
                      color: theme.palette.customText.primary.p4.active,
                    }}
                  >
                    {functionLead.title}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Box>

      {/* Divider - Only for types with heads/leads */}
      {(teamHead || functionLead) && (
        <Box
          sx={{
            height: "1px",
            backgroundColor: theme.palette.customBorder.territory.active,
          }}
        />
      )}

      {/* Bottom Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left: Type Label and Count */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {/* Type Badge */}
          <Box
            sx={{
              backgroundColor: "#FFF1E5",
              padding: "4px 8px",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 500,
                lineHeight: 1.6,
                letterSpacing: "0.12px",
                color: theme.palette.primary.main,
                textTransform: "uppercase",
              }}
            >
              {TYPE_LABELS[type]}
            </Typography>
          </Box>
          {/* {/* Business Unit Type - Without Badge */} {/* {type === "BUSINESS_UNIT" && ( */}
          {/*   <Typography */}
          {/*     sx={{ */}
          {/*       fontSize: "12px", */}
          {/*       fontWeight: 500, */}
          {/*       lineHeight: 1.6, */}
          {/*       letterSpacing: "0.12px", */}
          {/*       color: theme.palette.primary.main, */}
          {/*       textTransform: "uppercase", */}
          {/*     }} */}
          {/*   > */}
          {/*     {TYPE_LABELS[type]} */}
          {/*   </Typography> */}
          {/* )} */}
          {/* Head Count */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <PeopleAltOutlinedIcon
              sx={{
                fontSize: "16px",
                color: theme.palette.customText.primary.p3.active,
              }}
            />
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: type === "BUSINESS_UNIT" ? 500 : 400,
                lineHeight: 1.5,
                color: theme.palette.customText.primary.p3.active,
              }}
            >
              {headCount}
            </Typography>
          </Box>
        </Box>

        {/* Right: Action Icons */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: type === "BUSINESS_UNIT" ? "12px" : "16px",
          }}
        >
          {onEdit && (
            <IconButton
              onClick={handleEdit}
              size="small"
              sx={{
                width: "16px",
                height: "16px",
                padding: 0,
                color: theme.palette.customText.primary.p3.active,
                "&:hover": {
                  color: theme.palette.primary.main,
                },
              }}
            >
              <EditOutlinedIcon sx={{ fontSize: "16px" }} />
            </IconButton>
          )}

          {onAdd && (
            <IconButton
              onClick={handleAdd}
              size="small"
              sx={{
                width: "16px",
                height: "16px",
                padding: 0,
                color: theme.palette.customText.primary.p3.active,
                "&:hover": {
                  color: theme.palette.primary.main,
                },
              }}
            >
              <AddCircleOutlineIcon sx={{ fontSize: "16px" }} />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default OrgStructureCard;
