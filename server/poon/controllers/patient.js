const db = require("../../db");
const { v4 } = require("uuid");
const { query } = require("express");

class patientController {
  async getAssessmentList(req, res) {
    db.connection.query("SELECT * FROM assessments", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    });
  }
  async getFormpatient(req, res) {
    const { userId } = req.user;
    const { id } = req.params;
    const query_question = `
            SELECT aq.number, aq.question
            FROM assessment_questions AS aq
            WHERE assessment_id = ?
            ORDER BY aq.number ASC;
        `;
    const query_result = `
            SELECT r.description, r.level, r.min, r.max
            FROM assessment_results AS r
            WHERE assessment_id = ?
            ORDER BY r.min ASC;
        `;
    const query_name = `
            SELECT a.name
            FROM assessments AS a
            WHERE id = ?;
        `;
    // const query_name =
    // const query_result
    // db.connection.query("SELECT * FROM assessments",(err, result) => {
    //     if(err){
    //         console.log(err);
    //     } else {
    //         res.send(result);
    //         console.log(result);
    //     }
    // })
    try {
      const question = await db.connection.query(query_question, [id]);
      const result = await db.connection.query(query_result, [id]);
      const name = await db.connection.query(query_name, [id]);
      res.send({
        question: question,
        result: result,
        name: name,
      });
    } catch {
      res.status(500).send({
        message: "Something went wrong",
      });
    }
  }
  async getHistory(req, res) {
    const { userId } = req.user;

    const query = `
            SELECT * 
            FROM histories
            WHERE user_id = ?
            ORDER BY created_at DESC
        `;
    try {
      const history = await db.connection.query(query, [userId]);
      res.send({
        history: history,
      });
    } catch {
      res.status(500).send({
        message: "Something went wrong",
      });
    }
  }
  async postAns(req, res) {
    const { userId } = req.user;
    // const { id } = req.params;
    const { stringOfNumbers } = req.body;  //string input
    const { v4 } = req.body;     //V4
    const { result } = req.body;    // 0,1,2
    const { length_ } = req.body;    //question.length
    const { name } = req.body;     //name
    try {
      if (stringOfNumbers.length != length_) {
        return res.status(400).send({
          message: "โปรดกรอกข้อมูลให้ครบถ้วน",
        });
      }
        for (let i = 0; i < stringOfNumbers.length; i++) {
          if (stringOfNumbers[i] === "0") {
              return res.status(400).send({
                  message: "โปรดกรอกข้อมูลให้ครบถ้วน",
                });
          }
        }
      const query = `
                INSERT INTO histories (id, user_id, assessment_id, result)
                VALUES ("${v4}", "${userId}", "${name}", ${result});
            `;
      await db.connection.query(query);
      res.status(201).send({});
    } catch (e) {
      console.log(e);
      res.status(500).send({
        message: "Something went wrong",
      });
    }
  }
}
module.exports = patientController;
