import { useTheme } from "@mui/material";
import { motion } from "framer-motion";
import CustomBorderlessInput from "./CustomBorderlessInput";
import CustomBorderlessMultiInput from "./CustomBorderlessMultiInput";

export const TaskDescription = ({ taskDesc, setTaskDesc, description }) => {
  const theme = useTheme();
  return (
    <motion.div
      style={{
        backgroundColor: "#F2F2F2",
        borderRadius: "10px",
        padding: "10px",
      }}
    >
      <CustomBorderlessMultiInput
        placeholder="Description"
        value={taskDesc}
        onChange={(e) => setTaskDesc(e.target.value)}
      />
      ACRIOACR
    </motion.div>
  );
};

export const SettingsTab = ({}) => {
  return <div>Settings</div>;
};
