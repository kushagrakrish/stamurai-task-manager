"use client";
import { useStore } from "@/store/context";
import { Task } from "@/store/store";
import {
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

const Form = () => {
  const { taskStore } = useStore();
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    status: "To Do",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = Task.create({
      id: Math.random().toString(),
      title: formValues.title,
      description: formValues.description,
      status: formValues.status,
    });

    taskStore.addTask(newTask);
  };

  return (
    <>
      <div className=''>
        <button
          className='border-0 py-2 px-10 rounded-md font-medium mx-auto  bg-teal-600 text-white mb-5 shadow-md'
          onClick={onOpen}
        >
          Add Task
        </button>
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent className='w-full flex items-center justify-center'>
            <form
              onSubmit={handleSubmit}
              className='w-full  p-10 shadow grid gap-10 max-w-sm mx-auto'
            >
              <input
                className='shadow-lg border py-2 rounded-sm px-3'
                name='title'
                type='text'
                placeholder='Title'
                value={formValues.title}
                onChange={handleChange}
              />
              <input
                className='shadow-lg border h-24 py-2 rounded-sm px-3'
                type='text'
                name='description'
                placeholder='Description'
                value={formValues.description}
                onChange={handleChange}
              />
              <select
                name='status'
                value={formValues.status}
                onChange={handleChange}
                className='p-2 rounded-sm shadow-lg bg-transparent'
              >
                <option value='To Do'>To Do</option>
                <option value='In Progress'>In Progress</option>
                <option value='Completed'>Completed</option>
              </select>
              <div className='grid gap-2'>
                <button
                  type='submit'
                  className='bg-teal-600 rounded-sm text-white py-2 hover:bg-teal-400 duration-200 transition-all ease-linear'
                >
                  Add Task
                </button>
                <button
                  onClick={onClose}
                  className=' rounded-sm text-red-700 py-2'
                >
                  Cancel
                </button>
              </div>
            </form>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default Form;
