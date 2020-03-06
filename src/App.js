import React, {Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import './App.css';
import List from './component/list/index'
import list from './router'
class App extends Component {
  render() {/*渲染函数:返回dom结构，dom结构需要用（）括起来*/
    return (
        <div className="App">
          <Router>
              <List list={list}></List>
              {
                  list.map((item) =>{
                      return (<Route
                          key={item.name}
                          path={item.path}
                          component={item.com}
                      >
                      </Route>)
                  })
              }
              <Route></Route>
          </Router>
        </div>
    );
  }
}
export default App;
