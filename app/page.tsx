"use client";

import Form from "@/components/Form";
import TaskListing from "@/components/TaskListing";
import { storeContext } from "@/store/context";
import TaskStore from "@/store/store";
import { ChakraProvider } from "@chakra-ui/react";
import { useLocalObservable } from "mobx-react-lite";
import { useEffect } from "react";

export default function Home() {
  const store = useLocalObservable(() => {
    return {
      taskStore: TaskStore.create({
        tasks: [],
      }),
    };
  });

  useEffect(() => {
    const tasksFromLocalStorage = localStorage.getItem("tasks");
    const parsedTasks = tasksFromLocalStorage
      ? JSON.parse(tasksFromLocalStorage)
      : [];
    store.taskStore.loadTasksFromLocalStorage();
  }, [store.taskStore]);

  return (
    <>
      <storeContext.Provider value={store}>
        <ChakraProvider>
          <div className='bg-teal-50 h-screen'>
            <div className='max-w-[1300px]  mx-auto py-10 px-5 lg:px-10'>
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
