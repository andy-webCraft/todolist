import { todoAPI } from "../../api/todoApi";
import { addNewError, requestingToogle } from "./app-reducer";

const GET_TODOLISTS = "GET-TODOLISTS";
const ADD_TODOLIST = "ADD-TODOLIST";
const UPDATE_TODOLIST_TITLE = "UPDATE-TODOLIST-TITLE";
const DELETE_TODOLIST = "DELETE-TODOLIST";
const SET_CURRENT_LIST = "SET-CURRENT-LIST";

let initialState = {
  todoLists: [],
  currentList: null,
};

let todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TODOLISTS: {
      return { ...state, todoLists: action.lists };
    }
    case ADD_TODOLIST: {
      return { ...state, todoLists: [...state.todoLists, action.list] };
    }
    case UPDATE_TODOLIST_TITLE: {
      return {
        ...state,
        todoLists: state.todoLists.map((list) => {
          if (list.id === action.todoListID) {
            list.name = action.todoListTitle;
            return list;
          } else return list;
        }),
      };
    }
    case DELETE_TODOLIST: {
      return {
        ...state,
        todoLists: state.todoLists.filter(
          (list) => list.id !== action.todoListID
        ),
      };
    }
    case SET_CURRENT_LIST: {
      return {
        ...state,
        currentList: { id: action.todoListID, title: action.todoListTitle },
      };
    }
    default:
      return state;
  }
};

export const getTodoListsAction = (lists) => {
  return { type: GET_TODOLISTS, lists };
};

export const addTodoListAction = (list) => {
  return { type: ADD_TODOLIST, list };
};

export const updateTodoListTitleAction = (todoListID, todoListTitle) => {
  return { type: UPDATE_TODOLIST_TITLE, todoListID, todoListTitle };
};

export const deleteTodoListAction = (todoListID) => {
  return { type: DELETE_TODOLIST, todoListID };
};

export const setCurrentListAction = (todoListID, todoListTitle) => {
  return { type: SET_CURRENT_LIST, todoListID, todoListTitle };
};

export const getTodoListsThunk = () => {
  return async (dispatch) => {
    dispatch(requestingToogle(true));
    try {
      let response = await todoAPI.getTodoLists();
      dispatch(getTodoListsAction(response));
    } catch (error) {
      let errorText = error.message;
      dispatch(addNewError(errorText));
    }
    dispatch(requestingToogle(false));
  };
};

export const addTodoListThunk = (todoListTitle) => {
  return async (dispatch) => {
    dispatch(requestingToogle(true));
    try {
      let response = await todoAPI.addTodoList(todoListTitle);
      dispatch(addTodoListAction(response));
    } catch (error) {
      let errorText = error.message;
      dispatch(addNewError(errorText));
    }
    dispatch(requestingToogle(false));
  };
};

export const updateTodoListTitleThunk = (todoListID, todoListTitle) => {
  return async (dispatch) => {
    dispatch(requestingToogle(true));
    try {
      await todoAPI.updateTodoListTitle(
        todoListID,
        todoListTitle
      );
      dispatch(updateTodoListTitleAction(todoListID, todoListTitle));
    } catch (error) {
      let errorText = error.message;
      dispatch(addNewError(errorText));
    }
    dispatch(requestingToogle(false));
  };
};

export const deleteTodoListThunk = (todoListID) => {
  return async (dispatch) => {
    dispatch(requestingToogle(true));
    try {
      await todoAPI.deleteTodoList(todoListID);
      dispatch(deleteTodoListAction(todoListID));
    } catch (error) {
      let errorText = error.message;
      dispatch(addNewError(errorText));
    }
    dispatch(requestingToogle(false));
  };
};

export default todoReducer;
