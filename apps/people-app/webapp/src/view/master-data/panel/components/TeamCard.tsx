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
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { Avatar, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface TeamCardProps {
  teamName: string;
  headCount: number;
  teamHead: {
    name: string;
    title: string;
    avatar?: string;
  };
  functionLead: {
    name: string;
    title: string;
    avatar?: string;
  };
}

export const TeamCard: React.FC<TeamCardProps> = ({
  teamName,
  headCount,
  teamHead,
  functionLead,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.surface.secondary.active,
        border: `1px solid ${theme.palette.customBorder.primary.b3.active}`,
        borderRadius: "6px",
        padding: "12px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "280px",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "280px",
        }}
      >
        <Typography
          sx={{
            fontSize: "18px",
            fontFamily: "Geist, sans-serif",
            fontWeight: 500,
            lineHeight: 1.3,
            letterSpacing: "-0.54px",
            color: theme.palette.customText.primary.p2.active,
          }}
        >
          {teamName}
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: "5px",
            alignItems: "center",
          }}
        >
          <PeopleOutlineIcon
            sx={{
              width: "16px",
              height: "10px",
              color: theme.palette.customText.primary.p4.active,
            }}
          />
          <Typography
            sx={{
              fontSize: "14px",
              fontFamily: "Geist, sans-serif",
              fontWeight: 400,
              lineHeight: 1.5,
              color: theme.palette.customText.primary.p4.active,
            }}
          >
            {headCount}
          </Typography>
        </Box>
      </Box>

      {/* Heads Wrapper */}
      <Box
        sx={{
          display: "flex",
          gap: "12px",
          height: "43px",
          width: "280px",
        }}
      >
        {/* Team Head */}
        <Box
          sx={{
            backgroundColor: "white",
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
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                fontFamily: "Geist, sans-serif",
                fontWeight: 500,
                lineHeight: 1.6,
                letterSpacing: "0.12px",
                color: theme.palette.customText.primary.p2.active,
                textTransform: "capitalize",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "80px",
              }}
            >
              {teamHead.name}
            </Typography>
            <Typography
              sx={{
                fontSize: "10px",
                fontFamily: "Geist, sans-serif",
                fontWeight: 400,
                lineHeight: 1.6,
                color: theme.palette.customText.primary.p4.active,
                whiteSpace: "nowrap",
              }}
            >
              {teamHead.title}
            </Typography>
          </Box>
        </Box>

        {/* Function Lead */}
        <Box
          sx={{
            backgroundColor: "white",
            display: "flex",
            gap: "8px",
            alignItems: "center",
            padding: "4px",
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
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                fontFamily: "Geist, sans-serif",
                fontWeight: 500,
                lineHeight: 1.6,
                letterSpacing: "0.12px",
                color: theme.palette.customText.primary.p2.active,
                textTransform: "capitalize",
                whiteSpace: "nowrap",
              }}
            >
              {functionLead.name}
            </Typography>
            <Typography
              sx={{
                fontSize: "10px",
                fontFamily: "Geist, sans-serif",
                fontWeight: 400,
                lineHeight: 1.6,
                color: theme.palette.customText.primary.p4.active,
                whiteSpace: "nowrap",
              }}
            >
              {functionLead.title}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
