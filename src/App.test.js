import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './App';
import TodoList from './App';
import { shallow, mount, render } from 'enzyme';

describe('Todo List', () => {
  it('starts with an empty list', () => {
    expect(shallow(<TodoApp />).find('TodoList').length).toEqual(1)
  })

  it('adds an item to the list', () => {
    const todolist = [{
      item: 'item one',
      index: 1
    }]
    const wrapper = shallow(<TodoApp todoItems={todolist}/>)
    const i = wrapper.find('TodoList').dive().find('TodoListItem').dive()
    expect(i.text()).toContain('item one')
  })

  it('checks an item on the list', () => {
    const todolist = [{
      item: 'item one',
      index: 1,
      markTodoDone: false
    }]
    const wrapper = shallow(<TodoApp todoItems={todolist}/>)
    const i = wrapper.find('TodoList').dive().find('TodoListItem').dive()
    const todoDone = wrapper.find('.glyphicon').at(0)
    todoDone.simulate('click')
    expect(todoDone.hasClass('todoClass')).toEqual(false)
  })

  it('deletes an item off the list', () => {
    const todolist = [{
      item: 'item one',
      index: 1,
      markTodoDone: false
    }]
    const wrapper = shallow(<TodoApp todoItems={todolist}/>)
    const i = wrapper.find('TodoList').dive().find('TodoListItem').dive()
    const todoLength = wrapper.find('li').length
    wrapper.find('button.close').at(0).simulate('click')
    expect(wrapper.find('li').length).toEqual(0)
  })
})
