import mongoose from "mongoose";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    const session = await getServerSession(authOptions);
    // console.log({session, data})
    const email = session.user.email;


    if ('name' in data) {
        await User.updateOne({ email }, { name: data.name });

    }
    return Response.json(true);
}