const db = require("../../db")
const jwt = require("jsonwebtoken")

class AuthController {
    async signin(req, res) {
        const {email, password} = req.body;
    
        try {
            const [user] = await db.connection.query("SELECT id, name, email, password, role, unread_notification FROM users WHERE email=?", [email])
            if(!user) {
                return res.status(400).send({
                    message: "ไม่พบบัญชีผู้ใช้"
                })
            }
            if(user.password !== password) {
                return res.status(400).send({
                    message: "รหัสผ่านไม่ถูกต้อง"
                })
            }
            const token = jwt.sign({
                sub: user.id,
                role: user.role,
            }, process.env.JWT_AUTHORIZATION_KEY)
    
            res.send({
                id: user.id,
                name: user.name,
                role: user.role,
                unreadNotification: user.unreadNotification,
                token
            })
        }catch(e) {
            console.log(e);
            res.status(500).send({
                message: "Something went wrong"
            })
        }
    }
}

module.exports = AuthController;
