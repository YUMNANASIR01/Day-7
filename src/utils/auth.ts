// export async function signIn(username: string, password: string) {
//     try {
//       const response = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });
  
//       if (!response.ok) {
//         throw new Error("Invalid credentials");
//       }
  
//       const data = await response.json();
//       return { success: true, user: data.user };
//     } catch (error) {
//       return { success: false, message: (error as Error).message };
//     }
//   }
  

// export async function signIn(username: string, password: string) {
//     try {
//       const response = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });
  
//       if (!response.ok) {
//         throw new Error("Invalid credentials");
//       }
  
//       const data = await response.json();
//       return { success: true, user: data.user }; // Ensure user role is included
//     } catch (error) {
//       return { success: false, message: (error as Error).message };
//     }
//   }
  


































