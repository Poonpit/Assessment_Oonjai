const db = require("../../db");
const { v4 } = require("uuid");

class adminController {
  async getQuestionList(req, res) {
    const { userId } = req.user;
    const { name } = req.body;
    const { qustion } = req.body;
    const { min_min } = req.body;
    const { min_max } = req.body;
    const { mid_min } = req.body;
    const { mid_max } = req.body;
    const { max_min } = req.body;
    const { max_max } = req.body;
    const { textmin } = req.body;
    const { textmid } = req.body;
    const { textmax } = req.body;
    const { v4 } = req.body;
    try {
      if (name == "") {
        return res.status(400).send({
          message: "โปรดกรอกข้อมูลให้ครบถ้วน",
        });
      }
      if (textmin == "") {
        return res.status(400).send({
          message: "โปรดกรอกข้อมูลให้ครบถ้วน",
        });
      }
      if (textmid == "") {
        return res.status(400).send({
          message: "โปรดกรอกข้อมูลให้ครบถ้วน",
        });
      }
      if (textmax == "") {
        return res.status(400).send({
          message: "โปรดกรอกข้อมูลให้ครบถ้วน",
        });
      }
      for (let i = 0; i < qustion.length; i++) {
        if (qustion[i].qustion == "") {
          return res.status(400).send({
            message: "โปรดกรอกข้อมูลให้ครบถ้วน",
          });
        }
      }
      const check = `
          SELECT a.name
          FROM assessments AS a
          WHERE a.name = "${name}"
      `
      const [result] = await db.connection.query(check);
      if(result){
        return res.status(409).send({
          message: "มีแบบประเมินนี้มีอยู่แล้ว กรุณากรอกใหม่"
        })
      }
      const qurry_assessment = `
            INSERT INTO assessments (id, name)
            VALUES ("${v4}", "${name}");
            `;
      let valueStatements = "";
      for (let i = 0; i < qustion.length; i++) {
        i === qustion.length - 1
          ? (valueStatements += `("${v4}", ${qustion[i].number}, "${(qustion[i].qustion)}")`)
          : (valueStatements +=`("${v4}", ${qustion[i].number}, "${qustion[i].qustion}"),`);
      }
      const qurry_assessment_results_min = `
            INSERT INTO assessment_results (assessment_id, description, level, min, max)
            VALUES ("${v4}", "${textmin}", "MIN", ${min_min}, ${min_max});
            `;
      const qurry_assessment_results_mid = `
            INSERT INTO assessment_results (assessment_id, description, level, min, max)
            VALUES ("${v4}", "${textmid}", "MID", ${mid_min}, ${mid_max});
            `;
      const qurry_assessment_results_max = `
            INSERT INTO assessment_results (assessment_id, description, level, min, max)
            VALUES ("${v4}", "${textmax}", "MAX", ${max_min}, ${max_max});
            `;
      
      await db.connection.query(qurry_assessment);
      await db.connection.query(
        `INSERT INTO assessment_questions (assessment_id, number, question) VALUES ${valueStatements}`
      );
      await db.connection.query(qurry_assessment_results_min);
      await db.connection.query(qurry_assessment_results_mid);
      await db.connection.query(qurry_assessment_results_max);
      res.status(201).send({});
    } catch (e) {
        console.log(e)
      res.status(500).send({
        message: "Something went wrong",
      });
    }
  }
}

module.exports = adminController;
