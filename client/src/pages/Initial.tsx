// @ts-nocheck
import { getLocalStorage, setLocalStorage } from '../utils/funcs/LS'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useEffect } from 'react'
import { GoogleLogin } from 'react-google-login'
import { useNavigate } from 'react-router'
import { URL } from '../utils/consts'
export function Initial({}: {}) {
  const nav = useNavigate()
  if (!google) return <>Carregando...</>
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "690849227868-bfjbcprepqgu7od9ih3q59cjdvd8p7dl.apps.googleusercontent.com",
      callback: (response) => {
        const data = jwtDecode(response.credential)
        console.log(data)
        axios.post(URL+'user', {
            email: data.email,
            user_img: data.picture,
            name: data.name
        }).then(res => {
            setLocalStorage('_user',{...res.data, user_img: data.picture})
            nav('/feed')
        })
    }
    })
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "ouline",size: "large" }
      )
  }, [])
    return (
        <>
        <div id='signInDiv' className=' button'></div>
        </>
    )
}