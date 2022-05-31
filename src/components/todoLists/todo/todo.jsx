import React, { useRef, useState } from 'react';
import s from './todo.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { Field } from 'redux-form';
import { reduxForm } from 'redux-form';
import cn from 'classnames';
import useClickOutside from '../../../hooks/useClickOutside';

const Todo = ({ id, title, updateTodoListTitle, deleteTodoList, setCurrentList }) => {

    let [editMode, editModeToggle] = useState(false)

    const initialValues = { todoListID: id, todoListTitle: title }

    const formHandle = (formData) => {
        if (formData.todoListTitle && formData.todoListTitle !== title) {
            updateTodoListTitle(formData)
        }
        editModeToggle(false)
    }

    return (
        <div className={cn(s.wrapper, { [s.active]: editMode })}>
            {editMode
                ? <TodoEditForm initialValues={initialValues} onSubmit={formHandle} editModeToggle={editModeToggle} />
                : <>
                    <span className={s.title} onClick={() => setCurrentList(id, title)}>{title}</span>
                    <div className={s.actions}>
                        <button className={s.editBtn} onClick={() => editModeToggle(true)}>
                            <FontAwesomeIcon icon={faPenToSquare} color='#5867efc2' />
                        </button>
                        <button className={s.deleteBtn} onClick={() => deleteTodoList(id)}>
                            <FontAwesomeIcon icon={faTrash} color='#5867efc2' />
                        </button>
                    </div>
                </>
            }
        </div>
    )
}

const TodoEdit = ({ handleSubmit, editModeToggle }) => {
    let ref = useRef()
    let clickOutside = useClickOutside(ref)
    if (clickOutside) editModeToggle(false)

    return (
        <form ref={ref} className={s.editForm} onSubmit={handleSubmit}>
            <Field
                component='input'
                type='text'
                name='todoListTitle'
                autoFocus
            />
            <Field
                component='input'
                type='text'
                name='todoListID'
                hidden
            />
            <button className={s.editBtn}>
                <FontAwesomeIcon icon={faFloppyDisk} color='#5867efc2' />
            </button>
        </form>
    )
}

const TodoEditForm = reduxForm({ form: 'todoEdit' })(TodoEdit)

export default Todo