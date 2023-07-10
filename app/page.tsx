"use client";

import Form from "@/components/Form";
import { ChakraProvider } from "@chakra-ui/react";
import TaskListing from "@/components/TaskListing";
import TaskStore from "@/store/store";
import { storeContext } from "@/store/context";
import { useLocalObservable } from "mobx-react-lite";

export default function Home() {
  const store = useLocalObservable(() => {
    const tasksFromLocalStorage =
      typeof window !== "undefined" ? localStorage.getItem("tasks") : null;
    const parsedTasks = tasksFromLocalStorage
      ? JSON.parse(tasksFromLocalStorage)
      : [];
    return {
      taskStore: TaskStore.create({
        tasks: parsedTasks,
      }),
    };
  });

  return (
    <>
      <storeContext.Provider value={store}>
        <ChakraProvider>
          <div className='bg-teal-50 h-screen'>
            <div className='max-w-[1280px]  mx-auto py-10 px-5 lg:px-10'>
              <h1 className='font-bold text-center text-3xl mb-10 uppercase text-teal-800'>
                Stamurai Task Manager
              </h1>
              <div>
                <Form />
                <TaskListing />
              </div>
            </div>
          </div>
        </ChakraProvider>
      </storeContext.Provider>
    </>
  );
}
