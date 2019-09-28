import React, { useContext } from "react";
import { color_update, colorContext } from "./color";

export default function Button() {
  const { dispatch } = useContext(colorContext);
  return (
    <div>
      <button onClick={() => dispatch({ type: color_update, color: "blue" })}>
        blue
      </button>
      <button onClick={() => dispatch({ type: color_update, color: "red" })}>
        red
      </button>
    </div>
  );
}
