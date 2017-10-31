import React, { Component } from 'react';
import logo from './logo.svg';
import ColumnList from './ColumnList';
import './App.css';

class App extends Component {
  constructor() {
    super();
     this.state = {
      items: []
    }

    this.addTask = this.addTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }

  componentWillMount () {
    const toDoListItems = window.localStorage.getItem('toDoListItems') || '[]';
    this.setState({ items: JSON.parse(toDoListItems)});
  }

  addTask(e) {
    e.preventDefault();
    const value = e.target.querySelector('input').value;
    this.setState(prev => {
      const { items = [] } =prev;
      const newTask = {
        id: items.length + 1,
        title: value,
        status: 'To Do'
      }
      items.push(newTask);
      this.updateLocalStorage(items);
      return {items};
    })
  }

  updateTask(target, task) {
   this.setState(prev => {
     const {items = [] } = this.state;
     const s = items.filter (_ => _.id !== task.id);
     task.status = target.checked ? 'Done' : 'To Do';
     s.push(task);
     this.updateLocalStorage(s);
     return { items: s };
   })
  }
  updateLocalStorage(items) {
    window.localStorage.setItem('toDoListItems', JSON.stringify(items));
  }
  render() {
    const {items = [] } = this.state;
    const columns = [
      { title: 'To Do', items },
      { title: 'Done', items }
    ];

    return (
      <div className="App">
        <div className="App-header">
           <img src={logo} className="App-logo" alt="logo" />
           <h2>To-Do's List</h2>
        </div>
        <div className="App-container">
          <div className="app-lists">
          {columns.map (column => (
           <ColumnList
           key={column.title}
           title= {column.title}
           items={items}
           addTask={this.addTask}
           updateTask={this.updateTask}
           />
          ))}
          </div>
        </div>
    </div>
    );
  }
}

export default App;
