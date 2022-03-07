import React from 'react';
import { connect } from 'react-redux';
import "./App.scss";
import { initializedToogle } from './redux/reducers/app-reducer';
import { getTodoListsThunk } from './redux/reducers/todo-reducer';

const App = ({ getTodoListsThunk, initializedToogle }) => {
  return (
    <div className="App">
      <button onClick={() => initializedToogle()} >init</button>
      <button onClick={() => getTodoListsThunk()} >get</button>
    </div>
  )
};

let mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, { getTodoListsThunk, initializedToogle })(App);

