import * as React from 'react';
import {ChangeEvent, useState} from "react";

type Props = {
    oldTitle: string;
    updateItem:(newTitle: string) => void
};

export const EditableSpan = ({oldTitle, updateItem}: Props) => {
    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState(oldTitle)

    const activateEditModeHandler = () => {
        setEditMode(!editMode)
        if (editMode) {
            updateItem(newTitle)
        }
    }

    const changeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (
        editMode ? <input onBlur={activateEditModeHandler} value={newTitle} autoFocus onChange={changeTitleHandler}/> :
            <span onDoubleClick={activateEditModeHandler}>{newTitle}</span>
    );
};