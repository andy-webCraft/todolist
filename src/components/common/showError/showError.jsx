import React, { useEffect, useState } from 'react';
import s from './showError.module.scss'
import cn from 'classnames';
import { addNewError } from '../../../redux/reducers/app-reducer';
import { useDispatch } from 'react-redux';

const ShowError = ({ error }) => {

    let [showMode, showModeToggle] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if (error) {
            showModeToggle(true)
            setTimeout(() => {
                showModeToggle(false)
            }, 3000)
            setTimeout(() => dispatch(addNewError(null)), 3300)
        }
    }, [error])

    return (
        <div className={cn(s.wrapper, { [s.active]: showMode })}>
            <span className={s.text}>{error}</span>
        </div>
    )
}

export default ShowError