import { Box, IconButton, Stack, Tooltip } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { File } from "../types";
import LabelAndValue from "./utils/LabelAndValue";

type FileCardProps = {
  file: File;
  handleFileDelete: (id: number) => void;
  id: number;
  loading: boolean;
};

const FileCard = (props: FileCardProps) => {
  const { file, handleFileDelete, id, loading } = props;

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      sx={{
        border: "1px solid #1976D2",
        borderRadius: 2,
        mb: 2,
        py: 1,
        px: 6,
      }}
      position="relative"
    >
      <Stack spacing={2} display="block">
        <LabelAndValue label="File name" value={file.name} />
        <LabelAndValue label="User count" value={file.userCount.toString()} />
      </Stack>
      <Tooltip title="Delete file">
        <IconButton
          sx={{ right: 0, top: 0, position: "absolute" }}
          onClick={() => handleFileDelete(id)}
          disabled={loading}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default FileCard;
