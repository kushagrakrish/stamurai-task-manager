import React from "react";
import { UpdatedTask } from "./TaskListing";

interface TasksProps {
  task: any;
  onTaskEdit: (
    taskId: string,
    updatedTask: UpdatedTask & {
      setTitle(title: string): void;
      setDescription(description: string): void;
      setStatus(status: string): void;
    }
  ) => void;
  onTaskDelete: (taskId: string) => void;
}

const Tasks = ({ task, onTaskEdit, onTaskDelete }: TasksProps) => {
  return (
    <>
      <div className='bg-white shadow-md p-5 rounded-lg mb-6'>
        <></>
        <h3 className='text-xl font-semibold'>{task.title}</h3>
        <p className='text-gray-500'>{task.description}</p>
        <div className='flex gap-2 mt-10'>
          <div>
            <button
              className='border-0 bg-[#64a7fe] p-1 px-3 rounded-full text-sm text-white font-semibold'
              //   onClick={handleEdit}
            >
              Edit
            </button>
          </div>
          <div>
            <button
              className='border-0 bg-[#8C64FE] p-1 px-3 rounded-full text-sm text-white font-semibold'
              //   onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tasks;
