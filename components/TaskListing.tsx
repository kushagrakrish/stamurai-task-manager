"use client";
import React, { useEffect } from "react";
import Tasks from "./Tasks";
import { useStore } from "@/store/context";
import { observer } from "mobx-react-lite";

export interface UpdatedTask {
  id: string;
  title: string;
  description: string;
  status: string;
  setTitle(title: string): void;
  setDescription(description: string): void;
  setStatus(status: string): void;
}

const TaskListing = observer(() => {
  const { taskStore } = useStore();

  useEffect(() => {
    taskStore.loadTasksFromLocalStorage(); // Load tasks from local storage on component mount
  }, [taskStore]);

  const handleEditTask = (taskId: string, updatedTask: any) => {
    taskStore.editTask(taskId, updatedTask as any);
  };

  const handleDeleteTask = (taskId: string) => {
    taskStore.deleteTask(taskId);
  };

  const renderTasksByStatus = (status: string) => {
    const tasks = taskStore.tasks.filter((task) => task.status === status);

    return (
      <div className='bg-[#b4b4b467] p-5 w-full rounded-lg'>
        <h2 className='mb-5 font-semibold'>{status}</h2>
        <div>
          {tasks.map((task) => (
            <Tasks
              key={task.id}
              task={task}
              onTaskEdit={handleEditTask}
              onTaskDelete={handleDeleteTask}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className='mb-10'>
      <h2 className='text-xl mt-10 border-b-4 border-teal-700 pb-2 mb-10 font-medium text-teal-700'>
        Lets Crush! These Tasks
      </h2>
      <div className='flex flex-col md:flex-row gap-10 justify-between w-full'>
        {renderTasksByStatus("To Do")}
        {renderTasksByStatus("In Progress")}
        {renderTasksByStatus("Completed")}
      </div>
    </div>
  );
});

export default TaskListing;
