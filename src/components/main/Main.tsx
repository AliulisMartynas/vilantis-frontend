import { ApiLog, File, RequestStatus } from "../types";
import { Dispatch, FormEvent, Fragment, SetStateAction, useState } from "react";

import { Box } from "@mui/material";
import FileCard from "./FileCard";
import Form from "./Form";
import Snackbars from "./Snackbars";
import { getUserNames } from "./utils/userHelpers";
import { handleFileDelete } from "./utils/fileHandlers";

const RETRY_COUNT = 3;

type MainProps = {
  setApiLogs: Dispatch<SetStateAction<ApiLog[]>>;
};

const Main = (props: MainProps) => {
  const { setApiLogs } = props;

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    let requestStatus: RequestStatus = RequestStatus.Success;
    const userNameList = getUserNames(files);
    let count = RETRY_COUNT;
    while (count > 0) {
      try {
        const data = await fetch(
          "https://vilantis-frontend-homework.free.beeceptor.com/users",
          {
            body: `{"users":[${userNameList.join()}]}`,
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          }
        );
        console.log(data);
        setSuccessSnackbarOpen(true);
        setFiles([]);
        count = 0;
      } catch (error) {
        requestStatus = RequestStatus.Error;
        count--;
      }
    }

    if (requestStatus === RequestStatus.Error) {
      setErrorSnackbarOpen(true);
    }

    setLoading(false);
    setApiLogs((prevLogs) => [
      ...prevLogs,
      {
        status: requestStatus,
        userCount: userNameList.length,
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <Box display="inline-block">
      <Snackbars
        successSnackbarOpen={successSnackbarOpen}
        errorSnackbarOpen={errorSnackbarOpen}
        setSuccessSnackbarOpen={setSuccessSnackbarOpen}
        setErrorSnackbarOpen={setErrorSnackbarOpen}
      />
      {files.map((file, idx) => (
        <Fragment key={idx}>
          <FileCard
            file={file}
            handleFileDelete={() =>
              handleFileDelete(idx, files, setFiles, setError)
            }
            id={idx}
            loading={loading}
          />
        </Fragment>
      ))}
      <Form
        files={files}
        error={error}
        setFiles={setFiles}
        setError={setError}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Box>
  );
};

export default Main;
