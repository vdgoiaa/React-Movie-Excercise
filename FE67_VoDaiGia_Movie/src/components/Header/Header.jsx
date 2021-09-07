import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import LocalMoviesIcon from "@material-ui/icons/LocalMovies";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./header.css";

const Header = () => {
  const account = useSelector((state) => {
    return state.account;
  });
  const handleSignout=()=>{
    localStorage.removeItem("accountToken");
    window.location.reload();
  }

  return (
    <div>
      <AppBar className="menu" position="static" style={{backgroundColor:"black",color:"orange"}}>
        <Container maxWidth="lg">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <LocalMoviesIcon fontSize="large" />
            </IconButton>
            <Typography className="title" variant="h4">
              GV Cinema
            </Typography>
            <NavLink
              className="navlink"
              activeClassName="activelink"
              to="/"
              exact
            >
              Home
            </NavLink>
            {account ? (
              <Fragment>
              <Typography className="activelink" component="h4" variant="h6">Hi ,{account?.content?.taiKhoan.toUpperCase()}</Typography>
              <NavLink
              className="navlink"
              activeClassName="activelink"
              to="/profile"
            >
              Profile
            </NavLink>
            <Button onClick={handleSignout} color="secondary" size="medium" variant="contained">Signout</Button>
            </Fragment>
            ) : (
              <Fragment>
                <NavLink
                  className="navlink"
                  activeClassName="activelink"
                  to="/signin"
                >
                  Signin
                </NavLink>
                <NavLink
                  className="navlink"
                  activeClassName="activelink"
                  to="/signup"
                >
                  Signup
                </NavLink>
              </Fragment>
            )}

           
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
export default Header;
