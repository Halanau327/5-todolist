import {TaskType} from "./App";
import {ChangeEvent, useState} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import {Box, Checkbox, List, ListItem} from "@mui/material";
import {filterButtonsContainerSx} from "./Todolist.styles";
import {getListItemSx} from "./Todolist.styles";


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
				<IconButton onClick={removeTodolistHandler}>
					<DeleteIcon/>
				</IconButton>
			</div>
			<div>
				<AddItemForm addItem={addTaskCallback}/>
			</div>
			{
				tasksForTodolist.length === 0
					? <p>Тасок нет</p>
					: <List>
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

							return <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
								<div>
									<Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
									<EditableSpan value={task.title} onChange={updateTaskHandler}/>
								</div>

								<IconButton onClick={removeTaskHandler}>
									<DeleteIcon/>
								</IconButton>
							</ListItem>
						})}
					</List>
			}
			<Box sx={filterButtonsContainerSx}>
				<Button  variant={filter === 'all' ? 'outlined' : 'text'} onClick={() => changeFilterTasksHandler('all')}>All</Button>
				<Button  variant={filter === 'active' ? 'outlined' : 'text'}  onClick={() => changeFilterTasksHandler('active')}>Active</Button>
				<Button  variant={filter === 'completed' ? 'outlined' : 'text'}  onClick={() => changeFilterTasksHandler('completed')}>Completed</Button>
			</Box>
		</div>
	)
}




