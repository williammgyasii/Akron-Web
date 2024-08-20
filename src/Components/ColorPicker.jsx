import { Box, styled } from "@mui/material";

const ColorBox = styled(Box)(({ color, isSelected }) => ({
  width: "25px",
  height: "25px",
  borderRadius: "4px",
  backgroundColor: color,
  border: isSelected ? `2px solid ${color}` : `1px solid #ccc`,
  cursor: "pointer",
  margin: "2px",
}));

const colorOptions = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#FF33A1",
  "#33FFDA",
  "#FFB833",
  "#B833FF",
  "#33FF5E",
  "#FF5733",
  "#33FF57",
];

const ColorPicker = ({ onChange, selectedColor }) => {
  const handleColorSelect = (color) => {
    setFormState((prevState) => ({
      ...prevState,
      selectedColor: color,
    }));
  };
  <Box
    mt={2}
    sx={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {colorOptions.map((color) => (
      <ColorBox
        key={color}
        color={color}
        isSelected={color === selectedColor}
        onClick={() => handleColorSelect(color)}
      />
    ))}
  </Box>;
};
export default ColorPicker;
