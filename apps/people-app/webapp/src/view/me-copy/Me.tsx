import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";

import TabsPage from "@layout/pages/TabsPage";

import GeneralInfo from "./panel/GeneralInfo";
import PersonalInfo from "./panel/PersonalInfo";

export default function Me() {
  return (
    <TabsPage
      title="Me"
      tabsPage={[
        {
          tabTitle: "General Info",
          tabPath: "general-info",
          icon: <InfoOutlinedIcon />,
          page: <GeneralInfo />,
        },
        {
          tabTitle: "Personal Info",
          tabPath: "personal-info",
          icon: <Person2OutlinedIcon />,
          page: <PersonalInfo />,
        },
      ]}
    />
  );
}
