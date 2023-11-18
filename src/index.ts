//@ts-nocheck
import { cors } from '@elysiajs/cors'
import { html } from '@elysiajs/html'
import { Elysia } from "elysia";
import { db } from "./factories/db";
import { User } from './entities/User'
import { userUseCase } from './usecases/UserUseCase'
import { postUseCase } from './usecases/PostUseCase'
import { Post, PostCreateProps } from "./entities/Post";
import { staticPlugin } from '@elysiajs/static'
const app = new Elysia()
.use(html())
.use(cors())
.use(staticPlugin({ assets: 'static',prefix: '/static' }))
.use(staticPlugin({ assets: 'public', prefix: '/' }))
//@ts-expect-error
.post('/user', ({ body }) => userUseCase.login({...body}))
.get('/user', () => userUseCase.getAll())
.get('/user/:id', ({ params: { id } }) => userUseCase.findById(id))
.post('/post', ({ body }: { body: PostCreateProps }) => {
    return postUseCase.create(body)
})
.get('/post/', () => postUseCase.getAll())
// .get('/test', () => postUseCase.)
.get('/post/:id', ({ params: { id } }) => postUseCase.getAllByUserId(id))
.get('/', () => Bun.file(process.cwd()+'/public/index.html'))
.get('/feed', () => Bun.file(process.cwd()+'/public/index.html'))
// .get('*', async () => Bun.file('/public/index.html'))
.listen(3000, (s) => console.log('🚀 SERVER RUNNING AT PORT', s.port));