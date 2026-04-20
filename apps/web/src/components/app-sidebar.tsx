import { Input } from "@workspace/ui/components/input"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@workspace/ui/components/sidebar"
import { Badge, MessageCircle, Search, Settings, Users} from "lucide-react"

import { Avatar, AvatarImage } from "@workspace/ui/components/avatar"

import type { User } from "@/types/User"
import { useEffect } from "react"


type Props = {
  friends: User[]
}

export function AppSidebar({friends}: Props) {

  useEffect(() => {
    console.log(friends)
  }, [friends])

  return (
    <Sidebar>
      <SidebarHeader className="p-2">
        <div className="flex justify-between">
          <h1 className="text-lg font-semibold">Mensagens</h1>
          <div className="flex gap-2 text-zinc-500">
            <Users />
            <Settings />
          </div>
        </div>
        <div className="relative mb-5 mt-4">
          <Search size={20} className="absolute top-2 left-2 text-zinc-600"/>
          <Input className="rounded-xl border border-zinc-400 pl-8" placeholder="Buscar conversa..." />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <h2 className="text-sm uppercase text-zinc-500 font-bold flex gap-1 items-center"><MessageCircle size={20}/>Conversas</h2>
        </SidebarGroup>
        <SidebarGroup>
          <div className="bg-zinc-100 p-2 rounded-sm flex items-center gap-2 border border-zinc-300 shadow-lg">
            <Avatar className="size-12">
              <AvatarImage src="https://github.com/joaolucasalves010.png"/>
            </Avatar>
            <div className="flex flex-col p-2">
              <h1 className="text-lg font-semibold tracking-wide">João Lucas</h1>
              <p className="text-xs">Iniciar conversa</p>
            </div>
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        
      </SidebarFooter>
    </Sidebar>
  )
}