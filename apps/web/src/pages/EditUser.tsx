import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import UserAvatar from "../assets/user.png"

import { Field, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "@/contexts/UserContext"
import useAuth from "@/hooks/useAuth"
import { Button } from "@workspace/ui/components/button"
import { Home, Trash, Upload } from "lucide-react"

import { Link } from "react-router-dom"

import { api } from "@/services/api"
import SpinnerComponent from "@/components/SpinnerComponent"

const EditUser = () => {
  const [imagePreview, setImagePreview] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const { user } = useContext(UserContext)!
  const { getUser, isLoading } = useAuth()

  useEffect(() => {
    getUser()
  }, [])

  const formSchema = z
    .object({
      image: z
        .file()
        .max(5 * 1024 * 1024, "Arquivo deve ter no máximo 5MB")
        .mime(["image/jpeg", "image/png"], "Formato não permitido")
        .optional(),
      username: z
        .string()
        .transform((val) => (val === "" ? undefined : val))
        .pipe(
          z
            .string()
            .min(8, "O nome de usuário deve ter no mínimo 8 caracteres.")
            .max(20)
            .optional()
            .or(z.literal(""))
        ),
      phone: z
        .string()
        .transform((val) => (val === "" ? undefined : val))
        .pipe(
          z
            .string()
            .min(9, "O telefone deve ter no mínimo 9 caracteres")
            .max(11, "O telefone deve ter no máximo 11 caracteres")
            .optional()
            .or(z.literal(""))
        ),
      newPassword: z
        .string()
        .transform((val) => (val === "" ? undefined : val))
        .pipe(
          z
            .string()
            .min(6, "A senha deve conter no mínimo 6 caracteres")
            .max(72, "A senha deve ter no máximo 72 caracters")
            .optional()
            .or(z.literal(""))
        ),
      confirmNewPassword: z
        .string()
        .transform((val) => (val === "" ? undefined : val))
        .pipe(
          z
            .string()
            .min(6, "A senha deve conter no mínimo 6 caracteres")
            .max(72, "A senha deve ter no máximo 72 caracters")
            .optional()
            .or(z.literal(""))
        ),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: "As senhas não coincidem",
      path: ["confirmPassword"],
    })

  type formData = z.infer<typeof formSchema>

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(formSchema) })

  const onSubmit = async (data: formData) => {
    try {
      if (data.image) {
        const formData = new FormData()
        formData.append("image", data.image)
        await api.post("/users/avatar", formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
      }

      const payload: Record<string, any> = {}
      if (data.username) payload.username = data.username
      if (data.phone) payload.phone = data.phone
      if (data.newPassword) payload.password = data.newPassword

      if (Object.keys(payload).length > 0) {
        await api.patch("/users/", payload, { withCredentials: true })
      }

      window.location.reload()
    } catch (err: any) {
      console.log("Erro ao salvar alterações: " + err)
      console.log(err.response?.data?.detail)
    }
  }

  const deleteUserImage = async () => {
    try {
      const res = await api.delete("/users/avatar", { withCredentials: true })

      if (res.status == 200) {
        window.location.reload()
      }
    } catch (err: any) {
      console.log("Não foi possivel deletar sua imagem. " + err)
    }
  }

  if (isLoading) return <SpinnerComponent />

  return (
    <main className="flex min-h-screen items-center justify-center p-2 bg-zinc-200">
      <div className="relative flex w-full max-w-lg flex-col items-center justify-center rounded-lg shadow-lg bg-zinc-100">
        <Link
          to="/"
          className="absolute top-4 left-4 cursor-pointer rounded-full p-2 duration-300 hover:scale-110 text-zinc-500 hover:text-black"
        >
          <Home />
        </Link>
        <div className="p-4">
          {user?.image_url && !imagePreview && (
            <div className="relative">
              <img
                src={`http://localhost:8000/${user.image_url}`}
                className="h-30 w-30 rounded-full border border-zinc-400"
              />
              <Button
                className="absolute top-20 right-3 cursor-pointer rounded-full border p-2 font-bold text-white hover:bg-red-500 hover:scale-110 duration-300"
                onClick={deleteUserImage}
              >
                <Trash />
              </Button>
            </div>
          )}
          {!user?.image_url && !imagePreview && (
            <img src={UserAvatar} className="h-30 w-30 rounded-full" />
          )}
          {imagePreview && (
            <img src={imageUrl} className="h-30 w-30 rounded-full" />
          )}
          <h1 className="my-2">{user?.username}</h1>
        </div>
        <div>
          <form
            className="flex flex-col items-center justify-center p-4 md:w-sm lg:w-sm"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Field className="mb-4">
              <span className="text-sm font-medium">Selecionar imagem</span>
              <FieldLabel className="cursor-pointer rounded-lg bg-zinc-100 p-2 text-zinc-500">
                <Upload />
                Escolher arquivo
                <Input
                  className="hidden"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    console.log(file)
                    if (file) {
                      setValue("image", file, { shouldValidate: true })
                      setImagePreview(true)
                      setImageUrl(URL.createObjectURL(file))
                    }
                  }}
                />
              </FieldLabel>
              <span className="mb-2 flex gap-2 text-center text-sm font-semibold text-red-500">
                {errors.image?.message}
              </span>
            </Field>
            <Field className="mb-4">
              <FieldLabel>Telefone</FieldLabel>
              <Input
                {...register("phone")}
                placeholder={user?.phone}
                className="rounded-lg"
              />
            </Field>
            <Field className="mb-4">
              <FieldLabel>Nome de usuário</FieldLabel>
              <Input
                {...register("username")}
                placeholder={user?.username}
                className="rounded-lg"
              />
            </Field>
            <Field className="mb-4">
              <FieldLabel>Nova senha</FieldLabel>
              <Input
                type="password"
                placeholder="******"
                className="rounded-lg"
                {...register("newPassword")}
              />
            </Field>
            <Field className="mb-4">
              <FieldLabel>Confirmar nova senha</FieldLabel>
              <Input
                type="password"
                placeholder="******"
                className="rounded-lg"
                {...register("confirmNewPassword")}
              />
            </Field>
            <Button className="my-5 w-full rounded-lg cursor-pointer">
              Salvar alterações
            </Button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default EditUser