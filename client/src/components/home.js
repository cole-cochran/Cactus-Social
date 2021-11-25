import GitHubIcon from "@mui/icons-material/GitHub";
import ArticleIcon from "@mui/icons-material/Article";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MenuIcon from "@mui/icons-material/LinkedIn";

import { spacing } from '@mui/system';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Toolbar } from "@mui/material";
import { Button } from "@mui/material";
import { AppBar } from "@mui/material";
import { IconButton } from "@mui/material";
// import { Button } from "@mui/material";

// import  Card from './Cards';
// import MediaQuery from './mediaQueries';

const projectOne='./images/imgs/projectOne.png'
const plannerPic='./images/imgs/plannerpic.png'
const weatherPic='./images/imgs/weatherpic.png'

    const state=[{
        title:['project 1','project 2','project 3'],
           images:[projectOne,plannerPic,weatherPic],
           link:["https://cole-cochran.github.io/crypto-cosmos/","https://delmanat3.github.io/weather-page/","https://delmanat3.github.io/daily-planner/"],
           content:[]
       }]
export default function Home(){
    const theme = createTheme();
    return(
        <div>
<ThemeProvider theme={theme}>
<CssBaseline />
  {/* Hero unit */}
  
  <Box
    sx={{
      bgcolor: 'background.paper',
      pt: 8,
      pb: 3,
    }}
  >
    <Container maxWidth="md">
    <figure className="figure">
    <figcaption className="figure-caption fs-1">NATHAN DELMAN </figcaption>
    <img src="./images/imgs/backgroundReact.avif" className="figure-img img-fluid rounded" alt="backroundimg"/>
    <figcaption className="figure-caption">Welcome To The Wonderfull World Of BootStrap </figcaption>
    </figure>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        Fun filled times at UT Austin have led me here so please a look at my work below.
      </Typography>
    </Container>
  </Box>
  </ThemeProvider>
  
  {/* <Card state={state}/> */}
  </div>
  )
  }

  
export function Header() {

  return (
    <div>
    <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Box
        component='container'
        sx={{mx:"auto"}}

      >
        <Button 
        fontSize="inherit"
        href="#text-buttons"
        >explore </Button>
        <Button href="#text-buttons">explore </Button>
        <Button href="#text-buttons">explore </Button>
      </Box>
      <Button 
      variant="outlined"
      sx={{ml:"auto", transition: 'all 200ms ease'}} 
      size="small"
     
      endIcon={<GitHubIcon />}
      // make this cactus
      onClick={() => {
        alert('clicked');
      }}
      >
        Open Cactus
      </Button>
    </Toolbar>
    </div>

  );
}

export function MobileHeader(){

return(
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
)
}


/import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';

const CustomButtonRoot = styled('button')`
  background-color: #007fff;
  padding: 15px 20px;
  border-radius: 10px;
  color: #fff;
  font-weight: 600;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 14px;
  transition: all 200ms ease;
  cursor: pointer;
  box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0);
  border: none;

  &:hover {
    background-color: #0059b2;
  }

  &.${buttonUnstyledClasses.active} {
    background-color: #004386;
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: 0 0 0 0 rgba(0, 127, 255, 0);
  }
`;

function CustomButton(props) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
}

export function UnstyledButtonsSimple() {
  return (
    <Stack spacing={2} direction="row">
      <CustomButton>Button</CustomButton>
      <CustomButton disabled>Disabled</CustomButton>
    </Stack>
  );
}