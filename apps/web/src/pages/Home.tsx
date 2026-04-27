import { useContext, useEffect, useState } from "react"
import { api } from "@/services/api"

import type { User } from "../types/User"
import { SidebarProvider } from "@workspace/ui/components/sidebar"

import { AppSidebar } from "@/components/app-sidebar"
import { MessageCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import useFetch from "@/hooks/useFetch"
import { UserContext } from "@/contexts/UserContext"


const Home = () => {
  const [friends, setFriends] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const getUser = useFetch()

  useEffect(() => {
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
      <SidebarProvider>
        <AppSidebar friends={friends}/>
        <main className="flex justify-center items-center min-h-screen flex-1 flex-col">
          <div className="bg-zinc-200 h-30 w-30 rounded-full flex items-center justify-center mb-5 relative">
            <div className="bg-green-400 h-4 w-4 rounded-full animate-ping absolute top-4 right-2"/>
            <div className="bg-green-400 h-4 w-4 rounded-full absolute top-4 right-2"/>
            <MessageCircle size={60} className="text-green-400"/>
          </div>
            <p className="text-2xl font-semibold">Suas Mensagens</p>
            <p className="text-center mt-4 text-px text-zinc-400">Selecione uma conversa à esquerda para começar a trocar mensagens. <br />Tudo organizado e em um só lugar.</p>
        </main>
      </SidebarProvider>
    </>
  )
}

export default Home