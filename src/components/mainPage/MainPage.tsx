import { useMachine } from "@xstate/react";
import React, { useCallback } from "react";
import Dropzone from "../dropzone/Dropzone";
import { todosMachine } from "../todos/todosMachine";
import TodosTable from "../todosTable/TodosTable";

const MainPage = () => {
  return (
    <>
      <Dropzone />
      {/* <TodosTable todos={current.context.todos} /> */}
    </>
  );
};

export default MainPage;
