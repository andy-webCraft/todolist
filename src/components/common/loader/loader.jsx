import React from 'react';
import s from './loader.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Loader = () => {
    return (
        <div className={s.wrapper}>
            <FontAwesomeIcon className={s.spinner} icon={faSpinner} color='#ffffff' size='2x' />
        </div>
    )
}

export default Loader