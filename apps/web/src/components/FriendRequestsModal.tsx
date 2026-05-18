import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog"

import { Check, Inbox, X } from "lucide-react"
import { api } from "@/services/api"

import { useEffect, useState } from "react"
import DefaultAvatar from "../assets/user.png"

import { Spinner } from "@workspace/ui/components/spinner"
import type { User } from "@/types/User"
import { Button } from "@workspace/ui/components/button"

const FriendRequestsModal = () => {
  const [friendRequests, setFriendRequests] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getFriendRequests = async () => {
      try {
        const res = await api.get("/friendship_requests", {
          withCredentials: true,
        })
        if (res.status == 200) {
          setFriendRequests(res.data)
          console.log(res.data, "aaa")
        }
      } catch (err: any) {
        console.log("Não foi possível exibir os pedidos de amizade, " + err)
      } finally {
        setIsLoading(false)
      }
    }

    getFriendRequests()
  }, [])

  const declineFriendship = async (id: number) => {
    try {
      const res = await api.post(`/decline_friendship/${id}`, {}, {withCredentials: true})

      if (res.status == 200) {
        window.location.reload()
      }
    } catch (err: any) {
      console.log(err)
    }
  }

  const acceptFriendhsip = async (id: number) => {
    try {
      const res = await api.post(`/accept_friendship/${id}`, {}, {withCredentials: true })

      if (res.status == 200) {
        window.location.reload()
      }

    } catch (err: any) {
      console.log(err)
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger className="flex">
          <Inbox className="cursor-pointer duration-300 hover:scale-110 hover:text-black" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-lg tracking-wider">
              Pedidos de amizade
            </DialogTitle>
          </DialogHeader>
          {isLoading && (
            <div className="flex flex-col items-center justify-center">
              <Spinner />
              <p>Carregando...</p>
            </div>
          )}
          {friendRequests.length == 0 && (
            <div className="flex flex-col justify-center items-center p-2">
              <div className="my-4 bg-zinc-500 p-4 rounded-full text-white">
                <Inbox size={40}/>
              </div>
              <p className="text-center text-zinc-600">Você não tem nenhum pedido de amizade pendente.</p>
            </div>
          )}
          {friendRequests.map((userRequest, index) => (
            <div key={index} className="flex justify-between items-center border-b-2 bg-zinc-200 p-2 rounded-xl">
              <div className="flex items-center gap-2">
                {userRequest.image_url ? (
                  <img src={`http://localhost:8000/${userRequest.image_url}`} className="size-14 rounded-full" />
                ) : (
                  <img src={DefaultAvatar} className="size-14" />
                )}
                <div className="flex flex-col">
                  <p className="font-bold tracking-wide">{userRequest.username}</p>
                  <p className="text-[13px]">{userRequest.phone}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="cursor-pointer" onClick={() => declineFriendship(userRequest.id)}>
                  <X className="text-red-400"/>
                </Button>
                <Button variant="outline" className="cursor-pointer" onClick={() => acceptFriendhsip(userRequest.id)}>
                  <Check className="text-green-400" />
                </Button>
              </div>
            </div>
          ))}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default FriendRequestsModal
