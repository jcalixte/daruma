import { useEffect, useState } from "react"
import { supabase } from "./lib/supabase"
import { Auth } from "./components/Auth"
import { DarumaList } from "./components/DarumaList"
import { LogOut } from "lucide-react"
import { Session } from "@supabase/supabase-js"

function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return <Auth />
  }

  const handleSignOut = async () => supabase.auth.signOut()

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-indigo-600">
              Theodo Apps' Daruma Tracker
            </h1>
            {session.user ? (
              <p className="text-gray-500">{session.user.email}</p>
            ) : null}
            <button
              onClick={handleSignOut}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </header>
      <main className="py-10">
        <DarumaList />
      </main>
    </div>
  )
}

export default App
