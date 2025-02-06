
// src\services\userApi.ts
"use server"

import { client } from "@/sanity/lib/client";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function  clerkGetUser() {
    const {userId} = await  auth()
    const user = await  currentUser()
    

    const username = user?.firstName
    const email = user?.emailAddresses[0].emailAddress
    const userImage = user?.imageUrl

    return{
        username,
        email,
        userId,
        userImage
    }

}

export async function sanityUserPost(){

    const user =  await clerkGetUser()
    console.log("🚀 ~ sanityUserPost ~ user:", user)
    
    const userObject = {
        _type:"user",
        _id: `user-${user.userId}`,
        email:user.email,
        name:user.username,
        userId:user.userId,
        Image:user.userImage
    }
    
    const res = await client.createOrReplace(userObject)
}