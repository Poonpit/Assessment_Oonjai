CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(55) NOT NULL,
    email VARCHAR(55) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM("ADMINISTRATOR", "DOCTOR", "PATIENT") NOT NULL,
    personal_information VARCHAR(255),
    unread_notification INT DEFAULT 0, -- Changed unreadNotification to unread_notification
    turn_on_notification BOOLEAN DEFAULT 0, -- New column
    
    INDEX(email)
);

CREATE TABLE IF NOT EXISTS profile_images (
    doctor_id VARCHAR(36) NOT NULL,
    image_id VARCHAR(36) NOT NULL,
    url VARCHAR(255) NOT NULL,

    FOREIGN KEY(doctor_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS topics (
    id VARCHAR(36) PRIMARY KEY,
    topic VARCHAR(55) UNIQUE NOT NULL,

    INDEX(topic)
);

CREATE TABLE IF NOT EXISTS interested_in (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    topic_id VARCHAR(36) NOT NULL,

    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(topic_id) REFERENCES topics(id)
);

CREATE TABLE IF NOT EXISTS questions (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL UNIQUE,
    content VARCHAR(255) NOT NULL,
    topic VARCHAR(36) NOT NULL,
    owner VARCHAR(36) NOT NULL,
    created_at DATETIME DEFAULT NOW(),

    FOREIGN KEY(topic) REFERENCES topics(id),
    FOREIGN KEY(owner) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS replies (
    id VARCHAR(36) PRIMARY KEY,
    q_id VARCHAR(36) NOT NULL,
    content VARCHAR(255) NOT NULL,
    r_by VARCHAR(36) NOT NULL,
    r_date DATE NOT NULL,
    r_time TIME NOT NULL,

    FOREIGN KEY(q_id) REFERENCES questions(id),
    FOREIGN KEY(r_by) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS blogs (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    views INT DEFAULT 0, 
    topic_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    created_at DATETIME DEFAULT NOW(),

    FOREIGN KEY(topic_id) REFERENCES topics(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS blog_images (
    blog_id VARCHAR(36) NOT NULL,
    url VARCHAR(255) NOT NULL,
    image_id VARCHAR(55) NOT NULL,

    FOREIGN KEY(blog_id) REFERENCES blogs(id)
);

CREATE TABLE IF NOT EXISTS blog_comments (
    blog_id VARCHAR(36) NOT NULL,
    comment VARCHAR(255) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    created_at DATETIME DEFAULT NOW(),

    FOREIGN KEY(blog_id) REFERENCES blogs(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS notifications (
    id VARCHAR(36) PRIMARY KEY,
    to_user_id VARCHAR(36) NOT NULL,
    content VARCHAR(255),
    type VARCHAR(24) NOT NULL,
    blog_id VARCHAR(36) NOT NULL,
    question_id VARCHAR(36) NOT NULL,
    created_at DATETIME,

    FOREIGN KEY(to_user_id) REFERENCES users(id),
    FOREIGN KEY(blog_id) REFERENCES blogs(id),
    FOREIGN KEY(question_id) REFERENCES questions(id)
);

CREATE TABLE IF NOt EXISTS assessments (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(55)NOT NULL
);

CREATE TABLE IF NOT EXISTS assessment_questions (
    assessment_id VARCHAR(36) NOT NULL,
    number INT NOT NULL,
    question VARCHAR(255),

    FOREIGN KEY(assessment_id) REFERENCES assessments(id)
);

CREATE TABLE IF NOT EXISTS assessment_results (
    assessment_id VARCHAR(36) NOT NULL,
    description VARCHAR(255) NOT NULL,
    level VARCHAR(8) NOT NULL,
    min INT NOT NULL,
    max INT NOT NULL,

    FOREIGN KEY(assessment_id) REFERENCES assessments(id)
);

CREATE TABLE IF NOT EXISTS histories (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    assessment_id VARCHAR(36) NOT NULL,
    result INT NOT NULL,
    created_at DATETIME DEFAULT NOW(),

    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS chats (
    sender VARCHAR(36) NOT NULL,
    receiver VARCHAR(36) NOT NULL,
    content VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,

    FOREIGN KEY(sender) REFERENCES users(id),
    FOREIGN KEY(receiver) REFERENCES users(id)
)