import React from 'react';
import { connect } from 'react-redux';
import "./App.scss";
import ShowError from './components/common/showError/showError';
import Content from './components/content/content';


const App = ({ error }) => {
  return (
    <div className="app">
      <ShowError error={error} />
      <Content />
    </div>
  )
};

let mapStateToProps = (state) => ({
  error: state.app.error,
})

export default connect(mapStateToProps, {})(App);