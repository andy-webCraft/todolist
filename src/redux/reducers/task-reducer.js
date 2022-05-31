import { reset } from "redux-form";
import { todoAPI } from "../../api/todoApi";
import { addNewError, requestingToogle } from "./app-reducer";

const GET_TASKS = "GET-TASKS";
const ADD_TASK = "ADD-TASK";
const UPDATE_TASK = "UPDATE-TASK";
const CLOSE_TASK = "CLOSE-TASK";
const REOPEN_TASK = "REOPEN-TASK";
const DELETE_TASK = "DELETE-TASK";

let initialState = {
  tasks: [],
};

let taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS: {
      return { ...state, tasks: action.tasks };
    }
    case ADD_TASK: {
      return { ...state, tasks: [...state.tasks, action.task] };
    }
    case UPDATE_TASK: {
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.taskID) {
            task = action.task;
            return task;
          } else return task;
        }),
      };
    }
    case CLOSE_TASK: {
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.taskID) {
            task.completed = true;
            return task;
          } else return task;
        }),
      };
    }
    case REOPEN_TASK: {
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.taskID) {
            task.completed = false;
            return task;
          } else return task;
        }),
      };
    }
    case DELETE_TASK: {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.taskID),
      };
    }
    default:
      return state;
  }
};

export const getTasksAction = (tasks) => {
  return { type: GET_TASKS, tasks };
};

export const addTaskAction = (task) => {
  return { type: ADD_TASK, task };
};

export const updateTaskAction = (taskID, task) => {
  return { type: UPDATE_TASK, taskID, task };
};

export const closeTaskAction = (taskID) => {
  return { type: CLOSE_TASK, taskID };
};

export const reopenTaskAction = (taskID) => {
  return { type: REOPEN_TASK, taskID };
};

export const deleteTaskAction = (taskID) => {
  return { type: DELETE_TASK, taskID };
};

export const getTasksThunk = (todoListID) => {
  return async (dispatch) => {
    dispatch(requestingToogle(true));
    try {
      let response = await todoAPI.getTasks(todoListID);
      dispatch(getTasksAction(response));
    } catch (error) {
      let errorText = error.message;
      dispatch(addNewError(errorText));
    }
    dispatch(requestingToogle(false));
  };
};

export const addTaskThunk = (todoListID, taskTitle) => {
  return async (dispatch) => {
    dispatch(requestingToogle(true));
    try {
      let response = await todoAPI.addTask(todoListID, taskTitle);
      dispatch(addTaskAction(response));
      dispatch(reset("addTask"));
    } catch (error) {
      let errorText = error.message;
      dispatch(addNewError(errorText));
    }
    dispatch(requestingToogle(false));
  };
};

export const updateTaskThunk = (taskID, task) => {
  return async (dispatch) => {
    dispatch(requestingToogle(true));
    try {
      await todoAPI.updateTask(taskID, task);
      dispatch(updateTaskAction(taskID, task));
    } catch (error) {
      let errorText = error.message;
      dispatch(addNewError(errorText));
    }
    dispatch(requestingToogle(false));
  };
};

export const closeTaskThunk = (taskID) => {
  return async (dispatch) => {
    dispatch(requestingToogle(true));
    try {
      await todoAPI.closeTask(taskID);
      dispatch(closeTaskAction(taskID));
    } catch (error) {
      let errorText = error.message;
      dispatch(addNewError(errorText));
    }
    dispatch(requestingToogle(false));
  };
};

export const reopenTaskThunk = (taskID) => {
  return async (dispatch) => {
    dispatch(requestingToogle(true));
    try {
      await todoAPI.reopenTask(taskID);
      dispatch(reopenTaskAction(taskID));
    } catch (error) {
      let errorText = error.message;
      dispatch(addNewError(errorText));
    }
    dispatch(requestingToogle(false));
  };
};

export const deleteTaskThunk = (taskID) => {
  return async (dispatch) => {
    dispatch(requestingToogle(true));
    try {
      await todoAPI.deleteTask(taskID);
      dispatch(deleteTaskAction(taskID));
    } catch (error) {
      let errorText = error.message;
      dispatch(addNewError(errorText));
    }
    dispatch(requestingToogle(false));
  };
};

export default taskReducer;
