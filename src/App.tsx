import "./App.css";

import { ApiLog, CurrentTab } from "./components/types";
import { Box, Tab, Tabs } from "@mui/material";
import { TabPanel, a11yProps } from "./components/tabs/TabPanel";

import Logs from "./components/logs/Logs";
import Main from "./components/main/Main";
import { useState } from "react";

const App = () => {
  const [currentTab, setCurrentTab] = useState<CurrentTab>(CurrentTab.Main);
  const [apiLogs, setApiLogs] = useState<ApiLog[]>([]);

  return (
    <div className="App">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={currentTab}
          onChange={() =>
            setCurrentTab(
              currentTab === CurrentTab.Main ? CurrentTab.Logs : CurrentTab.Main
            )
          }
          aria-label="tabs"
          centered
        >
          <Tab label="Main" {...a11yProps(0)} />
          <Tab label="Logs" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={currentTab} index={0}>
        <Main setApiLogs={setApiLogs} />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        <Logs apiLogs={apiLogs} />
      </TabPanel>
    </div>
  );
};

export default App;
