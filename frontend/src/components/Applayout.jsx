import { Outlet } from "react-router-dom";
import Dashnav from "./Dashnav";
import axios from "axios";
import { useEffect, useState } from "react";

function AppLayout({handleLogout}) {
    const [user, setUser]= useState(null)
    useEffect (()=>{
        async function getUser () {
            const token= localStorage.getItem('userToken')
            const response = await axios.get("http://localhost:3000/users/me", {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setUser(response.data)
        }
        getUser()
    },[])

  return (
    <>
     <Dashnav handleLogout={handleLogout} user={user}/>
     <Outlet />
    </>
  )
}

export default AppLayout;
