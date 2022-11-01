import React from "react";

export default function Die(props) {
  return (
    <div
      onClick={props.handleClick}
      className={`die-container ${props.isHeld ? "held" : ""}`}
    >
      {props.value}
    </div>
  );
}
