import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { stringify } from "query-string";
import React from "react";
import { NavLink } from "react-router-dom";

const Profile = (props) => {
  const taiKhoanDelete={
    TaiKhoan:props.profile.taiKhoan,
  }

  const paramsDelete=stringify(taiKhoanDelete);

  const handleDeleteUser=()=>{
    axios({
      method:"DELETE",
      url:`http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/XoaNguoiDung?${paramsDelete}`,
      headers:{
        Authorization:"Bearer " + localStorage.getItem("managerToken"),
      }
    })
    .then((res)=>{
      console.log(res.data);
      alert("Delete user success");
      window.location.reload();
    })
    .catch((err)=>{
      console.log(err);
      alert("Người dùng này đã đặt vé xem phim không thể xóa!");
      console.log(props.profile.taiKhoan);
    })
  }

  return (
    <div>
        <Card style={{minHeight:"300px"}}>
          <CardContent>
          <Typography color="textPrimary" variant="h6" gutterBottom>
              Name : {props.profile?.hoTen.substr(0,15) + "..."}
            </Typography>
            <Typography color="textPrimary" variant="h6" gutterBottom>
              Account : {props.profile?.taiKhoan}
            </Typography>
            <Typography color="textPrimary" variant="h6" gutterBottom>
              Password : {props.profile?.matKhau}
            </Typography>
            <Typography color="textPrimary" variant="h6" gutterBottom>
              Email : {props.profile?.email.substr(0,15) + "..."}
            </Typography>
            <Typography color="textPrimary" variant="h6" gutterBottom>
              Ma Loai Nguoi Dung : {props.profile?.maLoaiNguoiDung}
            </Typography>
          </CardContent>
          <CardActions>
            <NavLink component={Button} variant="contained" size="medium" color="primary" to="/edituser" exact>Edit</NavLink>
            <Button onClick={handleDeleteUser} size="medium" variant="contained" color="secondary">Delete</Button>
          </CardActions>
        </Card>
    </div>
  );
};
export default Profile;
