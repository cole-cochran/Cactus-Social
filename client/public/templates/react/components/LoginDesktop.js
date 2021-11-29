import React from "react";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "@mui/material";
import { Button } from "@mui/material";



const LogoImg="./assets/img/logo.png"
//STYLING WILL COME BACK AND CHANGE TO SX

 const MainDiv=styled("div")({
    display: "flex"
    })

 const LoginFormSection=styled("section")({
    width:"50%",
    margin:'2rem',
    maxWidth:'22rem'

})
 export const Banner=styled("div")({
    height:"86.5vh",
    padding:'3rem',
    width:'100%',
    backgroundColor:"#501069"
  
})
 const LogoBox=styled("div")({
    width:"100%",
    display:"flex",
    justifyContent:"flex-start"
      

})

 const LoginForm=styled("form")({
   maxWidth:"30rem"  
}
)
export function LoginDesktop(){

    const loginSubmit=(e)=>{
        e.preventDefault();
        const loginBody = new FormData(e.currentTarget)
        console.log(loginBody.get('email'))
        console.log(loginBody.get('password'))
        //come back later/////////////////////////
    }   
return(
    <MainDiv>
        
        <LoginFormSection>
            <LogoBox>
                <img style={{ marginTop:"1rem",
                     width:"7rem"}} src={LogoImg} alt='wiener'/>
            </LogoBox>
            <LoginForm onClick={loginSubmit}>
            <Typography
                component='h3'
                sx={{
                pt:'3rem',
                fontSize:'1.5rem',
                fontFamily:'Montserrat'
                    }}
            >
                Log In Below
            </Typography>
        <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{bgcolor:"#56B524", mt: 3, mb: 2 }}
            >Log In
            </Button>
                </LoginForm>
        </LoginFormSection>
        <Banner>
            <Typography
            component='h1'
            sx={{fontSize:'2rem',color:'white',fontFamily:'sans-serif',fontWeight:'bold'}}
            >
                 A sleek, secure,<br/>
            and transparent platform...
            </Typography>
        </Banner>
    </MainDiv>   
)
}

