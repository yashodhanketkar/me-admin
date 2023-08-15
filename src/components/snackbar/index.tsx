import { Alert, AlertColor, Snackbar } from "@mui/material";

export type MessageSnackBarType = {
  severity: AlertColor;
  message: string;
};

interface IMessageSnackBar {
  openSnack: boolean;
  closeSnackBar: () => void;
  message: MessageSnackBarType;
}

export const MessageSnackBar = (props: IMessageSnackBar) => {
  const { openSnack, closeSnackBar, message } = props;

  return (
    <Snackbar open={openSnack} autoHideDuration={2000} onClose={closeSnackBar}>
      <Alert
        sx={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          paddingX: "2rem",
          paddingY: "1rem",
        }}
        severity={message.severity}
      >
        {message.message}
      </Alert>
    </Snackbar>
  );
};
