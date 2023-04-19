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
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import styles from "../../styles/item.module.css";

export default function Component() {
  const router = useRouter();
  const [history, sethistory] = useState([]);

  function signout() {
    router.push("/");
  }
  function assessment() {
    router.push("/patient/main_patient");
  }
  function history_() {
    router.push("/patient/history");
  }
  const getHistoryList = async () => {
    await axios
      .get("http://localhost:8000/api/poon/patient/history", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((Response) => {
        console.log(Response.data.history);
        let data = Response.data.history;
        for (let i = 0; i < Response.data.history.length; i++) {
          if (Response.data.history[i].result == 0) {
            data[i].result = "มีความเสี่ยงในระดับต่ำ";
          } else if (Response.data.history[i].result == 1) {
            data[i].result = "มีความเสี่ยงในระดับปานกลาง";
          } else {
            data[i].result = "มีความเสี่ยงในระดับสูง";
          }
        }
        sethistory(data);
      });
  };
  const Title = () => {
    return (
      <div>
        <h1>
          <h1 className={styles.front}></h1>
          <h1 className={styles.front}>ประวัติแบบสอบถาม</h1>
        </h1>
      </div>
    );
  };
  console.log(history);
  useEffect(() => {
    getHistoryList();
  }, []);
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
            <Button onClick={history_} color="inherit">
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
      <div>
        <Title/>
        {history.map((val, key) => {
          return (
            <div>
              <div className={styles.box}>
                <p className={styles.text}>
                  {"ผลลัพธ์จากการทำแบบประเมิน" + val.assessment_id}
                </p>
                <p className={styles.result}>{"คุณ" + val.result}</p>
                <p>{val.created_at}</p>
              </div>
              <h1></h1>
              <p></p>
            </div>
          );
        })}
      </div>
    </>
  );
}
