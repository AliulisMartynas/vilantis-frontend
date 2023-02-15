import { File } from "../../types";

export const getAverageUserAge = (files: File[]) => {
  let userTotalSum = 0;
  let userCount = 0;
  files.forEach((file) => {
    file.users.forEach((user) => {
      userTotalSum += user.age;
      userCount++;
    });
  });
  return (userTotalSum / userCount).toFixed(2).toString();
};

export const getUserNames = (files: File[]) => {
  let users: string[] = [];
  files.forEach((file) => {
    file.users.forEach((user) => {
      users.push(`"${[user.firstName, user.lastName].join(" ")}"`);
    });
  });

  return users;
};
