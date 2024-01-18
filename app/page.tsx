import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
const page = () => {

  useEffect(()=>{
    const fetchData = async () =>{
      const res = await axios.get("/api/getToDos")
      console.log(res.data)
      
    }
  }, [])

  return (
    <>
    <p>{  }</p>
    <div className="text-red-400">page</div>
    </>
  )
}

export default page