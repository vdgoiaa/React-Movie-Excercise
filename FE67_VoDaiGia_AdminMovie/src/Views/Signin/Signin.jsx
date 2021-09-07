import { Button, Container, TextField, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import Header from "../../Components/Header/Header";
import "./signin.css";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import createAction from "../../Store/Actions/action";
import actionType from "../../Store/Actions/type";

const schema = yup.object().shape({
  taiKhoan: yup.string().required("This is required"),
  matKhau: yup.mixed().required("This is required"),
});

const Signin = (props) => {

  // account quản trị để test
  // Account : abc4567
 // Password : A@123456

 const dispatch=useDispatch();

  const {
    handleChange,
    values,
    errors,
    handleBlur,
    touched,
    isValid,
    setTouched,
  } = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    validationSchema: schema,
    validateOnMount: true,
  });

  const handleSignin=useCallback(()=>{
    axios({
      method:"POST",
      url:"http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/DangNhap",
      data:values,
    })
    .then((res)=>{
      console.log(res.data); 
      if(res.data.content.maLoaiNguoiDung==="QuanTri"){
        alert("Signin success with admin");
        dispatch(createAction(actionType.SET_ME,res.data));
        localStorage.setItem("managerToken",res.data.content.accessToken);
        props.history.push("/");
      }
      else{
        alert("Signin success but you want to be go to dashboard you must signin with Ma Loai Nguoi Dung : Quan Tri");
      }
      // dispatch(createAction(actionType.SET_ME,res.data));
      //   localStorage.setItem("managerToken",res.data.content.accessToken);
      //   props.history.push("/");
    })
    .catch((err)=>{
      console.log(err);
      alert("Signin error")
    })
  },[values, dispatch, props.history]);
  
  const handleSubmit=(event)=>{
    event.preventDefault();
    setTouched({
      taiKhoan:true,
      matKhau:true,
    })
    if(isValid){
      handleSignin();
    }
  };

  const handleNotice=()=>{
    alert("You must signin with Ma Loai Nguoi Dung : Quan Tri");
  }


  return (
    <div style={{height: "100vh" }}>
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
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              name="matKhau"
              variant="outlined"
              label="Password"
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
            <Button onClick={handleNotice} variant="contained" color="secondary" type="button">
              Notice
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};
export default Signin;
