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
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { TeamHead } from "@root/src/services/organization";

import { truncateName } from "../../utils";

interface LeadRowProps {
  label: string;
  lead: TeamHead;
  onSwap: () => void;
}

const MAX_LENGTH = 12;

const LeadRow: React.FC<LeadRowProps> = ({ label, lead, onSwap }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        paddingX: "4px",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.customText.primary.p2.active,
          width: "fit-content",
        }}
      >
        {label}
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            padding: "4px",
            borderRadius: "4px",
            maxWidth: "200px",
          }}
        >
          <Avatar
            src={lead.avatar}
            sx={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
            }}
          >
            {lead.name.charAt(0)}
          </Avatar>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              overflow: "hidden",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.customText.primary.p2.active,
              }}
            >
              {truncateName(lead.name, MAX_LENGTH)}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                color: theme.palette.customText.primary.p4.active,
              }}
            >
              {truncateName(lead.title, MAX_LENGTH)}
            </Typography>
          </Box>
        </Box>

        <IconButton
          onClick={onSwap}
          sx={{
            ml: 2,
            height: "37px",
            width: "37px",
            border: `1px solid ${theme.palette.customBorder.primary.b3.active}`,
            borderRadius: "6px",
            padding: "6px 12px",
            "&:hover": {
              backgroundColor: theme.palette.fill.neutral.light.hover,
              border: `1px solid ${theme.palette.customBorder.primary.b3.hover}`,
            },
          }}
        >
          <SwapHorizIcon
            sx={{
              width: "16px",
              height: "16px",
              color: theme.palette.customText.primary.p2.active,
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

interface SwapLeadsProps {
  businessUnitHead: TeamHead | undefined;
  functionalLead: TeamHead | undefined;
  onSwapBusinessUnitHead: () => void;
  onSwapFunctionalLead: () => void;
}

export const SwapLeads: React.FC<SwapLeadsProps> = ({
  businessUnitHead,
  functionalLead,
  onSwapBusinessUnitHead,
  onSwapFunctionalLead,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "40px",
        width: "100%",
        alignItems: "flex-start",
      }}
    >
      {businessUnitHead && (
        <LeadRow
          label="Business Unit Head"
          lead={businessUnitHead}
          onSwap={onSwapBusinessUnitHead}
        />
      )}

      {functionalLead && (
        <LeadRow label="Functional Lead" lead={functionalLead} onSwap={onSwapFunctionalLead} />
      )}
    </Box>
  );
};
