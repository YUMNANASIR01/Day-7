// src\app\products\page.tsx
"use client"


import { sanityUserPost } from '@/services/userApi'
import React, { useEffect } from 'react'

function Products () {
  
 useEffect(() => {
  const fetchUser = async () => {
    await sanityUserPost()
  }
  fetchUser()
 }, [])  

  return (
    <>
      <div>This is product page</div>
    </>
  )
}

export default Products 
