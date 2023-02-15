import { Box, Typography } from "@mui/material";

type LabelAndValueProps = {
  label: string;
  value: string;
};

const LabelAndValue = (props: LabelAndValueProps) => {
  const { label, value } = props;
  return (
    <Box>
      <Typography
        sx={{
          fontWeight: 600,
        }}
      >
        {label}:
      </Typography>
      <Typography>{value}</Typography>
    </Box>
  );
};

export default LabelAndValue;
