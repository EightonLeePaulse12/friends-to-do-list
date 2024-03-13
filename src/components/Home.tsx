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
import { Pencil, Trash2 } from 'lucide-react'


const page = () => {
    const session = useSession()
    const router = useRouter()
    const [error, setError] = useState<string | null>(null);
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const fetchToDos = async () => {
            try {
                const todos = await api.todos.fetchSingleToDo.query({
                    id: Number(1)
                });

                console.log(todos)
                setTodos([todos] as Todo[])
            } catch (error) {
                console.error("Error fetching todos:", { error: error });
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
                <div className="w-[100%] flex justify-between">
                    <Button onClick={async () => await signOut({ redirect: true, callbackUrl: "/api/auth/signin" })}>
                        Log out
                    </Button>
                    <Button variant={"outline"}>
                        Create
                    </Button>
                </div>

                <div className="">
                    <Table>
                        <TableCaption>Manage Your Day!</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Due Date</TableHead>
                                {/* <TableHead>Due Date</TableHead> */}
                                <TableHead>Priority</TableHead>
                                <TableHead>Sub Notes</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                {todos ? (todos.map((e) => (
                                    <>
                                        <TableCell>
                                            {e.id}
                                        </TableCell>
                                        <TableCell>
                                            {e.name}
                                        </TableCell>
                                        <TableCell>
                                            {e.createdAt?.toISOString().substring(10, 0)}

                                        </TableCell>
                                        <TableCell>
                                            {e.dueDate?.toISOString().substring(10, 0)}
                                        </TableCell>
                                        <TableCell>
                                            {e.priority}
                                        </TableCell>
                                        <TableCell>
                                            <Button variant={'outline'}>
                                                Sub notes
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant={"outline"} className='text-right mr-1'><Pencil /></Button>
                                            <Button variant={"outline"} className='text-right '><Trash2 /></Button>
                                        </TableCell>
                                    </>
                                    // <TableCell>
                                    //     Yo
                                    // </TableCell>
                                    // <TableCell>
                                    //     Yo
                                    // </TableCell>
                                    // <TableCell>
                                    //     Yo
                                    // </TableCell>
                                ))) : (
                                    <TableCell>Nothing to see here</TableCell>
                                )}
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default page

