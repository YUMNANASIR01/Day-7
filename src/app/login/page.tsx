// src\app\login\page.tsx
"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signIn } from "@/services/auth"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setError("")
  }, [])

  const validateForm = () => {
    if (!username || !password) {
      setError("Please fill in all fields")
      return false
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      const result = await signIn(username, password)
      if (result.success) {
        router.push("/admin")
      } else {
        setError(result.message || "An error occurred during login")
      }
    } catch (err) {
      setError("An error occurred during login")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isSignUp ? "Create an Account" : "Sign in to your account"}
          </h2>
        </div>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">{error}</div>}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                aria-label="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                aria-label="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            {!isSignUp && (
              <div className="text-sm font-medium text-blue-600 hover:text-blue-500" >
                  Forgot your password?
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isSignUp ? "Sign up" : "Sign in"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}




























































// // src\app\login\page.tsx
// "use client"
// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { signIn } from "@/services/auth"

// export default function LoginPage() {
//   const [username, setUsername] = useState("")
//   const [password, setPassword] = useState("")
//   const [error, setError] = useState("")
//   const [isSignUp, setIsSignUp] = useState(false)
//   const router = useRouter()

//   useEffect(() => {
//     setError("")
//   }, [])

//   const validateForm = () => {
//     if (!username || !password) {
//       setError("Please fill in all fields")
//       return false
//     }

//     if (password.length < 6) {
//       setError("Password must be at least 6 characters")
//       return false
//     }

//     return true
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!validateForm()) return

//     try {
//       const result = await signIn(username, password)
//       if (result.success) {
//         router.push("/admin")
//       } else {
//         setError(result.message || "An error occurred during login")
//       }
//     } catch (err) {
//       setError("An error occurred during login")
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             {isSignUp ? "Create an Account" : "Sign in to your account"}
//           </h2>
//         </div>

//         {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">{error}</div>}

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm space-y-4">
//             <div>
//               <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//                 Username
//               </label>
//               <input
//                 id="username"
//                 name="username"
//                 type="text"
//                 autoComplete="username"
//                 aria-label="Username"
//                 required
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 sm:text-sm"
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="current-password"
//                 aria-label="Password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 sm:text-sm"
//               />
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             {!isSignUp && (
//               <div className="text-sm font-medium text-blue-600 hover:text-blue-500" >
//                   Forgot your password?
//               </div>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             {isSignUp ? "Sign up" : "Sign in"}
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-600">
//             {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
//             <button
//               type="button"
//               onClick={() => setIsSignUp(!isSignUp)}
//               className="font-medium text-blue-600 hover:text-blue-500"
//             >
//               {isSignUp ? "Sign in" : "Sign up"}
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }