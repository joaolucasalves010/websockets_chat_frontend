import Footer from "@/components/Footer"
import SignInComponent from "@/components/SignInComponent"

const SignIn = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="bg-zinc-100 flex flex-1 justify-center items-center px-4 py-8">
        <section className="bg-white rounded-lg w-full max-w-md shadow-sm">
          <SignInComponent />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default SignIn