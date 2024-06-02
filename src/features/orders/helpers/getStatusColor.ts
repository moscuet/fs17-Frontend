import theme from "../../../theme/theme";

export const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return theme.palette.success.main;
      case "cancelled":
        return theme.palette.error.main;
      case "processing":
        return theme.palette.info.main;
      default:
        return theme.palette.text.primary;
    }
  };
