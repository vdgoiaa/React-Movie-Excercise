import Header from "../../components/Header/Header";
import React from "react";
import { Button, Container, TextField, Typography } from "@material-ui/core";
import "./signin.css";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import createAction from "../../store/actions/actions";
import actionType from "../../store/actions/type";
import { useCallback } from "react";

const schema = yup.object().shape({
  taiKhoan: yup.string().required("This is required !"),
  matKhau: yup.mixed().required("This is required !"),
});

const Signin = (props) => {
  const dispatch = useDispatch();

  const {
    handleChange,
    values,
    errors,
    handleBlur,
    touched,
    setTouched,
    isValid,
    setValues,
  } = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    validationSchema: schema,
    validateOnMount: true,
  });

  const handleSignin = useCallback(() => {
    axios({
      method: "POST",
      url: "http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/DangNhap",
      data: values,
    })
      .then((res) => {
        console.log(res.data);
        alert("Signin Success");
        if (dispatch(createAction(actionType.SET_ME, res.data))) {
          localStorage.setItem("accountToken", res.data.content.accessToken);
          props.history?.push("/");
        }
        
      })
      .catch((err) => {
        console.log(err);
        alert("Signin Error");
      });
  },[dispatch, props.history, values]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched({
      taiKhoan: true,
      matKhau: true,
    });
    if (isValid) {
      handleSignin();
      
    }
    return;
  };

  const handleSetDefaultUser = () => {
    setValues({
      taiKhoan: "gia1999",
      matKhau: "daigia1999",
    });
  };

  return (
    <div style={{backgroundColor:"#bcbcbc" ,height:"100vh"}}>
      <Header />
      <h1 style={{ textAlign: "center" }}>Signin</h1>
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <div className="forminput">
            <TextField
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              name="taiKhoan"
              variant="outlined"
              label="Account Name"
              value={values.taiKhoan}
            ></TextField>
            {touched.taiKhoan && (
              <Typography
                style={{ color: "red", paddingTop: "10px" }}
                variant="subtitle2"
                component="p"
              >
                {errors.taiKhoan}
              </Typography>
            )}
          </div>
          <div className="forminput">
            <TextField
              fullWidth
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              name="matKhau"
              variant="outlined"
              label="Password"
              value={values.matKhau}
            ></TextField>
            {touched.matKhau && (
              <Typography
                style={{ color: "red", paddingTop: "10px" }}
                variant="subtitle2"
                component="p"
              >
                {errors.matKhau}
              </Typography>
            )}
          </div>
          <div className="button">
            <Button
              style={{ marginRight: "15px" }}
              variant="contained"
              color="primary"
              type="submit"
            >
              Signin
            </Button>
            <Button
              onClick={handleSetDefaultUser}
              variant="contained"
              color="default"
              type="button"
            >
              Default User
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Signin;
