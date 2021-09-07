import { Grid } from "@material-ui/core";
import { Container, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import { MovieItems } from "../../components/MovieItems/MovieItems";
import Pagination from "../../components/Pagination/Pagination";
import createAction from "../../store/actions/actions";
import actionType from "../../store/actions/type";
import queryString from "query-string";

const Home = () => {
  // console.log(props);

  // set phân trang
  const [filters,setFilters]=useState({
    soTrang:1,
    soPhanTuTrenTrang:12,
  })

  const paramsString=queryString.stringify(filters);

  const dispatch = useDispatch();

  const movieList = useSelector((state) => {
    return state.movies.movieList.content;
  });

  const fetchMovieList = useCallback(() => {
    
    axios({
      method: "GET",
      url: `http://movieapi.cyberlearn.vn/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01&${paramsString}`,
    })
      .then((res) => {
        console.log(res);
        dispatch(createAction(actionType.GET_MOVIE_LIST, res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch,paramsString]);
  
  useEffect(() => {
   
    fetchMovieList();
  },[fetchMovieList]);


  const handlePageChange = (newPage) => {
    console.log(newPage);
    setFilters({
      ...filters,soTrang:newPage,
    });
  };

  return (
    <div style={{backgroundColor:"#bcbcbc"}}>
      <Header />
      <Container maxWidth="lg" style={{ paddingTop: 20, paddingBottom: 50 }}>
        <Typography component="h2" variant="h3" gutterBottom align="center">
          Movie List
        </Typography>
        <Grid container spacing={3} style={{ paddingBottom: 50 }}>
          {movieList?.items.map((item) => {
            return (
              <Grid xs={12} sm={6} md={3} item>
                <MovieItems key={item.maPhim} movies={item} />
              </Grid> 
            ); 
          })}
        </Grid>
        <Pagination pagination={movieList} onPageChange={handlePageChange} />
      </Container>
    </div>
  );
};

export default Home;
