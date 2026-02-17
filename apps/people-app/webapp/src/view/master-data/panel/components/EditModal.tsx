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
import CloseIcon from "@mui/icons-material/Close";
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useState } from "react";

import { BusinessUnit, SubTeam, Team, Unit } from "@services/organization";

import {
  type ChildItem,
  getChildTypeLabel,
  getChildren,
  getEntityTypeName,
} from "../utils";
import { DeleteChild } from "./edit-modal/DeleteChild";
import { DeleteCurrent } from "./edit-modal/DeleteCurrent";
import { ManageChildren } from "./edit-modal/ManageChildren";
import { RenameField } from "./edit-modal/RenameField";
import { SectionHeader } from "./edit-modal/SectionHeader";
import { SwapLeads } from "./edit-modal/SwapLeads";

interface EditModalProps {
  open: boolean;
  onClose: () => void;
  data: BusinessUnit | Team | SubTeam | Unit;
  type: string;
}

export const EditModal: React.FC<EditModalProps> = ({ open, onClose, data }) => {
  const theme = useTheme();
  const [itemName, setItemName] = useState(data.name);
  const [selectedChildToDelete, setSelectedChildToDelete] = useState<ChildItem | null>(null);

  // Get children and their type dynamically
  const children = getChildren(data);
  const childTypeLabel = getChildTypeLabel(data);
  const entityTypeName = getEntityTypeName(data);

  const handleRename = () => {};

  const handleChildTransfer = () => {};

  const handleLeadSwap = () => {};

  const handleFunctionalLeadSwap = () => {};

  const handleDeleteCurrent = () => {};

  const handleDeleteChildren = () => {};

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      slotProps={{
        paper: {
          sx: {
            width: "700px",
            maxHeight: "600px",
            borderRadius: "8px",
            boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.1)",
            backgroundColor: theme.palette.fill.secondary.light.active,
            padding: "4px",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0px",
          paddingX: "12px",
          paddingY: "4px",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.customText.secondary.p1.active,
            fontWeight: 500,
          }}
        >
          Edit {entityTypeName}
        </Typography>

        <IconButton
          onClick={onClose}
          sx={{
            color: theme.palette.customText.primary.p2.active,
            p: 0,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          padding: 1.5,
          borderRadius: "12px",
          border: `1px solid ${theme.palette.customBorder.primary.b2.active}`,
          backgroundColor: theme.palette.surface.secondary.active,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          color: theme.palette.customText.primary.p2.active,
        }}
      >
        {/* General Section */}
        <Box
          sx={{
            display: "flex",
            marginTop: 1.5,
            padding: 0,
            flexDirection: "column",
            gap: 2.5,
          }}
        >
          <SectionHeader title="General" />
          <RenameField value={itemName} onChange={setItemName} onRename={handleRename} />
          {children.length > 0 && (
            <ManageChildren
              children={children}
              childType={childTypeLabel}
              onTransfer={handleChildTransfer}
            />
          )}
        </Box>

        {/* Leads Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
          }}
        >
          <SectionHeader title="Leads" />

          <SwapLeads
            businessUnitHead={data.teamHead}
            functionalLead={data.functionLead}
            onSwapBusinessUnitHead={handleLeadSwap}
            onSwapFunctionalLead={handleFunctionalLeadSwap}
          />
        </Box>

        {/* Danger Zone Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <SectionHeader title="Danger Zone" isBorderVisible={false} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              border: `1px solid ${theme.palette.error.light}`,
              borderRadius: "6px",
            }}
          >
            <DeleteCurrent onDelete={handleDeleteCurrent} />

            <Box
              sx={{
                width: "100%",
                height: "1px",
                backgroundColor: theme.palette.customBorder.primary.b2.active,
              }}
            />

            {children.length > 0 && (
              <DeleteChild
                children={children}
                childType={childTypeLabel}
                selectedChild={selectedChildToDelete}
                onChildSelect={setSelectedChildToDelete}
                onDelete={handleDeleteChildren}
              />
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
