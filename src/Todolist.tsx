import {TaskType} from "./App";
import {ChangeEvent, useState} from "react";
import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type PropsType = {
	todolistId: string
	title: string
	tasks: TaskType[]
	removeTask: (todolistId: string, taskId: string) => void
	addTask: (todolistId: string, title: string) => void
	changeTaskStatus: (todolistId: string, taskId: string, taskStatus: boolean) => void
	removeTodolist: (todolistId: string) => void
	updateTask: (todolistId: string, taskId: string, title: string) => void
	updateTodolist: (todolistId: string, title: string) => void
}

type FilterValuesType = 'all' | 'active' | 'completed'

export const Todolist = ({title, tasks, removeTask, addTask, changeTaskStatus, todolistId, removeTodolist, updateTask, updateTodolist}: PropsType) => {

	const [filter, setFilter] = useState<FilterValuesType>('all')

	let tasksForTodolist = tasks
	if (filter === 'active') {
		tasksForTodolist = tasks.filter(task => !task.isDone)
	}

	if (filter === 'completed') {
		tasksForTodolist = tasks.filter(task => task.isDone)
	}

	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		setFilter(filter)
	}

	const removeTodolistHandler = () => {
		removeTodolist(todolistId)
	}

	const addTaskCallback = (title:string) => {
		addTask(todolistId, title)
	}

	const updateTodolistHandler = (title:string) => {
		updateTodolist(todolistId, title)
	}

	return (
		<div>
			<div className={'todolist-title-container'}>
				<h3>
					<EditableSpan value={title} onChange={updateTodolistHandler}/>
				</h3>
				<Button title={'x'} onClick={removeTodolistHandler}/>
			</div>
			<div>
				<AddItemForm addItem={addTaskCallback}/>
			</div>
			{
				tasksForTodolist.length === 0
					? <p>Тасок нет</p>
					: <ul>
						{tasksForTodolist.map((task) => {

							const removeTaskHandler = () => {
								removeTask(todolistId, task.id)
							}

							const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
								const newStatusValue = e.currentTarget.checked
								changeTaskStatus(todolistId, task.id, newStatusValue)
							}

							const updateTaskHandler = (title:string) => {
								updateTask(todolistId, task.id, title)
							}


							return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
									<input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
									<EditableSpan value={task.title} onChange={updateTaskHandler}/>
									<Button onClick={removeTaskHandler} title={'x'}/>
							</li>
						})}
					</ul>
			}
			<div>
				<Button className={filter === 'all' ? 'active-filter' : ''} title={'All'}
						onClick={() => changeFilterTasksHandler('all')}/>
				<Button className={filter === 'active' ? 'active-filter' : '' } title={'Active'} onClick={()=> changeFilterTasksHandler('active')}/>
				<Button className={filter === 'completed' ? 'active-filter' : '' } title={'Completed'} onClick={()=> changeFilterTasksHandler('completed')}/>
			</div>
		</div>
	)
}




