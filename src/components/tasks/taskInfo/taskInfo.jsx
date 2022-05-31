import React, { useState } from 'react';
import s from './taskInfo.module.scss'
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import dataParse from '../../../tools/dataParse';
import { reduxForm } from 'redux-form';
import { Field } from 'redux-form';

const TaskInfo = ({ taskData, showMore, showMoreToggle }) => {

    let [editMode, setEditMode] = useState(false)

    let initialValues = taskData

    return (
        <div className={cn(s.wrapper, { [s.active]: showMore })}>
            {taskData && !editMode
                ? <ul className={s.list}>
                    <li><b>content:</b> <span>{taskData.content}</span></li>
                    <li><b>description:</b> <span>{taskData.description}</span></li>
                    <li><b>priority:</b> <span>{taskData.priority}</span></li>
                    <li><b>created:</b> <span>{dataParse(taskData.created)}</span></li>
                </ul>
                : <TaskInfoEditForm initialValues={initialValues} />
            }
            <button className={s.closeBtn} onClick={() => showMoreToggle(false)}>
                <FontAwesomeIcon icon={faCircleXmark} color='#e7e7e7' size='2x' />
            </button>
        </div >
    )
}

const TaskInfoEdit = ({ handleSubmit }) => {
    return (
        <form className={s.editForm} onSubmit={handleSubmit}>
            <ul className={s.list}>
                <li>
                    <b>content:</b>
                    <Field
                        component='input'
                        type='text'
                        name='content'
                    />
                </li>
                <li>
                    <b>description:</b>
                    <Field
                        component='input'
                        type='text'
                        name='description'
                    />
                </li>
                <li><b>priority:</b><span></span></li>
                <li><b>created:</b> <span></span></li>
            </ul>
        </form>
    )
}

const TaskInfoEditForm = reduxForm({ form: "taskInfo" })(TaskInfoEdit)

export default TaskInfo