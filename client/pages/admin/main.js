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

export default function main() {
  const router = useRouter();
  function main() {
    router.push("/admin/main");
  }
  function signout() {
    router.push("/");
  }
  function create() {
    router.push("/admin/main_admin");
  }
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
            <Button onClick={main} color="inherit">
              หน้าหลัก
            </Button>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button onClick={signout} color="inherit">
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <button type="button" onClick={create} className={styles.create}>
        --สร้างแบบสอบถาม--
      </button>
    </>
  );
}
