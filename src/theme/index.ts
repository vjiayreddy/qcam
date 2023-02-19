import { createTheme } from "@mui/material";
import { COLORS } from "./colors";
export const theme = createTheme({
  components: {
    MuiAppBar: {
      defaultProps: {
        position: "static",
        elevation: 0,
      },
      styleOverrides: {
        positionStatic: {
          backgroundColor: COLORS.white,
          borderBottom: `1px solid ${COLORS.border}`,
        },
      },
    },
   
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: 11,
          fontWeight: "bold",
          padding: 5,
          borderLeft: "1px solid rgba(224, 224, 224, 1)",
          borderTop: "1px solid rgba(224, 224, 224, 1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        sizeSmall: {
          textTransform: "none",
          borderRadius: 5,
          minWidth: 75,
        },
      },
    },
  },
});
