"use client"

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import {Home, User} from "lucide-react"
import { useNotification } from './Notification'



export default function Header(){
   const {data: session} = useSession();
   const {showNotification} = useNotification();

   const handleSignOut = async() =>{
    try {
        await signOut();
        showNotification("Signed out Successfully", "success");
        
    } catch (error) {
        showNotification("Failed to sign Out ", "error")
    }
   }

   return (
    <div className=''>

    </div>
   )


}
