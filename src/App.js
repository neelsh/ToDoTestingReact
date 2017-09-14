import React, { Component } from 'react';
import './App.css';

class TodoList extends Component {
  render () {
    if (this.props.items) {
      const items = this.props.items.map((item, index) => {
        return (
          <TodoListItem key={index} item={item} index={index} removeItem={this.props.removeItem} markTodoDone={this.props.markTodoDone} />
        );
      });
      return (
        <ul className="list-group"> {items} </ul>
      );
    } else {
      return null;
    }
  }
}

class TodoListItem extends Component {
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
  }
  onClickClose() {
    const index = parseInt(this.props.index);
    this.props.removeItem(index);
  }
  onClickDone() {
    const index = parseInt(this.props.index);
    this.props.markTodoDone(index);
  }
  render () {
    const todoClass = this.props.item.done ?
        "done" : "undone";
    return(
      <li className="list-group-item ">
        <div className={todoClass}>
          <span className="glyphicon glyphicon-ok icon" aria-hidden="true" onClick={this.onClickDone}></span>
          {this.props.item.value}
          <button type="button" className="close" onClick={this.onClickClose}>&times;</button>
        </div>
      </li>
    );
  }
}

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.refs.itemName.focus();
  }
  onSubmit(event) {
    event.preventDefault();
    const newItemValue = this.refs.itemName.value;

    if(newItemValue) {
      this.props.addItem({newItemValue});
      this.refs.form.reset();
    }
  }
  render () {
    return (
      <form ref="form" onSubmit={this.onSubmit} className="form-inline">
        <input type="text" ref="itemName" className="form-control" placeholder="add a new todo..."/>
        <button type="submit" className="btn btn-success">Add</button>
      </form>
    );
  }
}

class TodoHeader extends Component {
  render () {
    return <h2>To do list</h2>;
  }
}

class TodoApp extends Component {
  constructor (props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.state = {todoItems: props.todoItems || []};
  }
  addItem(todoItem) {
    if (this.state.todoItems) {
      this.state.todoItems.unshift({
        index: this.state.todoItems.length+1,
        value: todoItem.newItemValue,
        done: false
      });
    } else {
      return null
    }
    this.setState({todoItems: this.state.todoItems});
  }
  removeItem (itemIndex) {
    this.state.todoItems.splice(itemIndex, 1);
    this.setState({todoItems: this.state.todoItems});
  }
  markTodoDone(itemIndex) {
    const todo = this.state.todoItems[itemIndex];
    this.state.todoItems.splice(itemIndex, 1);
    todo.done = !todo.done;
    todo.done ? this.state.todoItems.push(todo) : this.state.todoItems.unshift(todo);
    this.setState({todoItems: this.state.todoItems});
  }

  render() {
    return (
      <div id="main">
        <TodoHeader />
        <TodoList items={this.state.todoItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone}/>
        <TodoForm addItem={this.addItem} />
      </div>
    );
  }
}

export default TodoApp;
