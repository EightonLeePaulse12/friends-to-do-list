'use client';

import React, { useEffect, useState } from 'react'
// import { Progress } from '~/components/ui/progress';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { useSession } from 'next-auth/react'
import { todoRouter } from '~/server/api/routers/todo'


const page = () => {
  useSession({ required: true })
  // const session = useSession();
  console.log()
  const [todos, setToDos] = useState<string[]>([])

  useEffect(() => {
    const fetchTodos = async () => {
      // try{
      //   const { data, error } = await todoRouter.fetchToDos({
          
      //   })
      //   if(error) {
      //     console.log("Error: ", error)
      //   } else{
      //     setToDos(data)
      //     console.log(todos)
      //   }
      // } catch(e) {

      // }
    }
  }, [])
  return (
    <>

      {/* model Todos {
    id       Int        @id @default(autoincrement())
    userId   String
    user     User       @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: Cascade)
    name     String
    priority Priority
    subnotes Subnotes[]
    dueDate  DateTime?
    createdAt DateTime @default(now())

    @@index([userId])
} */}
      <div className="container">
        <div className="header">
          <h1 className='text-center p-8 font-bold text-[48px]'>To-do List</h1>
        </div>
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

