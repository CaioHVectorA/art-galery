import React from 'react'
import { PostProps } from '../utils/types/posts'
import { URL } from '../utils/consts'
import { CiHeart } from 'react-icons/ci'
import { Avatar, AvatarImage, AvatarFallback, Button } from '@/components/ui/'

export function Post({ author, authorImg, date, description, src, title }: PostProps) {
    console.log({ author, authorImg, date, description, src, title })
    const isBase64 = src.startsWith('data')
    console.log(src)
    return (
        <div>
        <div className='flex py-2 px-2 w-[328px] bg-zinc-800 text-white rounded-t-md gap-2 items-center'>
            <Avatar className="w-8 h-8">
                <AvatarImage src={authorImg}/>
                <AvatarFallback>{author[0]}</AvatarFallback>
            </Avatar>
            <p className=" font-bold text-sm">{author}</p>
        </div>
        <img src={!isBase64 ? URL+src : src} className='h-[328px] w-[328px] aspect-square object-cover'/>
        <div className="w-full bg-zinc-800 w-[328px] text-white rounded-b-md gap-2 py-1 px-3 ____pr-16">
            <h3 className="text-start">{title}</h3>
            <p className="text-start mt-2 text-sm opacity-70">{description}</p>
            {/* <Button className="absolute right-2 top-2">
                <CiHeart size="24" />
            </Button> */}
        </div>
        </div>
    )
}