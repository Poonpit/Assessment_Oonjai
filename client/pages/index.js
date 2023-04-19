import * as React from "react";
import { Axios } from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useSession, signIn, signOut } from "next-auth/react";
import LoginForm from "./components/login-form";
export default function Component() {
  return (
    <>
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
              Oonjai
            </Typography>
            {/* <Button onClick={() => signIn()} color="inherit">
              Logout
            </Button> */}
          </Toolbar>
        </AppBar>
      </Box>
      <div>
        <LoginForm/>
      </div>
    </>
  );
}
