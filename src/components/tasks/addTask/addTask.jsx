import React from 'react';
import { reduxForm, Field } from 'redux-form';
import s from './addTask.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AddTask = ({ handleSubmit }) => {
    return (
        <form className={s.form} onSubmit={handleSubmit}>
            <Field
                component='input'
                type='text'
                name='taskTitle'
            />
            <button className={s.addTaskBtn}>
                <FontAwesomeIcon icon={faPlus} size='lg' />
                <span>add task</span>
            </button>
        </form>
    )
}

const AddTaskForm = reduxForm({ form: 'addTask' })(AddTask)
export default AddTaskForm