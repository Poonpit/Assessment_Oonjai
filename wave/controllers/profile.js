const db = require("../../db");

class ProfileController {
    async getProfile(req, res) {
        const { userId } = req.user;
        try {
            const [user] = await db.connection.query(
                "SELECT id, name, role, unreadNotification FROM users WHERE id=?",
                [userId]
            );

            res.send({
                user,
            });
        } catch (e) {
            res.status(500).send({
                message: "Something went wrong",
            });
        }
    }
}

module.exports = ProfileController;
