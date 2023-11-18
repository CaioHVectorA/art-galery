import { User } from "../entities/User";
import { db } from "../factories/db";

class UserUseCase {
    findById(id: string) {
        //@ts-ignore
        if (isNaN(id)) return "Não enviou um índice numérico?"
        return db.query(`SELECT * FROM user WHERE id = ${parseInt(id)}`).get() || "Usuário não encontrado!"
    }
    getAll() {
        return db.query(`SELECT * FROM user`).all()
    }
    login({ email, name, user_img }: { email: string, name: string, user_img: string }) {
        if (!email || !name) return "Credenciais incorretas!"
        const userExists = db.query(`SELECT email, name, id FROM user WHERE email = '${email}'`).get() || null as User | null
        if (userExists) return userExists
        const newUser = new User(email, name, user_img)
        return newUser
        }
}

export const userUseCase = new UserUseCase()