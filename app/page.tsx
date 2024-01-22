'use client';

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Link from 'next/link';


interface Todo {
  id: number;
  name: string;
  dueDate: string;
  isCompleted: boolean;
  priority: "One" | "Two" | "Three" | "Four" | "Five";
}

const page: React.FC = () => {

  const [todos, setToDo] = useState<Todo[]>([]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get("/api/getToDos")
        const list = res.data.todos
        console.log(res.data)
        setToDo(list)
        console.log("type: ", list)
      }

      fetchData()
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <>
      <div className="add-btn w-full h-12 flex justify-center items-center p-2">
        <Link href="/add">
          <button type="button" className="flex">Add Item <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99805H13V10.998H19V12.998Z" fill="#699BF7" />
          </svg></span></button>
        </Link>
      </div>
      <div className="w-full h-screen flex justify-center items-center">
        <table className="text-left">
          <thead>
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Due Date</th>
              <th className="p-3">Completed</th>
              <th className="p-3">Priority</th>
              <th className="p-3">Edit</th>
              <th className="p-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td className="p-3">{todo.name}</td>
                <td className="p-3">{todo.dueDate.substring(0, 10)}</td>
                <td className="p-3">{todo.isCompleted ? (<p>Yes</p>) : (<p>No</p>)}</td>
                <td className="p-3">{todo.priority === "One" ? (<p>1</p>) : todo.priority === "Two" ? (<p>2</p>) : todo.priority === "Three" ? (<p>3</p>) : todo.priority === "Four" ? (<p>4</p>) : todo.priority === "Five" ? (<p>5</p>) : null}</td>
                <td className="p-3">
                  <button type="button" className="">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.30372 1.72004L8.72437 2.2994L3.39893 7.62421C3.03832 7.98544 2.8577 8.16606 2.70271 8.36481C2.51966 8.59934 2.3627 8.85312 2.2346 9.12165C2.12648 9.34915 2.04586 9.59164 1.88461 10.0754L1.20089 12.1259L1.03339 12.6272C0.994217 12.744 0.988404 12.8694 1.01661 12.9894C1.04482 13.1094 1.10592 13.2191 1.19306 13.3062C1.2802 13.3933 1.38991 13.4545 1.50987 13.4827C1.62983 13.5109 1.75528 13.5051 1.87211 13.4659L2.37335 13.2984L4.4239 12.6147C4.90826 12.4534 5.15012 12.3728 5.37761 12.2647C5.64635 12.1365 5.90009 11.9797 6.13446 11.7966C6.3332 11.6416 6.51382 11.4609 6.87443 11.1003L12.1999 5.7749L12.7792 5.19554C13.2401 4.73466 13.499 4.10958 13.499 3.45779C13.499 2.80601 13.2401 2.18092 12.7792 1.72004C12.3183 1.25916 11.6933 1.00024 11.0415 1.00024C10.3897 1.00024 9.7646 1.25916 9.30372 1.72004Z" stroke="#699BF7" stroke-width="1.5" />
                      <path opacity="0.5" d="M8.72441 2.29883C8.72441 2.29883 8.79691 3.53003 9.88312 4.61624C10.9693 5.70246 12.1999 5.77433 12.1999 5.77433M2.37339 13.2984L1.20093 12.126" stroke="#699BF7" stroke-width="1.5" />
                    </svg>

                  </button>
                </td>
                <td className="p-3 flex justify-center items-center">
                  <button className="">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.0672 15.1829C16.1252 15.241 16.1713 15.3099 16.2027 15.3858C16.2342 15.4617 16.2503 15.543 16.2503 15.6251C16.2503 15.7072 16.2342 15.7885 16.2027 15.8644C16.1713 15.9403 16.1252 16.0092 16.0672 16.0673C16.0091 16.1254 15.9402 16.1714 15.8643 16.2028C15.7884 16.2343 15.7071 16.2505 15.625 16.2505C15.5429 16.2505 15.4615 16.2343 15.3857 16.2028C15.3098 16.1714 15.2409 16.1254 15.1828 16.0673L9.99998 10.8837L4.81717 16.0673C4.69989 16.1846 4.54083 16.2505 4.37498 16.2505C4.20913 16.2505 4.05007 16.1846 3.93279 16.0673C3.81552 15.95 3.74963 15.791 3.74963 15.6251C3.74963 15.4593 3.81552 15.3002 3.93279 15.1829L9.11639 10.0001L3.93279 4.81729C3.81552 4.70002 3.74963 4.54096 3.74963 4.3751C3.74963 4.20925 3.81552 4.05019 3.93279 3.93292C4.05007 3.81564 4.20913 3.74976 4.37498 3.74976C4.54083 3.74976 4.69989 3.81564 4.81717 3.93292L9.99998 9.11651L15.1828 3.93292C15.3001 3.81564 15.4591 3.74976 15.625 3.74976C15.7908 3.74976 15.9499 3.81564 16.0672 3.93292C16.1844 4.05019 16.2503 4.20925 16.2503 4.3751C16.2503 4.54096 16.1844 4.70002 16.0672 4.81729L10.8836 10.0001L16.0672 15.1829Z" fill="#B10000" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default page