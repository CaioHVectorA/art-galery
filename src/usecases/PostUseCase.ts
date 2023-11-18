import { Post, PostCreateProps } from '../entities/Post'
import { db } from '../factories/db'
class PostUseCase {
    findById(id: string) {
        //@ts-ignore
        if (isNaN(id)) return "Não enviou um índice numérico?"
        return db.query(`SELECT * FROM posts WHERE id = ${parseInt(id)}`).get() || "Post não encontrado!"
    }
    getAllByUserId(id: string) {
        //@ts-ignore
        if (isNaN(id)) return "Não enviou um índice numérico?"
        return db.query(`SELECT * FROM posts WHERE user_id = ${parseInt(id)}`).all()
    }
    getAll() {
        return (db.query(`
        SELECT
            posts.id AS post_id,
            posts.title,
            posts.description,
            posts.src,
            user.name AS author,
            user.user_img AS authorImg,
            posts.created_at AS date
        FROM
            posts
        JOIN
            user ON posts.user_id = user.id;
        `).all())
    }
    create({title, description, src, user_id}: PostCreateProps) {
        const post = new Post(title, description, src, user_id)
        return "POST CRIADO!";
    }
}

export const postUseCase = new PostUseCase()