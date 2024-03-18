"use client";

import { useEffect, useState } from "react";
import { Progress } from "~/components/ui/progress";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";

import { useSession, signOut } from "next-auth/react";
import { api } from "utils/api";
import { useRouter } from "next/navigation";
import { Todo } from "types/todo";
import { Button } from "./ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

const page = () => {
  const session = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  const refetchTodos = async () => {
    try {
      const todoss = await api.todos.fetchToDos.query();
      setTodos(todoss as Todo[]);
    } catch (e) {
      console.error("Error: ", e);
    }
  };

  useEffect(() => {
    const fetchToDos = async () => {
      try {
        const todoss = await api.todos.fetchToDos.query();
        console.log(todos);
        setTodos(todoss as Todo[]);
      } catch (error) {
        console.error("Error fetching todos:", { error: error });
        setError("An error occured");
        return [];
      }
    };
    console.log(todos);
    fetchToDos();
  }, [refetchTodos]);

  const deleteTodo = async (id: number) => {
    try {
      await api.todos.deleteToDo.mutate({
        id: id,
      });
      await refetchTodos();
    } catch (e) {
      console.error("Error: ", e);
    }
  };

  const handleDeleteTodo = (id: number) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      deleteTodo(id).catch((error) => {
        console.error("Error: ", error);
      });
    };
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <h1 className="p-8 text-center text-[48px] font-bold">To-do List</h1>
        </div>
        <div className="flex w-[100%] justify-between">
          <Button
            onClick={async () =>
              await signOut({ redirect: true, callbackUrl: "/login" })
            }
          >
            Log out
          </Button>
          <Link href="/create">
            <Button variant={"outline"}>Create</Button>
          </Link>
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
              {todos ? (
                todos.map((e, idx) => (
                  <>
                    <TableRow key={e.id}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{e.name}</TableCell>
                      <TableCell>
                        {e.createdAt?.toISOString().substring(10, 0)}
                      </TableCell>
                      <TableCell>
                        {e.dueDate?.toISOString().substring(10, 0)}
                      </TableCell>
                      <TableCell>{e.priority}</TableCell>
                      <TableCell>
                        <Button variant={"outline"}>Sub notes</Button>
                      </TableCell>
                      <TableCell>
                        <Link href={`/edit/${e.id}`}>
                          <Button
                            variant={"outline"}
                            className="mr-1 text-right"
                          >
                            <Pencil />
                          </Button>
                        </Link>
                        <AlertDialog>
                          <AlertDialogTrigger className="text-right ">
                            <Button variant={"outline"}>
                              <Trash2 />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you sure you want to delete this item?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action can not be undone. Clicking
                                "confirm" will delete this item.
                              </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={handleDeleteTodo(e.id)}
                              >
                                Confirm
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  </>
                ))
              ) : (
                <TableRow>
                  <TableCell>Nothing to see here</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default page;
