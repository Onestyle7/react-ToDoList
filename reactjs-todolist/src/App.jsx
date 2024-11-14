import React, { useEffect, useState } from "react";
import ToDoInput from "./components/ToDoInput";
import ToDoList from "./components/ToDoList";

function App() {
  const [todos, setTodos] = useState([]); // Stan przechowujący listę zadań
  const [todoValue, setToDoValue] = useState(""); // Stan przechowujący wartość aktualnie wprowadzanego lub edytowanego zadania

  function persistData(newList) {
    if (Array.isArray(newList)) {
      localStorage.setItem("todos", JSON.stringify({ todos: newList }));
    } else {
      console.error("Próba zapisania danych, które nie są tablicą:", newList);
    }
  }

  // Funkcja dodająca nowe zadanie do listy
  function handleAddTodos(newTodo) {
    const newToDoList = [...todos, newTodo];
    setTodos(newToDoList);
    persistData(newToDoList);
  }

  // Funkcja usuwająca zadanie z listy na podstawie indeksu
  function handleDeleteTodo(index) {
    const newToDoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index;
    });
    setTodos(newToDoList);
    persistData(newToDoList);
  }

  // Funkcja edytująca zadanie
  function handleEditTodo(index) {
    const valueToBeEdited = todos[index]; // Pobieramy wartość zadania do edycji
    setToDoValue(valueToBeEdited); // Ustawiamy ją w stanie `todoValue`, aby wyświetlić w polu input
    handleDeleteTodo(index); // Usuwamy oryginalne zadanie z listy
  }

  useEffect(() => {
    let localTodos = localStorage.getItem("todos");
    if (localTodos) {
      try {
        const parsedData = JSON.parse(localTodos);
        if (Array.isArray(parsedData.todos)) {
          setTodos(parsedData.todos);
        } else {
          console.error("parsedData.todos nie jest tablicą:", parsedData.todos);
          setTodos([]);
        }
      } catch (error) {
        console.error("Błąd podczas parsowania danych z localStorage:", error);
        setTodos([]);
      }
    }
  }, []);

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
