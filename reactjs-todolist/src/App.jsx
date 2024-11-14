import React, { useState } from "react";
import ToDoInput from "./components/ToDoInput";
import ToDoList from "./components/ToDoList";

function App() {
  const [todos, setTodos] = useState([]); // Stan przechowujący listę zadań
  const [todoValue, setToDoValue] = useState(""); // Stan przechowujący wartość aktualnie wprowadzanego lub edytowanego zadania

  // Funkcja dodająca nowe zadanie do listy
  function handleAddTodos(newTodo) {
    const newToDoList = [...todos, newTodo];
    setTodos(newToDoList);
  }

  // Funkcja usuwająca zadanie z listy na podstawie indeksu
  function handleDeleteTodo(index) {
    const newToDoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index;
    });
    setTodos(newToDoList);
  }

  // Funkcja edytująca zadanie
  function handleEditTodo(index) {
    const valueToBeEdited = todos[index]; // Pobieramy wartość zadania do edycji
    setToDoValue(valueToBeEdited); // Ustawiamy ją w stanie `todoValue`, aby wyświetlić w polu input
    handleDeleteTodo(index); // Usuwamy oryginalne zadanie z listy
  }

  return (
    <>
      <ToDoInput
        todoValue={todoValue}
        setToDoValue={setToDoValue}
        handleAddTodos={handleAddTodos}
      />
      <ToDoList
        handleDeleteTodo={handleDeleteTodo}
        handleEditTodo={handleEditTodo}
        todos={todos}
      />
    </>
  );
}

export default App;
