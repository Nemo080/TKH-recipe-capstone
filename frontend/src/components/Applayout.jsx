import { Outlet } from 'react-router-dom'
import Dashnav from './Dashnav'
import axios from 'axios'
import {useEffect} from 'react'

function AppLayout({handleLogout}) {
    useEffect (()=>{
        async function getUser () {
            const token= localStorage.getItem('userToken')
            const user = await axios.get("http://localhost:3000/users/me", {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log(user)
        }
        getUser()
    },[])

  return (
    <>
     <Dashnav handleLogout={handleLogout}/>
     <Outlet />
    </>
  )
}

export default AppLayout