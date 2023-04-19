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
const { v4 } = require("uuid");

export default function Component() {
  const router = useRouter();
  let number = 1;
  function main() {
    router.push("/admin/main");
  }
  function signout() {
    router.push("/");
  }

  const [name, setName] = useState("");
  const [inputFields, setInputFields] = useState([{ number: 1, qustion: "" }]);
  const [textmin, setTextmin] = useState("");
  const [textmid, setTextmid] = useState("");
  const [textmax, setTextmax] = useState("");

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };

  const addFields = () => {
    let newfield = { number: number, qustion: "" };
    setInputFields([...inputFields, newfield]);
  };
  const submit = (e) => {
    e.preventDefault();
  };

  // console.log(inputFields.length);

  const addQuestion = async (e) => {
    try {
      const { data } =await axios.post(
        "http://localhost:8000/api/poon/admin/main_admin",
        {
          name: String(name),
          qustion: inputFields,
          min_min: 1,
          min_max: 1 + (inputFields.length * 1) -1,
          mid_min: 1 + (inputFields.length * 1),
          mid_max: 1 + (inputFields.length * 2) -1,
          max_min: 1 + (inputFields.length * 2),
          max_max: inputFields.length * 3,
          textmin: textmin,
          textmid: textmid,
          textmax: textmax,
          v4: v4()
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      router.push("/admin/main");
    } catch (e) {
      alert(e.response.data.message)
    }
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
      <div className={styles.app}>
        <br></br>
        <h1>--สร้างแบบสอบถาม--</h1>
        <div className="information">
          <form action="" name="form">
            <div className="mb-3">
              <label htmlFor="name" className={styles.label}>
                ชื่อแบบประเมิน
              </label>
              <br></br>
              <input
                type="text"
                className="from-control"
                name="text1"
                onSubmit={submit}
                placeholder="กรอกชื่อแบบประเมิน"
                onChange={(event) => {
                  setName((event.target.value).toString());
                }}
              ></input>
            </div>
          </form>
          <label htmlFor="name" className={styles.label}>
            เพิ่มคำถาม
          </label>
        </div>
        <div className={styles.qus}>
          <form onSubmit={submit}>
            {inputFields.map((input, index) => {
              return (
                <div key={index}>
                  <input
                    className={styles.point}
                    name="age"
                    placeholder="Age"
                    value={"ข้อ " + number++}
                    onChange={(event) => handleFormChange(index, event)}
                  />
                  <input
                    className={styles.block}
                    name="qustion"
                    placeholder={"กรอกคำถาม"}
                    value={input.name}
                    onChange={(event) => handleFormChange(index, event)}
                  />
                </div>
              );
            })}
            <h1></h1>
            <button onClick={addFields}>เพิ่มข้อ</button>
            <h1></h1>
            <label htmlFor="name" className={styles.label}>
              ความเสี่ยงระดับต่ำ
            </label>
            <br></br>
            <label htmlFor="name" className={styles.label}>
              อยู่ระหว่าง -
            </label>
            <input onSubmit={submit}
              type="label"
              className={styles.number}
              value={1}
              onChange={(event) => {
                setmin_min(event.target.value);
              }}
            ></input>
            <label htmlFor="name" className={styles.label}>
              ถึง -
            </label>
            <input
              type="label"
              className={styles.number}
              value={1 + (inputFields.length * 1) -1 }
              onChange={(event) => {
                setmin_max(event.target.value);
              }}
            ></input>
            <br></br>
            <textarea
              type="text"
              className={styles.des}
              name="text"
              placeholder="กรอกคำบรรยายของความเสี่ยงระดับน้อย"
              onChange={(event) => {
                setTextmin(event.target.value);

              }}
            ></textarea>
            <br></br>
            <label htmlFor="name" className={styles.label}>
              ความเสี่ยงระดับปานกลาง:
            </label>
            <br></br>
            <label htmlFor="name" className={styles.label}>
              อยู่ระหว่าง -
            </label>
            <input
              type="label"
              className={styles.number}
              value={1 + (inputFields.length * 1)}
              onChange={(event) => {
                setmid_min(event.target.value);
              }}
            ></input>
            <label htmlFor="name" className={styles.label}>
              ถึง -
            </label>
            <input
              type="label"
              className={styles.number}
              value={1 + (inputFields.length * 2) - 1}
              onChange={(event) => {
                setmid_max(event.target.value);
              }}
            ></input>
            <br></br>

            <textarea
              type="text"
              name="text"
              className={styles.des}
              placeholder="กรอกคำบรรยายของความเสี่ยงระดับปานกลาง"
              onChange={(event) => {
                setTextmid(event.target.value);
              }}
            ></textarea>
            <br></br>
            <label htmlFor="name" className={styles.label}>
              ความเสี่ยงระดับสูง:
            </label>
            <br></br>
            <label htmlFor="name" className={styles.label} >
              อยู่ระหว่าง -
            </label>
            <input
              type="label"
              className={styles.number}
              value={1 + (inputFields.length * 2)}
              onChange={(event) => {
                setmax_min(event.target.value);
              }}
            ></input>
            <label htmlFor="name" className={styles.label}>
              ถึง -
            </label>
            <input
              type="label"
              className={styles.number}
              value={inputFields.length * 3}
              onChange={(event) => {
                setmax_max(event.target.value);
              }}
            ></input>
            <br></br>

            <textarea
              type="text"
              className={styles.des}
              name="text1"
              placeholder="กรอกคำบรรยายของความเสี่ยงระดับสูง"
              onChange={(event) => {
                setTextmax(event.target.value);
              }}
            ></textarea>

            <h1></h1>
            <button onClick={addQuestion}>ยืนยัน</button>
            <h1></h1>
          </form>
        </div>
      </div>
    </>
  );
}
