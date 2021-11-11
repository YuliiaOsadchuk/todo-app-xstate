import React, { useState } from "react";
import { useMachine } from "@xstate/react";
import { useDropzone } from "react-dropzone";
import { todosMachine } from "../todos/todosMachine";
import TodosTable from "../todosTable/TodosTable";
import { ITodo } from "../../interfaces";
import { Button, Flex, Text } from "./Dropzone.styles";

const Dropzone: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [todosState, send] = useMachine(todosMachine, {
    actions: {
      loadData: (context, event) => {
        send({
          type: "RESOLVE",
          todos: todos,
        });
      },
    },
  });

  const onDrop = (acceptedFiles: any[]) => {
    send({ type: "LOAD" });
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => {
        send({ type: "REJECT", errorMessage: "file reading was aborted" });
      };
      reader.onerror = () => {
        send({ type: "REJECT", errorMessage: "file reading has failed" });
      };
      reader.onload = () => {
        const result = JSON.parse(reader.result as string);
        setTodos(result);
      };
      reader.readAsText(file);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <Flex>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <Text>Drop the files here ...</Text>
          ) : (
            <Text>Drag 'n' drop some files here, or click to select files</Text>
          )}
        </div>
      </Flex>
      <Button
        onClick={() => {
          send({
            type: "LOAD",
            message: "Todos have been successfully loaded",
          });
        }}
      >
        add todos
      </Button>
      <TodosTable todos={todosState.context.todos || []} />
      <Text>{todosState.context.message}</Text>
      <Text>{todosState.context.errorMessage}</Text>
    </>
  );
};

export default Dropzone;
