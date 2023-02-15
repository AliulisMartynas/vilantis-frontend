import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { File, User, UserData } from "../../types";

import Papa from "papaparse";

export const handleFileDelete = (
  id: number,
  files: File[],
  setFiles: Dispatch<SetStateAction<File[]>>,
  setError: Dispatch<SetStateAction<string>>
) => {
  setFiles([...files.slice(0, id), ...files.slice(id + 1)]);
  setError("");
};

export const handleFileAdd = (
  event: ChangeEvent<HTMLInputElement>,
  setFiles: Dispatch<SetStateAction<File[]>>,
  setError: Dispatch<SetStateAction<string>>
) => {
  setError("");
  if (event.target.files) {
    const uploadedFiles = event.target.files;
    let error = "";
    Array.from(uploadedFiles).forEach((file) => {
      try {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const csvData = results.data as UserData[];
            let users: User[] = [];
            csvData.forEach((dataRow) => {
              const { User, name, Age } = dataRow;
              if (Boolean(User) && Boolean(name) && Boolean(Age)) {
                users.push({
                  firstName: User,
                  lastName: name,
                  age: Number(Age),
                });
              } else {
                error = `There are issues within the contents of file ${file.name}. Check, whether the contents of the file are correct and try again.`;
              }
            });
            if (users.length > 0) {
              setFiles((prevFiles) => [
                ...prevFiles,
                { name: file.name, userCount: csvData.length, users: users },
              ]);
            } else {
              setError(error);
            }
          },
        });
      } catch (error) {
        setError(
          `An issue appeared while uploading file ${file.name}. Please, try again.`
        );
      }
    });
  }
};
