-- Initial user data (password is 'password' encrypted with BCrypt)
INSERT INTO users (id, username, email, password, role) VALUES
(1, 'john_doe', 'john.doe@example.com', '$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6', 'USER'),
(2, 'jane_smith', 'jane.smith@example.com', '$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6', 'USER')
ON DUPLICATE KEY UPDATE username=username;
