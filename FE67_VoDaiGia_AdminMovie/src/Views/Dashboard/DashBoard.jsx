import { Container, Grid } from "@material-ui/core";
import axios from "axios";
import { stringify } from "query-string";
import React, { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Components/Header/Header";
import Pagination from "../../Components/Pagination/Pagination";
import Profile from "../../Components/Profile/Profile";
import createAction from "../../Store/Actions/action";
import actionType from "../../Store/Actions/type";

const DashBoard = () => {
  const [filter, setFilter] = useState({
    soTrang: 1,
    soPhanTuTrenTrang: 12,
  });

  const paramsString = stringify(filter);

  const dispatch = useDispatch();

  const userList = useSelector((state) => {
    return state.user.userList.content;
  });

  const fetchUserList = useCallback(() => {
    axios({
      method: "GET",
      url: `http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=GP01&${paramsString}`,
    })
      .then((res) => {
        console.log(res.data);
        dispatch(createAction(actionType.GET_USER_LIST, res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [paramsString, dispatch]);

  useEffect(() => {
    fetchUserList();
  }, [fetchUserList]);

  const handlePageChange = (newPage) => {
    console.log(newPage);
    setFilter({
      ...filter,
      soTrang: newPage,
    });
  };

  return (
    <div style={{ backgroundColor: "#bcbcbc" }}>
      <Header />
      <h1 style={{ textAlign: "center" }}>Account User List</h1>
      <Container maxWidth="xl" style={{ paddingTop: 20, paddingBottom: 50 }}>
        <Grid container spacing={3} style={{ paddingBottom: 50 }}>
          {userList?.items.map((item) => {
            return (
              <Grid xs={12} sm={6} md={4} item>
                <Profile key={item.taiKhoan} profile={item}></Profile>
              </Grid>
            );
          })}
        </Grid>
        <Pagination page={userList} onPageChange={handlePageChange} />
      </Container>
    </div>
  );
};
export default DashBoard;
