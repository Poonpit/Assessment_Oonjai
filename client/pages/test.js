import Axios from "axios";
import { useState } from "react";

function App(){
    const [employeeList, setEmployeeList] = uaeState([]);
    const getEmployees = () => {
        Axios.get('http://localhost:8000/api/poon/patient/main_patient').then((Response) => {
            setEmployeeList(Response.data);
        });
    }
    return(
        <>
        pppp
        <div>
            <button className="btn btn-primary" onClick={getEmployees}> show</button>
            {employeeList.map((val, key) => {
                return(
                    <div className="btn-primary">
                        <p className="card-text">Name: {val.name}</p>
                    </div>
                )
            })}
        </div>
        </>
    )
}