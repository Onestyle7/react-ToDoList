import React from "react";
import ToDoCard from "./ToDoCard";

export default function ToDoList(props) {
  const { handleDeleteTodo, todos, handleEditTodo } = props;
  return (
    <ul className="main">
      {todos.map((todo, todoIndex) => (
        <ToDoCard
          {...props}
          key={todoIndex}
          index={todoIndex}
          handleDeleteTodo={handleDeleteTodo}
          handleEditTodo={handleEditTodo}
        >
          <p>{todo}</p>
        </ToDoCard>
      ))}
    </ul>
  );
}
