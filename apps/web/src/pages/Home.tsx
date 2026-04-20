import { useEffect, useState } from "react"
import { api } from "@/services/api"

import type { User } from "../types/User"
import { SidebarProvider } from "@workspace/ui/components/sidebar"

import { AppSidebar } from "@/components/app-sidebar"


const Home = () => {

  const [user, setUser] = useState<User>()
  const [friends, setFriends] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoading(true)
        const res = await api.get("/users/me", {withCredentials: true})

        if (res.status == 200) {
          setUser(res.data)
        }

      } catch (err: any) {
        console.log(err)
      }
    }

    const getFriends = async() => {
      try {
        const res = await api.get("/friends", {withCredentials: true})
      
        if (res.status == 200) {
          setFriends(res.data)
        }

      } catch (err: any) {
        console.log(err)
      }
    }

    getUser()
    getFriends()
  }, [])

  return (
    <>
      <header></header>
      <SidebarProvider>
        <AppSidebar friends={friends}/>
        <main>
          
        </main>
      </SidebarProvider>
    </>
  )
}

export default Home