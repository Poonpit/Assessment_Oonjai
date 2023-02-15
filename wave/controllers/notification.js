const db = require("../../db");
const { v4 } = require("uuid");

class NotificationController {
    async sendNotificationToInterestedDoctors(topicId, questionId) {
        try {
            const query = `
                SELECT user_id FROM interested_in
                LEFT JOIN users
                ON interested_in.topic_id=? AND interested_in.user_id = users.id AND users.role="DOCTOR"
            `;
            const interestedUserIds = await db.connection.query(query, [topicId]);
            let valueStatement = "";
            for (let i = 0; i < interestedUserIds.length; i++) {
                i === interestedUserIds.length - 1
                    ? (valueStatement += `(${v4}, ${interestedUserIds[i].user_id}, "QUESTION", ${questionId}, NOW())`)
                    : `((${v4}, ${interestedUserIds[i].user_id}, "QUESTION", ${questionId}, NOW())), `;
            }
            await db.connection.query(`INSERT INTO notifications VALUES ${valueStatement}`);
        } catch (e) {
            throw new Error(e);
        }
    }

    async sendNotificationToInterestedGeneralUsers(topicId, blogId) {
        try {
            const query = `
                SELECT user_id FROM interested_in
                LEFT JOIN users
                ON interested_in.topic_id=? AND interested_in.user_id = users.id AND users.role="PATIENT"
            `;
            const interestedUserIds = await db.connection.query(query, [topicId]);
            let valueStatement = "";
            for (let i = 0; i < interestedUserIds.length; i++) {
                i === interestedUserIds.length - 1
                    ? (valueStatement += `(${v4}, ${interestedUserIds[i].user_id}, "BLOG", ${blogId}, NOW())`)
                    : `((${v4}, ${interestedUserIds[i].user_id}, "BLOG", ${blogId}, NOW())), `;
            }
            await db.connection.query(`INSERT INTO notifications VALUES ${valueStatement}`);
        } catch (e) {
            throw new Error(e);
        }
    }

    async getNotifications(req, res) {
        const { userId } = req.user;

        try {
            const query = `
                SELECT *
                FROM notifications
                WHERE to_user_id=?
                ORDER BY created_at DESC
            `;

            const notifications = await db.connection.query(query, [userId])

            res.send({
                notifications,
            });

            await db.connection.query("UPDATE users SET unreadNotification = 0 WHERE id=?", [
                userId,
            ]);
        } catch (e) {
            res.status(500).send({
                message: "Something went wrong",
            });
        }
    }
}

module.exports = NotificationController;
