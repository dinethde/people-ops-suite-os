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
import { useTheme } from "@mui/material/styles";

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
        variant="body1"
        sx={{
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
        <TextField
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="People App"
          variant="outlined"
          fullWidth
        />
        <Button onClick={onRename}>Rename</Button>
      </Box>
    </Box>
  );
};
