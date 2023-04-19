const db = require("../../db");
const { v4 } = require("uuid");

class NotificationController {
    async sendQuestionNotificationToInterestedDoctors(topicId, questionId) {
        try {
            const query = `
                SELECT user_id FROM interested_in
                LEFT JOIN users
                ON interested_in.topic_id=? AND interested_in.user_id = users.id AND users.role="DOCTOR"
            `;
            const interestedUserIds = await db.connection.query(query, [topicId]);
            let valueStatements = "";
            for (let i = 0; i < interestedUserIds.length; i++) {
                i === interestedUserIds.length - 1
                    ? (valueStatements += `(${v4}, ${interestedUserIds[i].user_id}, "QUESTION", ${questionId}, NOW())`)
                    : `((${v4}, ${interestedUserIds[i].user_id}, "QUESTION", ${questionId}, NOW())), `;
            }
            await db.connection.query(`INSERT INTO notifications VALUES ${valueStatements}`);
        } catch (e) {
            throw new Error(e);
        }
    }

    async sendBlogNotificationToInterestedGeneralUsers(topicId, blogId) {
        try {
            const query = `
                SELECT user_id FROM interested_in
                LEFT JOIN users
                ON interested_in.topic_id=? AND interested_in.user_id = users.id
                AND users.role="PATIENT" AND users.turn_on_notification=1
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

            const notifications = await db.connection.query(query, [userId]);

            res.send({
                notifications,
            });

            await db.connection.query("UPDATE users SET unread_notification = 0 WHERE id=?", [userId]);
        } catch (e) {
            res.status(500).send({
                message: "Something went wrong",
            });
        }
    }

    async turnOnNotification(req, res) {
        const { userId } = req.user;
        const query = `
            UPDATE users SET turn_on_notification=1
            WHERE id=?
        `;
        try {
            await db.connection.query(query, [userId]);
            res.status(204).send();
        } catch (e) {
            res.status(500).send({
                message: "Something went wrong",
            });
        }
    }

    async turnOffNotification(req, res) {
        const { userId } = req.user;
        const query = `
            UPDATE users SET turn_on_notification=0
            WHERE id=?
        `;
        try {
            await db.connection.query(query, [userId]);
            res.status(204).send();
        } catch (e) {
            res.status(500).send({
                message: "Something went wrong",
            });
        }
    }
}

module.exports = NotificationController;
