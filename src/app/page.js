"use client"
import React, {useState} from "react";

let fixEqual = 0;
let fixOperations = 0;//handles consecutive operations clicked

export default function Home() {
  const [calc, setCalc] = useState("");
  const [display, setDisplay] = useState('0');
  
  function handleNumbers(event) {
    fixOperations = 0;
    const number = event.target.dataset.value;
    setDisplay(display === "0" ? number : display + number);
  }

  function handleOperations(event) {
    const operation = event.target.dataset.value;
    if (fixOperations > 0 && operation !== "-") {
      setDisplay("0");
      let numberString = calc.toString();
      let modifiedNumberString = numberString.slice(0, -1);
      let modifiedNumber = parseInt(modifiedNumberString);
      setCalc(modifiedNumber + operation);
      return
    }else if (fixOperations > 0) {
      setDisplay("0");
      setCalc(calc + operation);
      return
    }
    fixOperations = 1;
    if (fixEqual > 0) {
      setCalc(display + operation);
      fixEqual = 0;
      setDisplay("0");
      return
    }
    setCalc(calc + display + operation);
    setDisplay("0");
  }

  function handleEqual() {
    const resultFn = new Function("return " + calc + display);
    const result = resultFn();
    if (isNaN(result)) {
      setCalc("");
      setDisplay("0");
      return;
    }
    setCalc(calc + display + "=");
    setDisplay(result.toString());
    fixEqual = 1;
    fixOperations = 0;
  }

  function handleDot() {
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  }

  function handleClear() {
    setCalc("");
    setDisplay("0");
    fixOperations = 0;
    fixEqual = 0;
  }

  const CustomNumber = ({id, value, className}) => {
    return (
      <button id={id} data-value={value} className={`${className} outline outline-1 outline-coolblue hover:outline-2 hover:bg-zinc-950 active:scale-95`} onClick={handleNumbers}>{value}</button>
    )
  }
  
  const CustomOperation = ({id, value, className}) => {
    return (
      <button id={id} data-value={value} className={`${className} outline outline-1 outline-coolblue hover:outline-2 hover:bg-zinc-950 active:scale-95`} onClick={handleOperations}>{value}</button>
    )
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-24 sm:p-12">
      <div id="container" className="sm:w-full sm:h-[36rem] w-[24rem] flex flex-col bg-zinc-900 text-violet-100 text-xl rounded-3xl">
        <div id="display-container" className='font-dsdigital w-full min-h-[6rem] flex flex-col justify-end items-end p-2 rounded-t-3xl'>
          <span className="sm:text-xl tracking-widest text-zinc-400 flex items-end" style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{calc}</span>
          <span className="text-4xl flex items-end" style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }} id="display">{display}</span>
        </div>
        <div id="buttons" className="w-full h-[22rem] sm:h-full grid grid-cols-5 grid-rows-5">
          <CustomNumber id={"nine"} value={'9'} className={"row-start-2 row-end-3 col-start-3 col-end-4"} />
          <CustomNumber id={"eight"} value={'8'} className={"row-start-2 row-end-3 col-start-2 col-end-3"}/>
          <CustomNumber id={"seven"} value={'7'} className={"row-start-2 row-end-3 col-start-1 col-end-2"}/>
          <CustomNumber id={"six"} value={'6'} className={"row-start-3 row-end-4 col-start-3 col-end-4"}/>
          <CustomNumber id={"five"} value={'5'} className={"row-start-3 row-end-4 col-start-2 col-end-3"}/>
          <CustomNumber id={"four"} value={'4'} className={"row-start-3 row-end-4 col-start-1 col-end-2"}/>
          <CustomNumber id={"three"} value={'3'} className={"row-start-4 row-end-5 col-start-3 col-end-4"}/>
          <CustomNumber id={"two"} value={'2'} className={"row-start-4 row-end-5 col-start-2 col-end-3"}/>
          <CustomNumber id={"one"} value={'1'} className={"row-start-4 row-end-5 col-start-1 col-end-2"}/>
          <CustomNumber id={"zero"} value={'0'} className={"row-start-5 row-end-6 col-start-2 col-end-4"}/>
          <button id="clear" className={"row-start-1 row-end-2 col-start-1 col-end-4 outline outline-1 outline-coolblue hover:outline-2 hover:bg-zinc-950 active:scale-95"} onClick={handleClear}>C</button>
          <CustomOperation id={"multiply"} value={"*"} className={"row-start-1 row-end-2 col-start-4 col-end-6"}/>
          <CustomOperation id={"divide"} value={"/"} className={"row-start-2 row-end-3 col-start-4 col-end-6"}/>
          <CustomOperation id={"add"} value={"-"} className={"row-start-3 row-end-4 col-start-4 col-end-6"}/>
          <CustomOperation id={"subtract"} value={"+"} className={"row-start-4 row-end-5 col-start-4 col-end-6"}/>
          <button id="equals" className={"row-start-5 row-end-6 col-start-4 col-end-6 outline outline-1 outline-coolblue hover:outline-2 hover:bg-zinc-950 rounded-br-3xl  active:scale-95"} onClick={handleEqual}>=</button>
          <button id="decimal" className={"row-start-5 row-end-6 col-start-1 col-end-2 outline outline-1 outline-coolblue hover:outline-2 hover:bg-zinc-950 rounded-bl-3xl  active:scale-95"} onClick={handleDot}>.</button>
        </div>
      </div>
    </main>
  )
}
