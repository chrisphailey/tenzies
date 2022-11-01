import logo from "./logo.svg";
import "./App.css";
import Die from "./components/Die";
import { useState } from "react";
import { nanoid } from "nanoid";
import { React, useEffect } from "react";
import Confetti from "react-confetti";

function App() {
  const [diceNums, setDiceNums] = useState(allNewDice());
  const diceElements = diceNums.map((die) => (
    <Die
      handleClick={() => keepNumber(die.id)}
      value={die.value}
      key={die.id}
      isHeld={die.isHeld}
    />
  ));
  const [tenzies, setTenzies] = useState(false);
  useEffect(() => {
    const compareNum = diceNums[0].value;
    // set tenzies to true if every die isHeld and is the same number
    setTenzies(
      diceNums.every(function (num, index) {
        const compareNum = diceNums[0].value;
        return num.isHeld && num.value === compareNum;
      })
    );
  }, [diceNums]);

  function allNewDice() {
    const newDiceArray = [];
    for (let i = 0; i < 10; i++) {
      const newNum = Math.floor(Math.random() * 6 + 1);
      const numObj = { value: newNum, isHeld: false, id: nanoid() };
      newDiceArray.push(numObj);
    }
    return newDiceArray;
  }
  function newGame() {
    setDiceNums(allNewDice);
  }
  function roll() {
    setDiceNums(
      diceNums.map((die) => {
        return die.isHeld
          ? die
          : { ...die, value: Math.floor(Math.random() * 6 + 1) };
      })
    );
  }

  function keepNumber(id) {
    setDiceNums((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  return (
    <div className="App">
      <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="row-container">{diceElements}</div>
        <button onClick={tenzies ? newGame : roll}>
          {tenzies ? "New Game" : "Roll"}
        </button>
      </main>
    </div>
  );
}

export default App;
