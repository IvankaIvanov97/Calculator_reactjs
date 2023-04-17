import React, { useState } from "react";
import { evaluate } from "mathjs";

import "./main.css"

let math = [];
let nextOp = false;
function App() {
  const [number, setNumber] = useState("0");
  const [operand, setOperand] = useState("");

  const result = () => {
    if (math.length > 0 && operand !== "") {
      math[math.length - 1][0] >= 0 && math[math.length - 1][0] <= 9 ? math = [...math, operand, number] : math = [...math, number]
      setNumber(evaluate(math.join("")).toString());
      nextOp = true
    }
    console.log(number)
  };

  const handler = (x) => {
    switch (x) {
      case "sqrt":
        number[0] !== "-" && setNumber(evaluate(`sqrt(${number})`).toFixed(8).toString())
        break;
      case "+/-":
        if (number[0] === "0") break
        number[0] === "-" ? setNumber(number.slice(1, number.length)) : setNumber(`-${number}`)
        break;
      case ".":
        !number.includes('.') && setNumber(number + x)
        break;
      default:
        if (typeof x == "number") {
          number === "0" ? setNumber(x.toString()) : setNumber(number + x)
        }
        else {
          if (nextOp) math = []
          nextOp = false
          setOperand(x)
          math = [...math, number, x]
          setNumber("0")
        }
        break;
    }
  };
  return (
    <div className="App">
      <p className="pob">{math.join("")}</p>
      <p>{number}</p>
      <table>
        <thead style={{display: "none"}}>
        </thead>
        <tbody>
        <tr>
          <td>
            <button onClick={() => handler("sqrt")}>sqrt</button>
          </td>
          <td>
            <button onClick={() => setNumber(number.slice(0, -1))}>DEL</button>
          </td>
          <td>
            <button onClick={() => {
              setNumber("0")
              math = []
            }}>C</button>
          </td>
          <td>
            <button onClick={() => handler("/")}>/</button>
          </td>
        </tr>
        <tr>
          <td>
            <button onClick={() => handler(7)}>7</button>
          </td>
          <td>
            <button onClick={() => handler(8)}>8</button>
          </td>
          <td>
            <button onClick={() => handler(9)}>9</button>
          </td>
          <td>
            <button onClick={() => handler("*")}>x</button>
          </td>
        </tr>
        <tr>
          <td>
            <button onClick={() => handler(4)}>4</button>
          </td>
          <td>
            <button onClick={() => handler(5)}>5</button>
          </td>
          <td>
            <button onClick={() => handler(6)}>6</button>
          </td>
          <td>
            <button onClick={() => handler("-")}>-</button>
          </td>
        </tr>
        <tr>
          <td>
            <button onClick={() => handler(1)}>1</button>
          </td>
          <td>
            <button onClick={() => handler(2)}>2</button>
          </td>
          <td>
            <button onClick={() => handler(3)}>3</button>
          </td>
          <td>
            <button onClick={() => handler("+")}>+</button>
          </td>
        </tr>
        <tr>
          <td>
            <button onClick={() => handler("+/-")}>+/-</button>
          </td>
          <td>
            <button onClick={() => handler(0)}>0</button>
          </td>
          <td>
            <button onClick={() => handler(".")}>,</button>
          </td>
          <td>
            <button onClick={() => result()}>=</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
