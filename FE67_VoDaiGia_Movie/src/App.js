import { ThemeProvider } from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthRoute, PrivateRoute } from "./HOC/Route/route";
import createAction from "./store/actions/actions";
import actionType from "./store/actions/type";
import theme from "./theme/theme";
import Detail from "./view/Detail/Detail";
import Home from "./view/Home/Home";
import Profile from "./view/Profile/Profile";
import Signin from "./view/Signin/Signin";
import Signup from "./view/Signup/Signup";

const App = () => {
  const dispatch = useDispatch();

  const fetchMe = () => {
    axios({
      method: "POST",
      url: "http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accountToken"),
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(createAction(actionType.SET_ME, res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const accountToken = localStorage.getItem("accountToken");
    if (accountToken) {
      fetchMe();
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Switch>
            <PrivateRoute path="/detail/:id" exact component={Detail} />
            <AuthRoute
              path="/signin"
              exact
              component={Signin}
              redirectPath="/"
            />
            <AuthRoute
              path="/signup"
              exact
              component={Signup}
              redirectPath="/"
            />
            <PrivateRoute path="/profile" exact component={Profile} />
            <PrivateRoute
              path="/"
              exact
              component={Home}
              redirectPath="/signin"
            />
          </Switch>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
