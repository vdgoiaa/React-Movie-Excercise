import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";

const Profile = () => {
  const profile = useSelector((state) => {
    return state.account;
  });

  return (
    <div style={{backgroundColor:"#bcbcbc",height:"100vh"}}>
      <Header />
      <h1 style={{ textAlign: "center" }}>Profile</h1>
      <Container maxWidth="sm" style={{backgroundColor:"#eeeeee"}}>
        <Card>
          <CardActionArea>
            <CardMedia
              image="https://codelearn.io/Upload/Blog/react-js-co-ban-phan-1-63738082145.3856.jpg"
              title="Contemplative Reptile"
              style={{height:300}}
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="h3">
                Account Name : {profile?.content.taiKhoan}
              </Typography>
              <Typography gutterBottom variant="h4" component="h4">
                Password : {profile?.content.matKhau}
              </Typography>
              <Typography gutterBottom variant="h4" component="h4">
                Fullname : {profile?.content.hoTen}
              </Typography>
              <Typography gutterBottom variant="h4" component="h4">
                Email : {profile?.content.email}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Container>
    </div>
  );
};
export default Profile;
