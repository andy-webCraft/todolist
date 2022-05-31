import React from 'react';
import s from './task.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCircle, faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import cn from 'classnames';

const Task = ({ id, title, completed, taskStatusToggle, deleteTask, taskShowMore }) => {
    return (
        <div className={cn(s.wrapper, { [s.completed]: completed })}>
            <button className={s.status} onClick={() => taskStatusToggle(id, completed)}>
                <FontAwesomeIcon icon={completed ? faCircleCheck : faCircle} size='lg' />
            </button>
            <span className={s.title} onClick={() => taskShowMore(id)}>{title}</span>
            <div className={s.actions}>
                <button onClick={() => deleteTask(id)}>
                    <FontAwesomeIcon icon={faTrash} color='#5867efc2' />
                </button>
            </div>
        </div>
    )
}

export default Task