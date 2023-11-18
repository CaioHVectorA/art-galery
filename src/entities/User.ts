import { db } from '../factories/db'
export class User { 
    email: string
    name: string
    id: number;
    // insert = db.query(`
    // INSERT INTO user (email, name)
    // VALUES (?, ?)
    // `).run;
    constructor(email: string, name: string, user_img: string) {
        db.query(`
        INSERT INTO user (email, name, user_img)
        VALUES (?, ?, ?)
        `).run(email, name, user_img)
        this.email = email
        this.name = name
        //@ts-ignore
        const id = db.query(`SELECT email, name, id FROM user WHERE email = '${email}'`).get().id
        this.id = id
    }
 }