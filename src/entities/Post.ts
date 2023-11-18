import path from "path";
import { db } from "../factories/db";
import { writeFileSync } from "fs";
import {v4 as uuidv4} from 'uuid'
export class Post {
    title: string;
    description: string;
    src: string;
    user_id: number;
    constructor(title: string, description: string, src: string, user_id: number) {
        const regex = /data:image\/(jpeg|jpg|png|gif|bmp|ico);base64,/g
        const cleaned = src.replace(regex,'')
        console.log(cleaned)
        const folder = path.join(process.cwd()+'/static/')
        const uuid = uuidv4()
        writeFileSync(folder+uuid+'.png', Buffer.from(cleaned, 'base64'))
        db.query(`
        INSERT INTO posts (title, description, src, user_id)
        VALUES (?, ?, ?, ?)
        `).run(title, description, 'static/'+uuid+'.png', user_id)
        this.description = description
        this.src = 'static/'+uuid
        this.title = title
        this.user_id = user_id      
    }
}

export type PostCreateProps = { title: string, description: string, src: string, user_id: number }