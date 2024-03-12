"use client";

import { useEffect, useState } from 'react'
import { Progress } from '~/components/ui/progress';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"
import { useSession, signOut } from 'next-auth/react';
import { api } from 'utils/api';
import { useRouter } from 'next/navigation';
import { Todo } from 'types/todo';
import { Button } from './ui/button';


const page = () => {
    const session = useSession()
    const router = useRouter  ()
    const [error, setError] = useState<string | null>(null);
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const fetchToDos = async () => {
            try {
                const todos = await api.todos.fetchSingleToDo.query({
                    id: Number(1)
                });
                
                console.log(todos)
                // setTodos(todos as Todo[])
            } catch (error) {
                console.error("Error fetching todos:", {error: error});
                setError("An error occured")
                return [];
            }
        };
        console.log(todos)
        fetchToDos() 
    }, [])


    return (
        <>
            <div className="container">
                <div className="header">
                    <h1 className='text-center p-8 font-bold text-[48px]'>To-do List</h1>
                </div>
                <Button onClick={async () => await signOut({ redirect: true }) && void router.push('/api/auth/signin')}>
                    Log out
                </Button>
                <div className="">
                    <Table>
                        <TableCaption>Manage Your Day!</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Sub Notes</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead>Priority</TableHead>
                                <TableHead>Edit</TableHead>
                                <TableHead>Delete</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    Yo
                                </TableCell>
                                <TableCell>
                                    Yo
                                </TableCell>
                                <TableCell>
                                    Yo
                                </TableCell>
                                <TableCell>
                                    Yo
                                </TableCell>
                                <TableCell>
                                    Yo
                                </TableCell>
                                <TableCell>
                                    Yo
                                </TableCell>
                                <TableCell>
                                    Yo
                                </TableCell>
                                <TableCell>
                                    Yo
                                </TableCell>
                                <TableCell>
                                    Yo
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default page

