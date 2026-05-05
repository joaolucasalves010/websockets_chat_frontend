import { Spinner } from "@workspace/ui/components/spinner"

const SpinnerComponent = () => {
  return (
    <main className="flex min-h-screen justify-center items-center flex-col">
      <Spinner className="size-8"/>
      <p>Carregando...</p>
    </main>
  )
}

export default SpinnerComponent