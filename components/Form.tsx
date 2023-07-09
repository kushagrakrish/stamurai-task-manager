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
  // const [formValues, setFormValues] = useState({
  //   title: "",
  //   description: "",
  //   status: "To Do",
  // });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState("To Do"); // Set the default value to 'To Do'
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const handleChange = (e: any) => {
  //   const { name, value } = e.target;
  //   setFormValues({
  //     ...formValues,
  //     [name]: value,
  //   });
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = Task.create({
      id: Math.random().toString(),
      title,
      description,
      status,
    });
    taskStore.addTask(newTask);
    onClose();
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
              className='mb-10 p-10 shadow grid gap-10 max-w-sm mx-auto'
            >
              <input
                className=' border border-teal-500 focus:outline-none focus:teal-800 focus:ring-1  py-2 rounded-sm px-3'
                type='text'
                placeholder='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                className=' border focus:outline-none focus:teal-800 focus:ring-1 border-teal-500 h-24 py-2 rounded-sm px-3'
                type='text'
                placeholder='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className='p-2 border border-teal-500 rounded-sm focus:outline-none focus:teal-800 focus:ring-1  bg-transparent'
              >
                <option value='To Do'>To Do</option>
                <option value='In Progress'>In Progress</option>
                <option value='Completed'>Completed</option>
              </select>
              <div className='grid gap-2'>
                <button
                  type='submit'
                  className='bg-teal-700 rounded-md font-semibold text-white py-2 hover:bg-teal-900 duration-200 transition-all ease-linear'
                >
                  Add Task
                </button>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className=' py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-800 duration-200 transition-all ease-linear'
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
