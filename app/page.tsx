"use client";
import Form from "@/components/Form";
import { ChakraProvider } from "@chakra-ui/react";

export default function Home() {
  return (
    <ChakraProvider>
      <div className='max-w-[1280px] mx-auto my-10 px-5 lg:px-10'>
        <h1 className='font-bold text-center text-3xl mb-10 uppercase text-teal-800'>
          Stamurai Task Manager
        </h1>
        <div>
          <Form />
        </div>
      </div>
    </ChakraProvider>
  );
}
