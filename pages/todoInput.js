// import Head from "next/head";
// import { useSession, getSession } from "next-auth/react";
// import React, {useState} from 'react'
// import axios from 'axios'



// export default function Project() {
//   const { data: session, status } = useSession();
//   const [todo, setTodo] = useState('')

//   const handleSubmit = (e)=>{
//       e.preventDefault()
//       try {
//         const res = await axios.post('/api/todo', { todo })
//         toast.success(res.data.msg)
//         setTodo('')
//       } catch (err) {
//         toast.error(err.response.data.msg)
//       }
//   }
//   if (status === "loading") {
//     return <p>Loading...</p>;
//   }

//   if (status === "unauthenticated") {
//     return <p>Access Denied</p>;
//   }

//   return (
//     <>
//       <Head>
//         <title>Job Description</title>
//       </Head>
//       <h1>TODO APP</h1>
//       <form onSubmit={handleSubmit}>
// <input type='text' value={todo}
// onChange={e=> setTodo(e.target.value)}
// />

// <button type='submit'>Create</button>
//       </form>
//         Signed in as {session.user.name} <br />
//         <button onClick={() => signOut()}>Sign out</button>
        
//     </>
//   );
// }


