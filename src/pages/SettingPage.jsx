import { useSelector } from "react-redux";
import TabComponent from "../components/TabComponent";
import Upload from "../components/Upload";

function SettingPage() {
  return (
    <>
      <Upload />
      <Content />
      <TabComponent />
    </>
  );
}
function Content() {
  const user = useSelector((store) => store.account.user);
  return (
    <div className="text-center my-3">
      <h1>{user?.username}</h1>
      <h2>{user?.email}</h2>
    </div>
  );
}
export default SettingPage;
