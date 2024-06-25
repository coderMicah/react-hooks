import { useState, useOptimistic } from "react";

export interface ITodo {
  id: string;
  title: string;
}

function App() {
  const [todos, setTodos] = useState<ITodo[]>([
    { id: "1", title: "Learn Optmistic Updates" },
  ]);

  const [optimisticTodos, setOptimisticTodos] = useOptimistic(todos);

  const createTodo = async (title: string): Promise<ITodo> => {
    //code to create todo (mimic the server)
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTodo: ITodo = {
          id: crypto.randomUUID(),
          title: `${title} - server`,
        };
        resolve(newTodo);
      }, 3000);
    });
  };

  const formAction = async (formData: FormData) => {
    const title = formData.get("todo") as string;

    //handle optimistic updates (state b4 handling real state)
    const optimisticTodo = { id: crypto.randomUUID(), title: `${title} - optimistic` };
    setOptimisticTodos((prev) => [...prev, optimisticTodo]);


    //handle state logic
    const newTodo = await createTodo(title);
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  return (
    <>
      <h1>Todos</h1>
      <div>
        <form action={formAction}>
          <input type="text" name="todo" placeholder="Add todo.." />
          <button type="submit">Add</button>
        </form>
        <ul>
          {/* display optimistictodos */}
          {optimisticTodos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
