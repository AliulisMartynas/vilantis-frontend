export type UserData = {
  User: string;
  name: string;
  Age: string;
};

export type User = {
  firstName: string;
  lastName: string;
  age: number;
};

export type File = {
  name: string;
  userCount: number;
  users: User[];
};

export type ApiLog = {
  status: RequestStatus;
  userCount: number;
  timestamp: Date;
};

export enum CurrentTab {
  Main = 0,
  Logs = 1,
}

export enum RequestStatus {
  Success = "Success",
  Error = "Error",
}
