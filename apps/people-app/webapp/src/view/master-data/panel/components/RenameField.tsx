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
import { Box, Button, TextField, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

const StyledTextField = styled(TextField)(() => ({
  flex: 1,
  "& .MuiOutlinedInput-root": {
    fontSize: "14px",
    fontFamily: "Geist, sans-serif",
    fontWeight: 400,
    lineHeight: 1.5,
  },
}));

const RenameButton = styled(Button)(({ theme }) => ({
  height: "37px",
  padding: "6px 16px",
  borderRadius: "6px",
  border: `1px solid ${theme.palette.customBorder.primary.b3.active}`,
  backgroundColor: "transparent",
  fontSize: "14px",
  fontFamily: "Geist, sans-serif",
  fontWeight: 500,
  lineHeight: 1.5,
  letterSpacing: "0.14px",
  color: theme.palette.customText.primary.p2.active,
  textTransform: "none",
  "&:hover": {
    backgroundColor: theme.palette.fill.neutral.light.hover,
    border: `1px solid ${theme.palette.customBorder.primary.b3.hover}`,
  },
}));

interface RenameFieldProps {
  value: string;
  onChange: (value: string) => void;
  onRename: () => void;
}

export const RenameField: React.FC<RenameFieldProps> = ({ value, onChange, onRename }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "100%",
      }}
    >
      <Typography
        sx={{
          fontSize: "14px",
          fontFamily: "Geist, sans-serif",
          fontWeight: 500,
          lineHeight: 1.5,
          letterSpacing: "0.14px",
          color: theme.palette.customText.primary.p2.active,
        }}
      >
        Business Unit Name
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          width: "100%",
        }}
      >
        <StyledTextField
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="People App"
          variant="outlined"
          fullWidth
        />
        <RenameButton onClick={onRename}>Rename</RenameButton>
      </Box>
    </Box>
  );
};
