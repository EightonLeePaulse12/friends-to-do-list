'use client';

import React, { useState, useEffect } from 'react'
import { Todo } from 'types/todo';
import { api } from 'utils/api';

const edit = () => {

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
                // setError("An error occured")
                return [];
            }
        };
        console.log(todos)
        fetchToDos()
    }, [])
  return (
    <div>edit</div>
  )
}

export default edit
