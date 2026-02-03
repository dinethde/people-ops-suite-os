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
import { Box, Divider, Skeleton, useTheme } from "@mui/material";

const InfoItemSkeleton = () => {
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
      <Skeleton
        variant="rectangular"
        width={85}
        height={20}
        sx={{
          borderRadius: "2px",
          bgcolor: theme.palette.customText.primary.p3.active,
        }}
      />

      <Skeleton
        variant="rectangular"
        width={135}
        height={25}
        sx={{
          borderRadius: "2px",
          bgcolor: theme.palette.customText.primary.p2.active,
        }}
      />
    </Box>
  );
};

export default function PersonalInfoSkeleton() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: "#f7f7f7",
        border: `1px solid ${theme.palette.customBorder.territory.active}`,
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: "16px 4px 4px 4px",
        width: "100%",
      }}
    >
      {/* Header Skeleton */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 1.5,
        }}
      >
        <Skeleton
          variant="rectangular"
          width={135}
          height={27}
          sx={{
            borderRadius: "2px",
            bgcolor: theme.palette.customText.primary.p2.active,
          }}
        />
        <VisibilityOutlinedIcon
          sx={{ fontSize: 24, color: theme.palette.customText.primary.p3.active }}
        />
      </Box>

      {/* Body Skeleton */}
      <Box
        sx={{
          bgcolor: theme.palette.surface.primary.active,
          border: `0.5px solid ${theme.palette.customBorder.territory.active}`,
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
          p: "20px 16px",
        }}
      >
        {/* Row 1: 4 items */}
        <Box
          sx={{
            display: "flex",
            gap: 2.5,
            minHeight: "52px",
            alignItems: "center",
          }}
        >
          {[...Array(4)].map((_, idx) => (
            <InfoItemSkeleton key={idx} />
          ))}
        </Box>

        <Divider
          sx={{
            borderColor: theme.palette.customBorder.territory.active,
          }}
        />

        {/* Row 2: 3 items */}
        <Box
          sx={{
            display: "flex",
            gap: 2.5,
            minHeight: "52px",
            alignItems: "center",
          }}
        >
          {[...Array(3)].map((_, idx) => (
            <InfoItemSkeleton key={idx} />
          ))}
        </Box>

        <Divider
          sx={{
            borderColor: theme.palette.customBorder.territory.active,
          }}
        />

        {/* Row 3: 4 items */}
        <Box
          sx={{
            display: "flex",
            gap: 2.5,
            minHeight: "52px",
            alignItems: "center",
          }}
        >
          {[...Array(4)].map((_, idx) => (
            <InfoItemSkeleton key={idx} />
          ))}
        </Box>

        <Divider
          sx={{
            borderColor: theme.palette.customBorder.territory.active,
          }}
        />

        {/* Row 4: 4 items */}
        <Box
          sx={{
            display: "flex",
            gap: 2.5,
            minHeight: "52px",
            alignItems: "center",
          }}
        >
          {[...Array(4)].map((_, idx) => (
            <InfoItemSkeleton key={idx} />
          ))}
        </Box>

        <Divider
          sx={{
            borderColor: theme.palette.customBorder.territory.active,
          }}
        />

        {/* Row 5: 2 items (last row) */}
        <Box
          sx={{
            display: "flex",
            gap: 2.5,
            minHeight: "52px",
            alignItems: "center",
          }}
        >
          {[...Array(2)].map((_, idx) => (
            <InfoItemSkeleton key={idx} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
