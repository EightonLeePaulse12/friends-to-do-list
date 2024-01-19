'use client';

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
const page = () => {

  const [todos, setToDo] = useState();
  useEffect(()=>{

    try {
      const fetchData = async () =>{
        const res = await axios.get("/api/getToDos")
        const todo = res.data
        console.log(res.data)
        setToDo(todo)
      }

      fetchData()
    } catch (error) {
      console.log(error)
    }
    
    
  }, [])

  return (
    <>
    <p>{ todos }</p>
    <div className="text-red-400">page</div>
    </>
  )
}

export default page