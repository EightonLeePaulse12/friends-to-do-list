"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Todo } from "types/todo";
import { useSession } from "next-auth/react";
import { api } from "utils/api";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "~/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const page = () => {
  const session = useSession();
  const router = useRouter();
  //   const [todo, setTodo] = useState<Todo[]>([]);
  const [dueDate, setDueDate] = React.useState<
    Date | null | undefined | Todo["dueDate"]
  >(null);
  const [name, setName] = useState<Todo["name"]>("");
  //   const [userId, setUserId] = useState<String | undefined>(
  //     session.data?.user.id,
  //   );
  const [priority, setPriority] = useState<Todo["priority"]>("Null");
  const [selectedPriority, setSelectedPriority] = useState<Todo["priority"]>("Null");
  const dateTriggerRef = useRef<HTMLButtonElement>(null);

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPriority(e.target.value as Todo["priority"]);
  };

  const handleDateSelect = (day: Date | undefined) => {
    if(day) {
        setDueDate(day)
    }
    // setDueDate(date);
    dateTriggerRef.current?.click();
  };

  const handleCreate = async () => {
    const userId = session.data?.user.id;
    if (!userId) return;

    const makeToDo = await api.todos.makeToDo.mutate({
      name,
      dueDate: dueDate instanceof Date ? dueDate : new Date(),
      userId,
      priority,
    });

    console.log("RESULT: ", makeToDo);

    router.push("/");
    return makeToDo;
  };

  useEffect(() => {
    // console.log("Name: ", name)
    // console.log("Due Date: ", dueDate)
    console.log("Priority: ", priority);
    // console.log("User ID: ", session.data?.user.id ?? "No userId")
  }, [priority]);

  return (
    <>
      <div className="container h-screen p-[13rem]">
        <h1 className="text-center text-2xl font-bold">Add a Todo</h1>
        <div className="form">
          <Label>Name</Label>
          <Input onChange={(e) => setName(e.target.value)} />

          <div className="flex flex-col pb-5 pr-5 pt-2">
            <Label>Priority</Label>
            <Select
              name="type"
              onValueChange={(e) => setPriority(e as Todo["priority"])}
            >
              <SelectTrigger className="mt-1 w-[20%] rounded border p-2">
                <SelectValue placeholder="Priority" />
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
                  {dueDate ? (
                    format(dueDate ?? new Date(), "PPP")
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
          <Button variant={"outline"} onClick={handleCreate}>
            Create
          </Button>
        </div>
      </div>
    </>
  );
};

export default page;
