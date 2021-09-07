import { createMuiTheme } from "@material-ui/core/styles";


const theme = createMuiTheme({
    breakpoints:{
        values:{
            xs:0,
            sm:576,
            md:768,
            lg:992,
            xl:1200,
        },
    },
    palette:{
        primary:{
            main:"#ff7043",
        },
        secondary:{
            main:"#c63f17",
        },
        info:{
            main:"#ffa270",
        }
    }

});
export default theme;