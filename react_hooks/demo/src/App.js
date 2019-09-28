import React, { Component } from 'react';

import Usestate from "./usestate"
import Usestate2 from "./usestate2"
import Useeffect from "./useeffect"
import Useeffect2 from "./useeffect2";
import Createcontext from "./createContext";
import Usereducer from "./useReducer";
import Usereducer2 from "./useReducer/index"
class App extends Component {
  render() {
    return (
      <div className="App">
        <Usestate/>
        <Usestate2/>
        <Useeffect/>
        <Useeffect2/>
        <Createcontext/>
        <Usereducer/>
        <Usereducer2/>
      </div>
    );
  }
}

export default App;
