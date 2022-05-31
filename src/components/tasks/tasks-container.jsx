import React, { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { addTaskThunk, closeTaskThunk, reopenTaskThunk, deleteTaskThunk, getTasksThunk, updateTaskThunk } from '../../redux/reducers/task-reducer';
import AddTaskForm from './addTask/addTask';
import Task from './task/task';
import TaskInfo from './taskInfo/taskInfo';
import s from './tasks-container.module.scss'
import cn from 'classnames';

const TasksContainer = ({ tasks, currentList, addTaskThunk, getTasksThunk, updateTaskThunk, closeTaskThunk, reopenTaskThunk, deleteTaskThunk, isRequesting }) => {

    let [showMore, showMoreToggle] = useState(false)
    let [currentTask, setCurrnetTask] = useState(null)

    useEffect(() => {
        if (currentList) {
            showMoreToggle(false)
            getTasksThunk(currentList.id)
        }
    }, [currentList, getTasksThunk])

    const taskShowMore = (taskID) => {
        showMoreToggle(true)
        let task = tasks.find(task => task.id === taskID)
        setCurrnetTask(task)
    }

    const addTask = (formData) => {
        if (currentList && formData.taskTitle) {
            addTaskThunk(currentList.id, formData.taskTitle)
        }
    }

    const updateTask = (taskID, task) => {
        updateTaskThunk(taskID, task)
    }

    const taskStatusToggle = (taskID, status) => {
        status ? reopenTaskThunk(taskID) : closeTaskThunk(taskID)
    }

    const deleteTask = (taskID) => {
        deleteTaskThunk(taskID)
    }

    const tasksList = tasks.map(task => {
        return (
            <Task
                key={task.id}
                id={task.id}
                title={task.content}
                completed={task.completed}
                taskStatusToggle={taskStatusToggle}
                deleteTask={deleteTask}
                taskShowMore={taskShowMore}
            />
        )
    })

    return (
        <div className={s.wrapper}>
            <div className={cn(s.body, { [s.active]: showMore })}>
                {currentList && <p className={s.title}>{currentList.title}</p>}
                <div className={cn(s.list, { [s.disable]: isRequesting })}>
                    {tasksList.length
                        ? tasksList
                        : <span>...no current tasks...</span>
                    }
                </div>
                <div className={s.addTask}>
                    <AddTaskForm onSubmit={addTask} />
                </div>
            </div>
            <TaskInfo taskData={currentTask} showMore={showMore} showMoreToggle={showMoreToggle} />
        </div>
    )
}

let mapStateToProps = (state) => ({
    tasks: state.tasks.tasks,
    currentList: state.todoLists.currentList,
    isRequesting: state.app.isRequesting,
})

export default connect(mapStateToProps, { getTasksThunk, addTaskThunk, updateTaskThunk, closeTaskThunk, reopenTaskThunk, deleteTaskThunk })(TasksContainer)