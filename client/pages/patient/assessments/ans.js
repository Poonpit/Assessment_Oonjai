import * as React from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
import { useState } from "react";
import Cookies from "js-cookie";
import styles from "../../styles/item.module.css";

export default function Component() {
  const router = useRouter();
  function signout() {
    router.push("/");
  }
  function assessment() {
    router.push("/patient/main_patient");
  }
  function history() {
    router.push("/patient/history");
  }
  const getAns = async (id) => {
    await axios
      .get(`http://localhost:8000/api/poon/patient/assessments/${id}/ans`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((Response) => {
        // setAssessmentList(Response.data);
      });
  };
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
            <Button onClick={assessment} color="inherit">
              ทำแบบสอบถาม
            </Button>
            <Button onClick={history} color="inherit">
              ประวัติแบบสอบถาม
            </Button>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              onAnimationEnd
            ></Typography>
            <Button onClick={signout} color="inherit">
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

<ans/>