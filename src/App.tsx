import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type TodolistType = {
	id: string
	title: string
}

function App() {
	let todolistID1 = v1();
	let todolistID2 = v1();

	let [todolists, setTodolists] = useState<TodolistType[]>([
		{id: todolistID1, title: 'What to learn'},
		{id: todolistID2, title: 'What to buy'},
	])

	let [tasks, setTasks] = useState({
		[todolistID1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
		],
		[todolistID2]: [
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQL', isDone: false },
		],
	})

	const removeTask = (todolistId: string, taskId: string) => {
		setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})

		// const newTodolistTasks = {
		// 	...tasks,
		// 	[todolistId]: tasks[todolistId].filter(t => t.id !== taskId)
		// }
		// setTasks(newTodolistTasks)

		// const todolistTasks = tasks[todolistId]
		// const newTodolistTasks = todolistTasks.filter(f => f.id !== taskId)
		// tasks[todolistId] = newTodolistTasks
		// setTasks({...tasks, newTodolistTasks})
	}

	const addTask = (todolistId: string, title: string) => {
		const newTask = {
			id: v1(),
			title:title,
			isDone: false
		}
		setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})

	}

	const changeTaskStatus = (todolistId: string, taskId: string, taskStatus: boolean) => {
		setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: taskStatus} : t)})

		// const newState = tasks.map(t => t.id == taskId ? {...t, isDone: taskStatus} : t)
		// setTasks(newState)
	}

	return (
		<div className="App">
			{
				todolists.map(el => {
					return (
						<Todolist
							key={el.id}
							todolistId={el.id}
							title={el.title}
							tasks={tasks[el.id]}
							removeTask={removeTask}
							addTask={addTask}
							changeTaskStatus={changeTaskStatus}
						/>
					)
				})
			}
		</div>
	);
}

export default App;