import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"


export default NextAuth({
  // Configure one or more authentication providers
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],

  session: {
    jwt: true
  },

  //Database setup
  database: process.env.DATABASE_URL,
  secret: process.env.SECRET,
  // callbacks: {
  //   session: async (session, user) => {
  //     session.userId = user.sub
  //     return Promise.resolve(session)
  //   }
  // }
  
})