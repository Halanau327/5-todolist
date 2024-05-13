import './App.css'
import {Todolist} from "./Todolist"
import {useState} from "react"
import {v1} from "uuid"
import {AddItemForm} from "./AddItemForm"
import {AppBar, Toolbar} from "@mui/material"
import IconButton from "@mui/material/IconButton"
import Button from "@mui/material/Button";
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid2 from '@mui/material/Unstable_Grid2'
import Paper from '@mui/material/Paper'
import {MenuButton} from "./MenuBotton"
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'

type ThemeMode = 'dark' | 'light'

export type TasksStateType = {
	[key:string]: TaskType[]
}

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

	const [themeMode, setThemeMode] = useState<ThemeMode>('light')

	const theme = createTheme({
		palette: {
			mode: themeMode === 'light' ? 'light' : 'dark',
			primary: {
				main: '#087EA4',
			},
		},
	})


	let todolistID1 = v1();
	let todolistID2 = v1();

	let [todolists, setTodolists] = useState<TodolistType[]>([
		{id: todolistID1, title: 'What to learn'},
		{id: todolistID2, title: 'What to buy'},
	])

	let [tasks, setTasks] = useState<TasksStateType>({
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

	const changeModeHandler = () => {
		setThemeMode(themeMode == 'light' ? 'dark' : 'light')
	}

	const removeTodolist = (todolistId: string) => {
		setTodolists(todolists.filter(td=>td.id !== todolistId))

		delete tasks[todolistId]

		setTasks({...tasks})
	}

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

	const addTodolist = (title: string) => {
		const  todolistID = v1()
		const newTodolist: TodolistType = { id: todolistID, title: title}
		setTodolists([newTodolist, ...todolists])
		setTasks({...tasks, [todolistID]: []})
	}

	const updateTask = (todolistId: string, taskId: string, title: string) => {
		setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: title} : t)})
	}

	const updateTodolist = (todolistId: string, title: string) => {
		setTodolists(todolists.map(t => t.id === todolistId ? {...t, title: title} : t))
	}

	return (
		<div>
			<ThemeProvider theme={theme}>
				<CssBaseline />
			<AppBar position="static" sx={{mb: '30px'}}>
				<Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
					<IconButton color="inherit">
						<MenuIcon/>
					</IconButton>
					<div>
						<MenuButton>Login</MenuButton>
						<MenuButton>Logout</MenuButton>
						<MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
						<Switch color={'default'} onChange={changeModeHandler} />
					</div>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<Grid2 container sx={{mb: '30px'}}>
					<AddItemForm addItem={addTodolist}/>
				</Grid2>
				<Grid2 container spacing={4}>
				{
						todolists.map(el => {
							return (
								<Grid2>
									<Paper sx={{ p: '0 20px 20px 20px' }}>
									<Todolist
										removeTodolist={removeTodolist}
										key={el.id}
										todolistId={el.id}
										title={el.title}
										tasks={tasks[el.id]}
										removeTask={removeTask}
										addTask={addTask}
										changeTaskStatus={changeTaskStatus}
										// taskId={tasks[el.id]}
										updateTask={updateTask}
										updateTodolist={updateTodolist}
									/>
									</Paper>
								</Grid2>
							)
						})
					}
				</Grid2>
			</Container>
			</ThemeProvider>
		</div>
	)
}

export default App;