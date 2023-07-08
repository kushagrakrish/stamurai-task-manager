import React from "react";

export interface UpdatedTask {
  id: string;
  title: string;
  description: string;
  status: string;
  setTitle(title: string): void;
  setDescription(description: string): void;
  setStatus(status: string): void;
}

const TaskListing = () => {
  return (
    <div className='mb-10'>
      <h2 className='text-xl mt-10 border-b-4 border-teal-700 pb-2 mb-10 font-medium text-teal-700'>
        Lets Crush! These Tasks
      </h2>
    </div>
  );
};

export default TaskListing;
