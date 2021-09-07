import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useCallback } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import createAction from "../../store/actions/actions";
import actionType from "../../store/actions/type";
import "./detail.css";

const Detail = (props) => {
  const dispatch = useDispatch();

  const movieDetail = useSelector((state) => {
    return state.movies.movieDetails;
  });

  const getMovieDetails = useCallback(
    (id) => {
      axios({
        method: "GET",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?",
        params: {
          MaPhim: id,
        },
      })
        .then((res) => {
          console.log(res);
          dispatch(createAction(actionType.GET_MOVIE_DETAILS, res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [dispatch]
  );

  useEffect(() => {
    const movieId = props.match.params.id;
    // console.log(props);
    console.log(movieId);
    getMovieDetails(movieId);
  }, [getMovieDetails, props.match.params.id]);

  return (
    <div style={{backgroundColor:"#bcbcbc"}}>
      <Header />
      <Container maxWidth="lg">
        <Typography gutterBottom variant="h3" component="h2" align="center">
          Details
        </Typography>
        <Card style={{backgroundColor:"#eeeeee"}}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Movie Details"
              height="500"
              image={movieDetail.hinhAnh}
              title="Movie Details"
              className="card_img"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="h2">{movieDetail.tenPhim}</Typography>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                component="p"
                gutterBottom
              >{movieDetail.moTa}</Typography>
              <Typography gutterBottom variant="h6" component="h2">Trailer</Typography>
              <iframe width="100%" height="500px" src={movieDetail.trailer} title="Trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="medium" color="primary" variant="contained">
              Add to playlist
            </Button>
            <Button size="medium" color="secondary" variant="contained">
              Watch Now
            </Button>
          </CardActions>
        </Card>
      </Container>  
      
    </div>
  );
};

export default Detail;
