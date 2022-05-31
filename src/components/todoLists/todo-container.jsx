import React, { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { addTodoListThunk, deleteTodoListThunk, getTodoListsThunk, setCurrentListAction, updateTodoListTitleThunk, } from '../../redux/reducers/todo-reducer';
import AddListForm from './addList/addList';
import Todo from './todo/todo';
import s from './todo-container.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const TodoContainer = ({ todoLists, getTodoListsThunk, addTodoListThunk, updateTodoListTitleThunk, deleteTodoListThunk, currentList, setCurrentListAction }) => {

    let [addMode, addModeToggle] = useState(false)

    useEffect(() => {
        getTodoListsThunk()
    }, [])

    const addList = (formData) => {
        if (formData.todoListTitle) {
            addTodoListThunk(formData.todoListTitle)
        }
        addModeToggle(false)
    }

    const updateTodoListTitle = (formData) => {
        updateTodoListTitleThunk(formData.todoListID, formData.todoListTitle)
    }

    const deleteTodoList = (todoListID) => {
        deleteTodoListThunk(todoListID)
    }

    const setCurrentList = (todoListID, todoListTitle) => {
        setCurrentListAction(todoListID, todoListTitle)
    }

    const lists = todoLists.map(list => {
        return (
            <Todo
                key={list.id}
                id={list.id}
                title={list.name}
                updateTodoListTitle={updateTodoListTitle}
                deleteTodoList={deleteTodoList}
                setCurrentList={setCurrentList}
            />
        )
    })

    return (
        <div className={s.wrapper}>
            <p className={s.title}>Todo Lists</p>
            <div className={s.lists}>
                {lists}
            </div>

            <div className={s.addList}>
                {addMode
                    ? <AddListForm onSubmit={addList} addModeToggle={addModeToggle} />
                    : <button className={s.addListBtn} onClick={() => addModeToggle(true)}>
                        <FontAwesomeIcon icon={faPlus} />
                        <span>add list</span>
                    </button>
                }
            </div>
        </div>
    )
}

let mapStateToProps = (state) => ({
    todoLists: state.todoLists.todoLists,
    currentList: state.todoLists.currentList,
})

export default connect(mapStateToProps, { getTodoListsThunk, addTodoListThunk, updateTodoListTitleThunk, deleteTodoListThunk, setCurrentListAction })(TodoContainer)