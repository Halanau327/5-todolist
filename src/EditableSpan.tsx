import {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanProsType = {
    value: string
    onChange: (newTitle: string) => void
};

export const EditableSpan = ({value, onChange}: EditableSpanProsType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(value)

    const activateEditModeHandler = () => {
        setEditMode(true)
    }

    const deActivateEditModeHandler = () => {
        setEditMode(false)
        onChange(title)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        <>
            {editMode ? <TextField
                variant={'outlined'}
                value={title}
                size={'small'}
                onBlur={deActivateEditModeHandler}
                onChange={onChangeTitleHandler}
                autoFocus
            /> : <span onDoubleClick={activateEditModeHandler}>{value}</span>}
        </>
    );
};