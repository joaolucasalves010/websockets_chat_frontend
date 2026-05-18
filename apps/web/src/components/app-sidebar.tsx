import { Input } from "@workspace/ui/components/input"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarSeparator
} from "@workspace/ui/components/sidebar"

import { LogOut, MessageCircle, Search, Settings} from "lucide-react"
import { api } from "@/services/api"

import { Avatar, AvatarImage, AvatarBadge } from "@workspace/ui/components/avatar"

import type { User } from "@/types/User"
import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@workspace/ui/components/button"

import AddFriendModal from "./AddFriendModal"
import FriendRequestsModal from "./FriendRequestsModal"
import { UserContext } from "@/contexts/UserContext"


type Props = {
  friends: User[]
}

export function AppSidebar({friends}: Props) {

  const logout = async() => {
    try {
      await api.get("/logout", {withCredentials: true})
      window.location.reload()
    } catch (err: any) {
      console.log(err)
    }
  }

  useEffect(() => {
    console.log(friends)
  }, [friends])

  const { user } = useContext(UserContext)!

  return (
    <Sidebar className="p-2 bg-zinc-50">
      <SidebarHeader>
        <div className="flex justify-between">
          <h1 className="text-lg font-semibold">Mensagens</h1>
          <div className="flex gap-3 text-zinc-500 items-center">
            <FriendRequestsModal />
            <AddFriendModal />
            <Link to={"/edit-user"}>
              <Settings className="hover:scale-110 duration-300 hover:text-black"/>
            </Link>
          </div>
        </div>
        <div className="relative mb-5 mt-4">
          <Search size={20} className="absolute top-2 left-2 text-zinc-600"/>
          <Input className="rounded-xl border border-zinc-400 pl-8" placeholder="Buscar conversa..." disabled={friends.length == 0}/>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarSeparator />
        <SidebarGroup>
          <h2 className="text-sm uppercase text-zinc-500 font-bold flex gap-1 items-center"><MessageCircle size={20}/>Conversas</h2>
        </SidebarGroup>
        <SidebarGroup>
          {/* <div className="bg-zinc-100 p-2 rounded-sm flex items-center gap-2 border border-zinc-300">
            <Avatar className="size-12">
              <AvatarImage src="https://github.com/joaolucasalves010.png"/>
            </Avatar>
            <div className="flex flex-col p-2">
              <h1 className="text-lg font-semibold tracking-wide">João Lucas</h1>
              <p className="text-xs">Iniciar conversa</p>
            </div>
          </div> */}
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <div className="flex justify-between">
          <div>
            <Avatar className="size-10 flex gap-1 items-center">
              <AvatarImage src={`http://localhost:8000/${user?.image_url}`}/>
              <AvatarBadge className="bg-green-600 dark:bg-green-800" />
              <div className="flex flex-col">
                <p className="text-[14px] font-bold">{user?.username}</p>
                <div className="flex items-center gap-1">
                  <div className="bg-green-500 h-1 w-1 p-1 rounded-full"/>
                  <p className="text-[12px] text-zinc-500">Disponível</p>
                </div>
              </div>
            </Avatar>
            <div>

            </div>
          </div>
          <Button className="w-10 cursor-pointer duration-300 hover:scale-110 bg-zinc-200 hover:text-red-500/80 hover:bg-red-500/10" onClick={() => logout()} variant="link" >  
            <LogOut />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}