import { AppstoreFilled } from "@ant-design/icons";
import Login from "../Login";
import Register from "../Register";
import AddProduct from "../AddProduct";
import ProductDetail from "../ProductDetail";
import Users from "../Users";
import Moives from "../JSON/Components/Moives";

const AppRoutes = [
  { key: "1", exact: true, path: "/signin", component: Login },
  { key: "2", exact: true, path: "/signup", component: Register },
  {
    key: "3",
    exact: true,
    path: "/home",
    component: Moives,
    title: "Moives",
    icon: <AppstoreFilled />,
    isShowItem: true,
  },
  {
    key: "4",
    exact: true,
    path: "/addProduct",
    component: AddProduct,
    title: "AddProduct",
    icon: <AppstoreFilled />,
    isShowItem: true,
  },
  {
    key: "5",
    exact: true,
    path: "/getProductDetail/:id",
    component: ProductDetail,
    title: "ProductDetail",
    icon: <AppstoreFilled />,
    isShowItem: true,
  },
  {
    key: "6",
    exact: true,
    path: "/users",
    component: Users,
    title: "Users",
    icon: <AppstoreFilled />,
    isShowItem: true,
  },
  {
    key: "7",
    exact: true,
    path: "/addUser",
    component: Register,
    title: "addUser",
    icon: <AppstoreFilled />,
    isShowItem: true,
  },
];

export default AppRoutes;
