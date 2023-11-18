import useUser from '../utils/funcs/hooks/useUser.ts'
import { getFile } from '../utils/funcs/getFile'
import { Button, Input, Spinner, Textarea } from '@/components/ui/'
import { Post } from '../components/Post'
import { Dialog } from '../components/Dialog'
import { useLocalStorage } from '../utils/funcs/hooks/useLocalStorage'
import { FormProps, PostProps } from '../utils/types/posts.ts'
import useFetch from 'use-http'
import { IoIosAdd } from "react-icons/io";
import { useCallback, useEffect, useState } from 'react'
import { Label } from '@radix-ui/react-label'
import { URL } from '../utils/consts'
import { getLocalStorage } from '../utils/funcs/LS'
import { FaCheck } from "react-icons/fa";
function HandlersFeed({ setData }: { setData: any }) {
    const { email, id, isErrored, name } = useUser()
    const { data, response, loading, post } = useFetch(URL+'post')
    useEffect(() => {
      setForm({
        description: '',
        src: '',
        title: '',
        user_id: id || 0
      })
    }, [data])
    const [formState, setForm] = useState<FormProps>({
      description: '',
      src: '',
      title: '',
      user_id: id || 0
    })
    const handleForm = (key: keyof FormProps, value: any) => {
      const temp = {...formState}
      //@ts-ignore
      temp[key] = value
      setForm(temp)
    }
    const [allowed, setAllowed] = useLocalStorage('_UNREGISTERED_ALLOWED',false)
    //Todo - ver como fazer aqueles loadings de posts, e fazer o feed aqui. No pc grid 3 colunas e no mobile 1 só.
    return (
        <>
          {
            isErrored && 
            <Dialog 
            open={!allowed}
            actionLabel='Voltar a pagina de Login'
            cancelLabel='Continuar'
            handleAction={() => window.location.pathname = '/'}
            handleCancel={() => setAllowed(true)}
            title='Login recomendado!'
            >
              O login é necessário para criar postagens e interagir. Para uma experiência completa, recomendamos você criar ou entrar em sua conta!
            </Dialog>
          }
            <input accept='image/*' type='file' className=' hidden' id='inputAdd' onChange={({ target }) => {
              if (!target?.files) return
              getFile(target.files[0], (e) => {
                if (!e.target?.result) return
                handleForm('src',e.target?.result)
              })
              //@ts-ignore
              target.value = null
              }}/>
          <Button asChild className='cursor-pointer fixed z-10 bottom-2 h-16 w-16 bg-blue-500 rounded-full'>
            <label htmlFor='inputAdd'>
              <IoIosAdd size="32"/>
            </label>
          </Button>
              {formState.src && <Dialog
              title='Envie sua arte!'
              actionLabel={data ? <FaCheck /> : loading ? <Spinner /> : 'Enviar'}
              cancelLabel='Cancelar'
              handleAction={() => post({
                ...formState
              }).then(_res => {
                const { user_img, name } = getLocalStorage('_user')
                const newPost: PostProps = {
                  src: formState.src,
                  title: formState.title,
                  author: name,
                  authorImg: user_img,
                  description: formState.description,
                  date: new Date()
                }
                setData((prevState: PostProps[]) => [...prevState, newPost])
              }).catch(err => console.log(err))}
              handleCancel={() => handleForm('src', '')}
              open={true}
              >
                <div className=' flex flex-col gap-4'>
                  <img className='mt-2 max-h-[212px] mx-auto' src={formState.src} />
                  <Input value={formState.title} onChange={({ target }) => handleForm('title', target.value)}  placeholder='Título: Ilustração de...' id='title'/>
                  <Textarea value={formState.description} onChange={({ target }) => handleForm('description', target.value)}  placeholder='Descrição: Feita para...' />
                </div>
              </Dialog>}
        </>
    )
}

export function Feed({}: {}) {
  let { get, loading, error} = useFetch(URL+'post')
  const [data, setData] = useState<PostProps[] | null>(null)
  useEffect(() => {
    get().then(setData)
  }, [])
  console.log(data)
  return (
    <main>
      {/* @ts-ignore - My vscode is broken */}
      <HandlersFeed setData={setData}/>
      <div className=' w-screen flex flex-col-reverse gap-2 items-center'>
        {data ? (
          <>
          {data.map(i => <Post {...i} />)}
        </>
        ) : (
          <>
          {'a'}
        </>
        )}
      </div>
    </main>
  )
}
