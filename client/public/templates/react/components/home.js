import GitHubIcon from "@mui/icons-material/GitHub";

import ArticleIcon from "@mui/icons-material/Article";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import { useState } from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MenuIcon from "@mui/icons-material/LinkedIn";
import { Tab } from "./Customs";
import { FadeBtn } from "./Customs";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from '@mui/base/NoSsr';
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Toolbar } from "@mui/material";

import { Button } from "@mui/material";
import { AppBar } from "@mui/material";

import { IconButton } from "@mui/material";

// import { Button } from "@mui/material";


// import  Card from './Cards';
// import MediaQuery from './mediaQueries';

const projectOne = "./images/imgs/projectOne.png";
const plannerPic = "./images/imgs/plannerpic.png";
const weatherPic = "./images/imgs/weatherpic.png";

const theme = createTheme(
);
 
export default function Home() {
  return (
    <ThemeProvider theme={theme}>
    <Grid container component="main" sx={{ height: '100vh' }}>
    <CssBaseline />
    <Grid
      item
      xs={false}
      sm={4}
      md={7}
      sx={{
        backgroundImage: '../assets/img/backgroundReact.avif',
        backgroundRepeat: 'no-repeat',
      }}
    />
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
     
        </Grid>
        </Grid>
        </ThemeProvider>
            
           
          
    
  );
}




const typs=['nathan','cole','fox']
function TabGroup() {
let types= typs
  const [active, setActive] = useState(types[0]);
  return (
    <>
      <Box
      >
        {types.map((type) => (
          <Tab
            key={type}
            active={active === type}
            onClick={() => setActive(type)}
          >
           this
          </Tab>
        ))}
      </Box>
      
    </>
  );
}
// const types = ["Cash", "Credit Card", "Bitcoin"];




export function Header() {
  return (
    <div> 
  <div> 
     <CssBaseline>
  
    <Container>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Box sx={{ mx: "auto" }}>
         <TabGroup />
        </Box>
        <FadeBtn></FadeBtn>
      </Toolbar>
      </Container>
      </CssBaseline>
      </div> 
      <div> 
    <Home />
  
</div>
</div> 
);
};


export function MobileHeader() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}


