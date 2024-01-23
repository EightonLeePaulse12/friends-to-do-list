'use client';

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Swal from 'sweetalert2'
import '@/app/globals.css'

interface editToDoProps {
    toDoId: number
}

const update: React.FC<editToDoProps> = ({ toDoId }) => {
    const router = useRouter()
    const { id } = router.query

    const [name, setName] = useState('')
    const [priority, setPriority] = useState('')
    const [isCompleted, setIsCompleted] = useState<boolean>(false)
    const [dueDate, setDueDate] = useState('')

    const handleCompleted = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value === "True"
        setIsCompleted(val)
    }
    const handleDueDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDueDate(e.target.value)
    }


    useEffect(() => {
        const fetchToDo = async () => {
            try {
                const res = await axios.get(`/api/getSingleToDo?id=${id}`)
                if (id) {
                    const toDoDetails = res.data.todo
                    setName(toDoDetails.name)
                    setPriority(toDoDetails.priority)
                    setIsCompleted(toDoDetails.isCompleted)
                    setDueDate(toDoDetails.dueDate)
                }
                console.log(res.data)
            } catch (e) {
                console.log(e)
                alert("Something went wrong while setting data")
            }
        }

        fetchToDo()
    }, [toDoId, router])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const upd = await axios.patch('/api/editToDo', {
                id: id,
                name,
                priority,
                dueDate,
                isCompleted
            })

            if (upd.data.message === "Record updated successfully") {
                await Swal.fire({
                    title: "Item was updated successfully",
                    text: "You have successfully updated this item",
                    icon: "success"
                })
                // router.push('/')
            } else {
                await Swal.fire({
                    title: "Error",
                    text: "Something went wrong, please try again",
                    icon: "error"
                })
            }
        } catch (e) {
            console.log(e)
            Swal.fire({
                title: "Something went wrong",
                text: "Something went wrong",
                icon: "error"
            })
        }
    }

    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-2-1 font-bold mb-4">Update Todo</h1>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-black-600">Name</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 p-2 border rounded border-black w-full" />
                    </div>
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
                    <div>
                        <label>
                            Completed:
                            <select name="isCompleted" value={isCompleted ? 'True' : 'False'} onChange={handleCompleted}>
                                <option value="True">True</option>
                                <option value="False">False</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Due Date:
                            <input type="date" name="dueDate" value={dueDate} onChange={handleDueDate} placeholder="Due Date" />
                        </label>
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default update