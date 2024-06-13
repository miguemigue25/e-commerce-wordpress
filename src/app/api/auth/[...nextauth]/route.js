import { User } from "@/models/User";
import * as mongoose from "mongoose";
import bcrypt from "bcrypt";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        mongoose.connect(process.env.MONGO_URL);
        const user = await User.findOne({email})
        const passwordOK = user && bcrypt.compareSync(password, user.password);

        if (passwordOK) {
          return user;
        }

        return null
      }
    })
  ],
});

export { handler as GET, handler as POST }