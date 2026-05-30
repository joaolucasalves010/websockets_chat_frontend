import { useParams } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import ErrorPage from "./ErrorPage"

import { SidebarProvider, SidebarTrigger } from "@workspace/ui/components/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

import type { User } from "@/types/User"
import useAuth from "@/hooks/useAuth"

import { api } from "@/services/api"
import SpinnerComponent from "@/components/SpinnerComponent"
import DefaultAvatar from "@/assets/user.png"
import { Avatar, AvatarImage } from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { MoreVertical } from "lucide-react"

const ChatPage = () => {
  const params = useParams()
  const [friends, setFriends] = useState<User[]>([])
  const [message, setMessage] = useState("")
  const { getUser, isLoading } = useAuth()
  const inputRef = useRef<HTMLInputElement>(null)

  const chatUser = friends.find((f) => String(f.id) === params.userId) ?? null

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await api.get("/friends", { withCredentials: true })
        if (res.status === 200) {
          setFriends(res.data)
        }
      } catch (err: any) {
        console.log(err)
      }
    }

    getUser()
    getFriends()
  }, [])

  const handleSend = () => {
    if (!message.trim()) return
    console.log("Enviando para", chatUser?.username, ":", message)
    setMessage("")
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend()
  }

  if (!Number(params.userId)) {
    return <ErrorPage />
  }

  if (isLoading) {
    return SpinnerComponent
  }

  return (
    <SidebarProvider style={{ height: "100vh", overflow: "hidden" }}>
      <AppSidebar friends={friends} />
      <main className="flex h-screen flex-1 flex-col overflow-hidden">
        <header className="flex shrink-0 items-center justify-between border-b border-zinc-200 bg-white px-5 py-3 shadow-sm">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="text-zinc-500 hover:text-zinc-800 md:hidden" />
            <Avatar className="size-10 md:ml-12 md:size-12">
              <AvatarImage
                src={
                  chatUser?.image_url
                    ? `http://localhost:8000/${chatUser.image_url}`
                    : DefaultAvatar
                }
              />
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-zinc-800">
                {chatUser?.username}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-xs text-zinc-500">
                  +{chatUser?.phone}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 text-zinc-500">
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer hover:text-zinc-800"
            >
              <MoreVertical size={18} />
            </Button>
          </div>
        </header>

        {/* Área de mensagens */}
        <div className="flex-1 overflow-y-auto bg-zinc-50 px-6 py-4">
          {/* mensagens serão renderizadas aqui */}
        </div>
      </main>
    </SidebarProvider>
  )
}

export default ChatPage
