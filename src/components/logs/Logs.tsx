import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { ApiLog } from "../types";

type LogsProps = {
  apiLogs: ApiLog[];
};

const Logs = (props: LogsProps) => {
  const { apiLogs } = props;

  return (
    <Box display="flex" justifyContent="center">
      <TableContainer sx={{ width: "45%" }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">User count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apiLogs.map((log, idx) => (
              <TableRow key={idx}>
                <TableCell component="th" scope="row">
                  {log.timestamp.toLocaleTimeString()}
                </TableCell>
                <TableCell>{log.status}</TableCell>
                <TableCell align="right">{log.userCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Logs;
