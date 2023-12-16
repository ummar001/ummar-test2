import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { FunctionComponent, PropsWithChildren } from "react";

interface IReusableModalProps {
  isOpen: boolean
  handleClose: () => void
  title?: string
  width: unknown
}

export const ReusableModal: FunctionComponent<
  PropsWithChildren<IReusableModalProps>
> = ({ isOpen, handleClose, title, children, width }) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-content"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: width as string,
          backgroundColor: "white",
          padding: {
            xs: 1,
            md: 3,
          },
          borderRadius: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 1,
          }}
        >
          <Typography variant="h5" id="modal-title" fontWeight="bold">
            {title}
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{ marginRight: { xs: -1.5, md: -2.5 } }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>
        <Box sx={{ width: "100%" }}>{children}</Box>
      </Box>
    </Modal>
  );
};
