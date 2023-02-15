import { Button, LinearProgress, Stack, Tooltip } from "@mui/material";
import { Dispatch, FormEvent, SetStateAction } from "react";

import { File } from "../types";
import LabelAndValue from "./utils/LabelAndValue";
import { getAverageUserAge } from "./utils/userHelpers";
import { handleFileAdd } from "./utils/fileHandlers";

type FormProps = {
  files: File[];
  error: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
  setError: Dispatch<SetStateAction<string>>;
  loading: boolean;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
};

const Form = (props: FormProps) => {
  const { files, error, setFiles, setError, loading, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <Tooltip title={error}>
          <Button
            variant="contained"
            component="label"
            color={error ? "error" : "primary"}
            disabled={loading}
          >
            Upload files
            <input
              type="file"
              hidden
              id="csvFileInput"
              accept=".csv"
              multiple
              onChange={(event) => handleFileAdd(event, setFiles, setError)}
            />
          </Button>
        </Tooltip>
        {files.length > 0 && (
          <LabelAndValue
            label="Average user age"
            value={getAverageUserAge(files)}
          />
        )}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={files.length === 0 || loading}
        >
          Submit
        </Button>
        {loading && <LinearProgress />}
      </Stack>
    </form>
  );
};

export default Form;
