import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import React from 'react'
import { NavLink } from 'react-router-dom'


export const MovieItems = (props) => {  
    return (
        <div>
            <Card style={{minHeight:"500px",backgroundColor:"#eeeeee"}}>
              <CardActionArea>
                <CardMedia
                  image={props.movies.hinhAnh}
                  title="Film List"
                  style={{height:"300px",width:"100%"}}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2" style={{height:"55px"}}>
                    {props.movies.tenPhim}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="default"
                    component="p"
                    style={{height:"100px"}}
                  >
                   {props.movies.moTa.substr(0,100) + "..."}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                {/* <Button size="medium" color="primary" variant="contained">
                  Watch
                </Button> */}
                <NavLink to={`./detail/${props.movies.maPhim}`} component={Button} size="medium" color="primary" variant="contained">
                  See Detail
                </NavLink>
              </CardActions>
            </Card>
        </div>
    )
}
