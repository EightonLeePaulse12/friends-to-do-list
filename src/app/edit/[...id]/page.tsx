"use client";

import React, { useState, useEffect, useRef } from "react";
import { Todo } from "types/todo";
import { api } from "utils/api";
import { usePathname } from "next/navigation";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "~/components/ui/calendar";
import { useRouter } from "next/navigation";

const edit = () => {
    const router = useRouter()
  const pathname = usePathname();
  const id = pathname.substring(pathname.lastIndexOf("/") + 1);

  const [dueDate, setDueDate] = React.useState<
    Date | null | undefined | Todo["dueDate"]
  >(null);
  const [name, setName] = useState<Todo["name"]>("");
  const [priority, setPriority] = useState<Todo["priority"]>("Null");
  const [selectedPriority, setSelectedPriority] =
    useState<Todo["priority"]>("Null");

//   const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchToDos = async () => {
      try {
        const todos = await api.todos.fetchSingleToDo.query({
          id: Number(id),
        });

        console.log(todos);
        // setTodos([todos] as Todo[]);
        setName(todos?.name as unknown as Todo["name"])
        setPriority(todos?.priority as unknown as Todo["priority"])
        setDueDate(todos?.dueDate as unknown as Todo["dueDate"])
        // console.log(dueDate)
      } catch (error) {
        console.error("Error fetching todos:", { error: error });
        // setError("An error occured")
        return [];
      }
    };

    fetchToDos();
  }, []);

  const dateTriggerRef = useRef<HTMLButtonElement>(null);

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPriority(e.target.value as Todo["priority"]);
  };

  const handleDateSelect = (day: Date | undefined) => {
    if (day) {
      setDueDate(day);
    }
    // setDueDate(date);
    if(dueDate instanceof Date) {
        dateTriggerRef.current?.click();

    }
  };

  const update = async () => {
    const utc = dueDate instanceof Date ? new Date(dueDate.toISOString()) : new Date()
    let updatedFields: Partial<Todo> = {
        id: Number(id),
        name,
        dueDate: utc
    }
    if(priority !== "Null") {
        updatedFields.priority = priority
    }
    const edit = await api.todos.editToDo.mutate(updatedFields as Todo);

    console.log(edit)
    router.push('/')
    return edit 
  };

  return (
    // .input(
    //     z.object({
    //       id: z.number(),
    //       name: z.string(),
    //       priority: z.enum(["Null", "Low", "Neutral", "High", "Critical"]),
    //       dueDate: z.date().nullish(),
    //     }),
    //   )
    //   .mutation(async ({ ctx, input }) => {
    //     const edit = await ctx.db.todos.update({
    //       data: {
    //         name: input.name,
    //         priority: input.priority,
    //         dueDate: input.dueDate,
    //       },
    //       where: {
    //         id: input.id,
    //       },
    //     });
    <>
      <div className="container h-screen p-[13rem]">
        <h1 className="text-center text-2xl font-bold">Add a Todo</h1>
        <div className="form">
          <Label>Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} className="!pb-2"/>

          <div className="flex flex-col pb-1 pr-5 pt-2">
            <Label>Priority</Label>
            <Select
              name="type"
              onValueChange={(e) => setPriority(e as Todo["priority"])}
            >
              <SelectTrigger className="mt-1 w-[20%] rounded border p-2">
                <SelectValue placeholder={priority} />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem value={priority} /> */}
                <SelectItem value="Null">Null</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Neutral">Neutral</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col pb-5 pr-5 pt-5">
            <Label className="pb-1">Due Date</Label>
            <Popover>
              <PopoverTrigger
                asChild
                className="mt-1 w-[20%] rounded border p-2"
              >
                <Button ref={dateTriggerRef} variant={"outline"}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate != null ? (
                    format(new Date(dueDate) ?? new Date(), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dueDate ?? new Date()}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button variant={"outline"} onClick={update}>
            Update
          </Button>
        </div>
      </div>
    </>
  );
};

export default edit;
