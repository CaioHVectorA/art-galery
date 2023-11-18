import Database, { Statement, SQLQueryBindings } from "bun:sqlite";
export const db = new Database('db.db') as Database

db.exec(`CREATE TABLE IF NOT EXISTS user (
    email VARCHAR(150),
    name VARCHAR(150),
    user_img VARCHAR(150),
    created_at DATETIME DEFAULT (DATETIME('now')),
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    updated_at DATETIME DEFAULT (DATETIME('now'))
    )`)

    db.exec(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255),
    description VARCHAR(500),
    src VARCHAR(500),
    user_id INTEGER,
    created_at DATETIME DEFAULT (DATETIME('now')),
    updated_at DATETIME DEFAULT (DATETIME('now')),
    FOREIGN KEY (user_id) REFERENCES user(id)
    )`)

