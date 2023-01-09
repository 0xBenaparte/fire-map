import React from "react";
import { Modal, Typography } from "@mui/material";

const SimpleModal = ({ isOpen, onClose, message }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableAutoFocus={true}
    >
      <div className="menu">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <strong>Attention !</strong>
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {message}
        </Typography>
      </div>
    </Modal>
  );
};
export default SimpleModal;
