import { Drawer } from "antd";
import Lottie from "lottie-react";
import loading from "../JSON/loding.json";

const Loading = (props) => {
  const { enableLoading } = props;
  return (
    <Drawer
      className="background-transparent"
      open={!enableLoading}
      closable={false}
    >
      <div className="loading-div">
        <Lottie
          animationData={loading}
          style={{
            justifyContent: "center",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1 className="please-wait">Please wait...</h1>
        </div>
      </div>
    </Drawer>
  );
};
export default Loading;
