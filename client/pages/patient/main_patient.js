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
import { Form } from "formik";
import { Label } from "@mui/icons-material";

export default function Component() {
  const router = useRouter();
  const [assessmentsList, setAssessmentList] = useState([]);
  const [render, setRender] = useState("/patient/main_patient");
  function signout() {
    router.push("/");
  }
  function assessment() {
    router.push("/patient/main_patient");
  }
  function history() {
    router.push("/patient/history");
  }
  function handleChange(myRadio) {
    return setRender("/patient/assessments/" + myRadio);
  }
  
  function add(e) {
    e.preventDefault()
    console.log(render);
    return router.push(render);
  }
  const getAssessmentList = async () => {
    await axios
      .get("http://localhost:8000/api/poon/patient/main_patient", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((Response) => {
        setAssessmentList(Response.data);
      });
  };
  useEffect(() => {
    getAssessmentList();
  }, []);
  const Title = () => {
    return (
      <div>
        <h1>
          <h1 className={styles.front}></h1>
          <h1 className={styles.front}>โปรดเลือกเเบบสอบถามที่ต้องการ</h1>
        </h1>
      </div>
    );
  };

  const Transaction = () => {
    return (
      <>
        <form className={styles.listform}>
          {assessmentsList.map((val, key) => {
            return (
              <>
                <input
                  type="radio"
                  name="radAnswer"
                  value={val.id}
                  key = {val.id}
                  onChange={()=>{handleChange(val.id)}}
                  // onSelect={()=>{handleChange(val.id)}}
                />
                {val.name}
              </>
            );
          })}
          <button className={styles.tap} onClick={add}>ยืนยัน</button>
        </form>
      </>
    );
  };
  // onChange={(event) => {
  //   setTextmax(event.target.value)}}
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
      <div>
        <Title />
        <Transaction />
      </div>
    </>
  );
}
