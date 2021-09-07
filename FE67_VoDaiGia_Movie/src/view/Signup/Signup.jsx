import Header from "../../components/Header/Header";
import React, { Fragment } from "react";
import { Container, TextField, Button, Typography } from "@material-ui/core";
import "./signup.css";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
  hoTen: yup.string().required("This is required !"),
  taiKhoan: yup.string().required("This is required !"),
  matKhau: yup.mixed().required("This is required !"),
  email: yup.string().required("This is required !").email("Invalid Email"),
  soDt: yup.string().required("This is required !").matches(/^[0-9]+$/g),
});

const Signup = () => {
  // const [formValue, setFormValue] = useState({
  //   hoTen: "",
  //   taiKhoan: "",
  //   matKhau: "",
  //   email: "",
  //   soDt: "",
  //   maNhom: "GP01",
  // });
  // const handleFormChange = (event) => {
  //   setFormValue({
  //     ...formValue,
  //     [event.target.name]: event.target.value,
  //   });
  // };
  // const handleSetDefaultUser = () => {
  //   setFormValue({
  //     ...formValue,
  //     hoTen: "gia",
  //     taiKhoan: "gia1999",
  //     matKhau: "daigia1999",
  //     email: "daigiavo1999@gmail.com",
  //     soDt: "0906930483",
  //     maNhom: "GP01",
  //   });
  // };

  // useFormik quan ly form

  const { handleChange, values,errors,touched,handleBlur,setTouched,isValid } = useFormik({
    initialValues: {
      hoTen: "",
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "GP01",
    },
    validationSchema:schema,
    validateOnMount:true,
  });

  const handleSignup = () => {
    axios({
      method: "POST",
      url: "http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/DangKy",
      data: values,
    })
      .then((res) => {
        console.log(res.data);
        alert("Signup Success");
      })
      .catch((err) => {
        console.log(err);
        alert("Signup Error");
      });
  };
  const handleSubmit=(event)=>{
    event.preventDefault();
    setTouched({
      hoTen: true,
      taiKhoan: true,
      matKhau: true,
      email: true,
      soDt: true,
    })
    if(isValid){
      console.log(values);
      handleSignup(event);
    }
    return;
  }

  return (
    <div style={{backgroundColor:"#bcbcbc",height:"100vh"}}>
      <Header />
      <Container style={{ paddingBottom: 50 }} maxWidth="sm">
        <h1 style={{ textAlign: "center" }}>Signup</h1>
        <form onSubmit={handleSubmit}>
          <div className="forminput">
            <TextField
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              // value={formValue.hoTen}
              name="hoTen"
              variant="outlined"
              label="Full Name :"
            ></TextField>
            {touched.hoTen && <Typography style={{color:"red",paddingTop:"10px"}} variant="subtitle2" component="p">{errors.hoTen}</Typography>}
          </div>
          <div className="forminput">
            <TextField
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              // value={formValue.taiKhoan}
              name="taiKhoan"
              variant="outlined"
              label="Account Name"
            ></TextField>
            {touched.taiKhoan && <Typography style={{color:"red",paddingTop:"10px"}} variant="subtitle2" component="p">{errors.taiKhoan}</Typography>}
          </div>
          <div className="forminput">
            <TextField
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              // value={formValue.matKhau}
              name="matKhau"
              variant="outlined"
              label="Password"
            ></TextField>
            {touched.matKhau && <Typography style={{color:"red",paddingTop:"10px"}} variant="subtitle2" component="p">{errors.matKhau}</Typography>}
          </div>
          <div className="forminput">
            <TextField
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              // value={formValue.email}
              name="email"
              variant="outlined"
              label="Email"
            ></TextField>
            {touched.email && <Typography style={{color:"red",paddingTop:"10px"}} variant="subtitle2" component="p">{errors.email}</Typography>}
          </div>
          <div className="forminput">
            <TextField
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              // value={formValue.soDt}
              name="soDt"
              variant="outlined"
              label="Phone number"
            ></TextField>
            {touched.soDt && <Typography style={{color:"red",paddingTop:"10px"}} variant="subtitle2" component="p">{errors.soDt}</Typography>}
          </div>
          <div className="button">
            <Button variant="contained" color="primary" type="submit">
              Signup
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Signup;
