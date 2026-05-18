import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@workspace/ui/components/dialog"
import { Field, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { UserPlus, UserIcon, Phone } from "lucide-react"

import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { api } from "@/services/api"

import { toast } from "sonner"

const AddFriendModal = () => {
  const formSchema = z.object({
    phone: z
      .string()
      .min(9, "O telefone deve ter no mínimo 9 caracteres")
      .max(11, "O telefone deve ter no máximo 11 caracteres"),
  })

  type formData = z.infer<typeof formSchema>

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<formData>({ resolver: zodResolver(formSchema) })

  const onSubmit = async (data: formData) => {
    try {
      const res = await api.post(
        `/add_friend/${data.phone}`,
        {},
        { withCredentials: true }
      )
      if (res.status == 200) {
        toast.success("Pedido de amizade enviado com sucesso.")
      }
    } catch (err: any) {
      console.log("Erro inesperado: " + err)
      toast.warning("Não foi possível enviar esse pedido de amizade")
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger className="flex">
          <UserPlus className="cursor-pointer duration-300 hover:scale-110 hover:text-black" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="text-center">
            <div className="flex items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-400 p-2">
                <UserIcon size={50} className="text-white" />
              </div>
            </div>
            <DialogTitle className="text-lg font-semibold tracking-wide">
              Adicionar amigo
            </DialogTitle>
            <DialogDescription>
              Você pode adicionar uma pessoa como amigo utilizando o número de
              telefone dele.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Field className="flex flex-col">
              <FieldLabel className="relative">
                <Phone className="absolute left-4 text-zinc-500" />
                <Input
                  placeholder="Número de telefone"
                  className="rounded-lg py-5 pl-12"
                  maxLength={11}
                  {...register("phone", {
                    onChange: (e) => {
                      const cleaned_value = e.target.value
                        .toLowerCase()
                        .replace(/[^0-9]/g, "")
                      setValue("phone", cleaned_value)
                    },
                  })}
                />
              </FieldLabel>
              <span className="text-red-500">{errors.phone?.message}</span>
              <Button
                className="cursor-pointer rounded-lg p-4 duration-300 hover:scale-105"
                type="submit"
              >
                Enviar Pedido
              </Button>
            </Field>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddFriendModal
