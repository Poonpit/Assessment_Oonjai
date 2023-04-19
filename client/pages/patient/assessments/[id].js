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
import {v4} from "uuid";
import styles from "../../../styles/item.module.css";

export default function Component() {
  const router = useRouter();
  const [isrespones, setRespones] = useState(false);
  const [question, setQuestion] = useState([]);
  const [result, setResult] = useState([]);
  const [name, setName] = useState("");
  const [mytype, settype] = useState("");

  const [str_point, setStr_Point] = useState("");
  function signout() {
    router.push("/");
  }
  function assessment() {
    router.push("/patient/main_patient");
  }
  function history() {
    router.push("/patient/history");
  }
  const Cal = () =>{

    if(mytype == 0){
      return(
        <Min/>
      )
    }else if(mytype == 1){
      return(
        <Mid/>
      )
    }else{
      return(
        <Max/>
      )
    }
  }
  const Min = () =>{
    return(
      <div className={styles.min}>
      <h1>ผลลัพธ์หลังจากการทำแบบประเมินของความเสี่ยง{name[0].name}</h1>
      <p className={styles.min_text}>คุณมีความเสี่ยงมีความเสี่ยงอยู่ในระดับระดับต่ำ</p>
      <p>--เพิ่มเติม--</p>
      <p className={styles.min_des}>{result[0].description}</p>
      <button onClick={assessment}>กลับไปหน้าแรก</button>
    </div>
    )
  }
  const Mid = () =>{
    return(
      <div className={styles.mid}>
      <h1>ผลลัพธ์หลังจากการทำแบบประเมินของความเสี่ยง{name[0].name}</h1>
      <p className={styles.mid_text}>มีความเสี่ยงระดับปานกลาง</p>
      <p>--เพิ่มเติม--</p>
      <p className={styles.mid_des}>{result[1].description}</p>
      <button onClick={assessment}>กลับไปหน้าแรก</button>
    </div>
    )
  }
  const Max = () =>{
    return(
      <div className={styles.max}>
      <h1 >ผลลัพธ์หลังจากการทำแบบประเมินของความเสี่ยง{name[0].name}</h1>
      <p className={styles.max_text}>มีความเสี่ยงระดับสูง</p>
      <p>--เพิ่มเติม--</p>
      <p className={styles.max_des}>{result[2].description}</p>
      <button onClick={assessment}>กลับไปหน้าแรก</button>
    </div>
    )
  }
  const summit = async (e) =>{
    try {
      e.preventDefault()
      var stringOfNumbers = str_point
      const numbersArray = stringOfNumbers.split("");
      const sum = numbersArray.reduce((acc, curr) => acc + parseInt(curr), 0);
      const uuid =v4()
      var type = "ไม่เข้า"
      if(sum >= result[0].min && sum <= result[0].max){
        // มีความเสี่ยงระดับต่ำ
        type = 0
      }else if(sum >= result[1].min && sum <= result[1].max){
        // มีความเสี่ยงระดับปานกลาง
        type = 1
      }else{
        // มีความเสี่ยงระดับสูง
        type = 2
      }
      settype(type)
      const { data } =await axios.post(
        `http://localhost:8000/api/poon/patient/assessments/save`,
        {
          
          stringOfNumbers: stringOfNumbers,
          v4: uuid,
          result: type,
          length_ :question.length,
          name: name[0].name
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      // router.push("/admin/main");
      setRespones(true);
    } catch (e) {
      alert(e.response.data.message)
      console.log(e)
    }
  }
  const choiceChangeHandler = (e) => {
    var { name, value} = e.target;
    var string_input = str_point
    setStr_Point(string_input.substring(0, +name) + value + string_input.substring(+name + 1))
    console.log(str_point)
};
  
  const getFormAssessmentList = async (id) => {
    await axios
      .get(`http://localhost:8000/api/poon/patient/assessments/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((Response) => {
        setQuestion(Response.data.question);
        setResult(Response.data.result);
        setName(Response.data.name);
        var add = ""
        for(let i = 0; i < Response.data.question.length ; i++) {
          add += "0"
        }
        setStr_Point(add)
      });

  };
  console.log(result)
  function post() {
    setRespones(true);
  }
  const Title = () => {
    return (
      <div>
        <h1>
          <h1 className={styles.front}></h1>
          <h1 className={styles.front}>ตอบเเบบประเมินความเสี่ยง</h1>

        </h1>
      </div>
    );
  };
  useEffect(() => {
    // console.log(router.query.id)
    if (router.query.id) {
      getFormAssessmentList(router.query.id);
    }
  }, [router.query.id]);

  const QuestionList=()=> {
    return ( 
      <div>
        <Title/>
        
        <form>
          {question.map((val, key) => {
            return (
              <div key={key} className={styles.top}>
                <label>{"ข้อที่"+ val.number + ")  " + val.question}</label>
                <div >
                  <div className={styles.radio}>
                  <div>
                  <input
                    type="radio"
                    name={key}
                    value={1}
                    checked={str_point[key] === "1"}
                    onClick={choiceChangeHandler}
                  /><label>แทบไม่เป็นเลย</label>
                  </div>
                  <div>
                  <input
                    type="radio"
                    name={key}
                    value={2}
                    checked={str_point[key] === "2"}
                    onClick={choiceChangeHandler}
                  /><label>เป็นบางครั้ง</label>
                  </div>
                  <div>
                  <input
                    type="radio"
                    name={key}
                    value={3}
                    checked={str_point[key] === "3"}
                    onClick={choiceChangeHandler}
                  /><label>เป็นประจำ</label>
                  </div>
                  </div>
                </div>
                <h1>-------------------------------------------------------------------------------------------</h1>
              </div>
              
            );
          })}
          
          <button onClick={summit} className={styles.down}>ประเมิน</button>
        </form>
      </div>
    );
  }
  return (
    <>
      {isrespones 
      ? <Cal/> 
      : (
        <div>
          <div>
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
          </div>
          <div>
            <QuestionList />

          </div>
        </div>
      )}
    </>
  );
}
