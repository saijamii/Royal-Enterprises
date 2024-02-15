import { Drawer } from "antd";
import Lottie from "lottie-react";
import loading from "../JSON/loding.json";

const Loading = (props) => {
  const { enableLoading } = props;
  return (
    <Drawer
      className="background-transparent"
      visible={enableLoading}
      closable={false}
      placement="top"
      width="100%"
      height="100%"
      size="large"
    >
      <div className="loading-div">
        <Lottie animationData={loading} />
        <h1 className="please-wait">Loading...</h1>
      </div>
    </Drawer>
  );
};
export default Loading;
