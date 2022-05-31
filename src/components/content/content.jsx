import React from 'react';
import { connect } from 'react-redux';
import Loader from '../common/loader/loader';
import TasksContainer from '../tasks/tasks-container';
import TodoContainer from '../todoLists/todo-container';
import s from './content.module.scss'

const Content = ({ isRequesting }) => {

    return (
        <div className={s.wrapper}>
            {isRequesting && <Loader />}
            <div className={s.todoLists}>
                <TodoContainer />
            </div>
            <div className={s.tasks}>
                <TasksContainer />
            </div>
        </div >
    )
}

let mapStateToProps = (state) => ({
    isRequesting: state.app.isRequesting,
})

export default connect(mapStateToProps, {})(Content)