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

export default function GeneralInfoSkeleton() {
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
        {/* 6 rows of skeleton items */}
        {[...Array(6)].map((_, rowIndex) => (
          <Box key={rowIndex}>
            <Box
              sx={{
                display: "flex",
                gap: 2.5,
                minHeight: "52px",
                alignItems: "center",
              }}
            >
              <InfoItemSkeleton />
              <InfoItemSkeleton />
              <InfoItemSkeleton />
              <InfoItemSkeleton />
            </Box>
            {rowIndex < 5 && (
              <Divider
                sx={{
                  mt: 2.5,
                  borderColor: theme.palette.customBorder.territory.active,
                }}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
