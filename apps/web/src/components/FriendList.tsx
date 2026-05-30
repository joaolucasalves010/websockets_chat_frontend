import { Avatar, AvatarImage } from "@workspace/ui/components/avatar"
import type { User } from "@/types/User"
import DefaultAvatar from "../assets/user.png"

type FriendListProps = {
  friends: User[]
}

const FriendList = ({ friends }: FriendListProps) => {

  return (
    <>
      {friends.map((friend, index) => (
        <a key={index} className="flex gap-2 items-center w-full bg-zinc-100 p-2 border-b-2 rounded-lg cursor-pointer" href={`http://localhost:5173/chat/${friend.id}`}>
          {friend.image_url ? (
            <Avatar className="size-12">
              <AvatarImage src={`http://localhost:8000/${friend.image_url}`} />
            </Avatar>
          ) : (
            <Avatar className="size-12">
              <AvatarImage src={DefaultAvatar} />
            </Avatar>
          )}
          <div className="flex flex-col">
            <p className="text-sm font-semibold">{friend.username}</p>
            <p className="text-zinc-600 text-xs font-semibold">+{friend.phone}</p>
          </div>
        </a>
      ))}
    </>
  )
}

export default FriendList
