import {ChangeEvent, useState} from "react";

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
            {editMode ? <input value={title}
                               autoFocus
                               onBlur={deActivateEditModeHandler}
                               onChange={onChangeTitleHandler}
            /> : <span onDoubleClick={activateEditModeHandler}>{value}</span>}
        </>
    );
};