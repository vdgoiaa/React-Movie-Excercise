import ThemeProvider from "@material-ui/styles/ThemeProvider";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";
import "./App.css";
import { AuthRoute, PrivateRoute } from "./HOC/Route/Route";
import createAction from "./Store/Actions/action";
import actionType from "./Store/Actions/type";
import theme from "./Theme/theme";
import AddUser from "./Views/AddUser/AddUser";
import Dashboard from "./Views/Dashboard/DashBoard";
import EditUser from "./Views/EditUser/EditUser";
import Signin from "./Views/Signin/Signin";

const App = () => {
  const dispatch = useDispatch();

  const fetchMe = async () => {
    try {
      const res = await axios({
        method: "POST",
        url: "http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("managerToken"),
        },
      });
      console.log(res.data);
      dispatch(createAction(actionType.SET_ME, res.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const managerToken = localStorage.getItem("managerToken");
    if (managerToken) {
      fetchMe();
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Switch>
            <AuthRoute component={Signin} path="/signin" exact redirectPath="/" />
            <PrivateRoute component={AddUser} path="/adduser" exact redirectPath="/signin"/>
            <PrivateRoute component={EditUser} path="/edituser" exact redirectPath="/signin"/>
            <PrivateRoute component={Dashboard} path="/" exact redirectPath="/signin" />
          </Switch>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
