import axios from "axios";
import React, { useEffect } from "react";

export default function Application() {
  useEffect(() => {
    getInventoryData();
  }, []);

  const getInventoryData = async () => {
    const { data } = await axios.get("/inventoryProducts");
    console.log(data, "data");
  };
  return <div>Application</div>;
}
