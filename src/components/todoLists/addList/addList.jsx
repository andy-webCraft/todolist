import React, { useRef } from 'react';
import { reduxForm, Field } from 'redux-form';
import s from './addList.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import useClickOutside from '../../../hooks/useClickOutside';

const AddList = ({ handleSubmit, addModeToggle }) => {
    let ref = useRef()
    let clickOutside = useClickOutside(ref)
    if (clickOutside) addModeToggle(false)

    return (
        <form ref={ref} className={s.form} onSubmit={handleSubmit}>
            <Field
                component='input'
                type='text'
                name='todoListTitle'
                autoFocus
            />
            <button className={s.addListBtn}>
                <FontAwesomeIcon icon={faPlus} size='lg' />
            </button>
        </form>
    )
}

const AddListForm = reduxForm({ form: "addList" })(AddList)
export default AddListForm