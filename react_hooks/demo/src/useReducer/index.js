import React from "react";
import Showarea from "./showarea";
import Button from "./button";
import {Color} from "./color"

export default function Example() {
  return (
    <div> --------------<br/>
      <h1>useReducer,useContext配合替代redux</h1>
      <Color>
        <Button />
        <Showarea />
      </Color>
    </div>
  );
}
