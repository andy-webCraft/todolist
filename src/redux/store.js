import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import appReducer from "./reducers/app-reducer";
import todoReducer from "./reducers/todo-reducer";
import taskReducer from "./reducers/task-reducer";

import { reducer as formReducer } from "redux-form";

let reducers = combineReducers({
  app: appReducer,
  todoLists: todoReducer,
  tasks: taskReducer,
  form: formReducer,
});

// let store = createStore(reducers, applyMiddleware(ThunkMiddleware))

let forReduxDevTools = applyMiddleware(thunkMiddleware)(createStore);

let store = forReduxDevTools(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
