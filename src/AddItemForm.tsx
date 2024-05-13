import {ChangeEvent, KeyboardEvent, useState} from "react";

import Button from '@mui/material/Button'
import {TextField} from "@mui/material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = ({addItem}: AddItemFormPropsType) => {
    const [error, setError] = useState<string | null>(null)
    const [taskTitle, setTaskTitle] = useState('')

    const addItemHandler = () => {
        if (taskTitle.trim() !== '') {
            addItem(taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addItemHandler()
        }
    }

    return (
        <div>
            <TextField
                label='Enter a title'
                variant={'outlined'}
                size={'small'}
                error={!!error}
                className={error ? 'error' : ''}
                value={taskTitle}
                onChange={changeItemTitleHandler}
                onKeyUp={addItemOnKeyUpHandler}
            />
            <Button variant="contained" onClick={addItemHandler}>
                +
            </Button>
        </div>
    )
}