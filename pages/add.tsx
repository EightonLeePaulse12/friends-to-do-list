import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

const add: React.FC = () => {

  const [name, setName] = useState('')
  const [priority, setPriority] = useState('')
  const [isCompleted, setIsCompleted] = useState<boolean>(false)
  const [dueDate, setDueDate] = useState('')
  const router = useRouter()

  const handleCompleted = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value === "True"
    setIsCompleted(val)
  }
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }
  // const handlePriority = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setPriority(e.target.value)
  // }
  const handleDueDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value)
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Form submitted: ", { name, priority, isCompleted, dueDate })

    try {
      const add = await axios.post('/api/addToDo', {
        name,
        dueDate,
        priority,
        isCompleted
      })

      if (add.data.message === "To-do was added successfully") {
        await Swal.fire({
          title: "Added successfully",
          text: "You have successfully added an item",
          icon: "success"
        })
        // router.push('/')
      } else {
        await Swal.fire({
          title: "Something went wrong",
          text: "Your item could not be added",
          icon: "error"
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={name} onChange={handleName} placeholder="Name" />
        </label>
        <br />
        <label>
          Priority:
          <select name="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="One">One</option>
            <option value="Two">Two</option>
            <option value="Three">Three</option>
            <option value="Four">Four</option>
            <option value="Five">Five</option>
          </select>
        </label>
        <br />
        <label>
          Is Completed:
          <select name="isCompleted" value={isCompleted ? 'True' : 'False'} onChange={handleCompleted}>
            <option value="True">True</option>
            <option value="False">False</option>
          </select>
        </label>
        <br />
        <label>
          Due Date:
          <input type="date" name="dueDate" value={dueDate} onChange={handleDueDate} placeholder="Due Date" />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default add