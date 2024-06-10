import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  FaHeart,
  FaNapster,
  FaNewspaper,
  FaRegSave,
  FaSave,
} from "react-icons/fa";

export default function TabComponent() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        typography: "body1",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box>
        <TabContext value={value}>
          <Box>
            <TabList
              className="TabList dark:border-white border-gray-400 border-b-[1px]"
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              <Tab label={<FaHeart size={25} />} value="1" />
              <Tab label={<FaNewspaper size={25} />} value="2" />
              <Tab label={<FaSave size={25} />} value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">Item One</TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}
