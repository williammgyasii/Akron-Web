import { Modal, styled } from "@mui/material";

const ModalParent = styled(Modal)(() => ({
  position: "fixed",
  inset: 0,
  zIndex: 50,
  backgroundColor: "rgba(0, 0, 0, 0.85)", // Tailwind equivalent: bg-black bg-opacity-50
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

function AnimatedModal({ isOpen, onClose, children }) {
  return (
    <ModalParent
      BackdropProps={{
        style: { backgroundColor: "rgba(0, 0, 0, 0.86)" },
        onClick: (e) => e.stopPropagation(),
      }}
      open={isOpen}
      onClose={onClose}
    >
      {children}
    </ModalParent>
  );
}

export default AnimatedModal;
