import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupProps
} from "@mui/material";

export default function ToggleFormType({
  value,
  onChange
}: ToggleButtonGroupProps) {
  return (
    <Box flexGrow={1}>
      <ToggleButtonGroup
        color="primary"
        exclusive
        aria-label="Form type"
        value={value}
        onChange={onChange}
        fullWidth
      >
        <ToggleButton value="email" fullWidth>Email</ToggleButton>
        <ToggleButton value="name" fullWidth>Name</ToggleButton>
      </ToggleButtonGroup>
    </Box>

  )
}