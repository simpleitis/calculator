import { useEffect, useState } from "react";

export default function App() {
  const [firstOperand, setFirstOperand] = useState("");
  const [secondOperand, setSecondOperand] = useState("");
  const [operator, setOperator] = useState("");
  const [result, setresult] = useState("");
  const [resultString, setResultString] = useState("");

  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const lowerRow = [".", "0", "="];

  const operations = ["+", "-", "*", "/"];

  const handleNumberClick = (number: string) => {
    if (!firstOperand) {
      setFirstOperand(number);
    } else if (!!firstOperand && !secondOperand && !operator) {
      setFirstOperand(firstOperand + number);
    } else if (!!firstOperand && !!operator && !secondOperand) {
      setSecondOperand(number);
    } else if (!!firstOperand && !!operator && !!secondOperand) {
      setSecondOperand(secondOperand + number);
    }
  };

  const handleOperationClick = (element: string) => {
    if (element === ".") {
      if (!firstOperand) {
        setFirstOperand("0.");
      } else if (
        !!firstOperand &&
        !secondOperand &&
        !firstOperand.includes(".")
      ) {
        setFirstOperand(firstOperand + ".");
      } else if (!!firstOperand && !secondOperand) {
        setSecondOperand("0.");
      } else if (
        !!firstOperand &&
        !!secondOperand &&
        !secondOperand.includes(".")
      ) {
        setSecondOperand(secondOperand + ".");
      }
    } else if (element === "+") {
      if (firstOperand && !secondOperand) {
        setOperator("+");
      }
    } else if (element === "-") {
      if (!!firstOperand && !secondOperand) {
        setOperator("-");
      } else if (!firstOperand) {
        setFirstOperand("-");
      }
    } else if (element === "*") {
      if (firstOperand && !secondOperand) {
        setOperator("*");
      }
    } else if (element === "/") {
      if (firstOperand && !secondOperand) {
        setOperator("/");
      }
    } else if (element === "=") {
      if (!!firstOperand && !!operator && !!secondOperand) {
        const A = parseFloat(firstOperand);
        const B = parseFloat(secondOperand);

        if (operator === "+") {
          const res = String(A + B);
          setresult(res);
          setFirstOperand(res);
          setSecondOperand("");
          setOperator("");
        } else if (operator === "-") {
          const res = String(A - B);
          setresult(res);
          setFirstOperand(res);
          setSecondOperand("");
          setOperator("");
        } else if (operator === "*") {
          const res = String(A * B);
          setresult(res);
          setFirstOperand(res);
          setSecondOperand("");
          setOperator("");
        } else if (operator === "/") {
          if (B === 0) {
            setresult("Not defined");
          } else {
            const res = String(A / B);
            setresult(res);
            setFirstOperand(res);
            setSecondOperand("");
            setOperator("");
          }
        }
      }
    }
  };

  const handleDelete = () => {
    if (!firstOperand) {
      return null;
    } else if (!!firstOperand && !operator && !secondOperand) {
      setFirstOperand(firstOperand.slice(0, -1));
    } else if (!!firstOperand && !!operator && !!secondOperand) {
      setSecondOperand(secondOperand.slice(0, -1));
    } else if (!!firstOperand && !!operator) {
      setOperator("");
    }
  };

  const handleAllClear = () => {
    setFirstOperand("");
    setSecondOperand("");
    setOperator("");
  };

  useEffect(() => {
    const resString = firstOperand + operator + secondOperand;
    setResultString(resString);
  }, [firstOperand, operator, secondOperand]);

  // useEffect(() => {
  //   console.log("First operand: ", firstOperand);
  // }, [firstOperand]);

  // useEffect(() => {
  //   if (!!secondOperand) {
  //     console.log("Second:", secondOperand);
  //   }
  // }, [secondOperand]);

  return (
    <div className="flex justify-center mt-5">
      <div className="bg-green-200  p-3 text-right w-full lg:w-max lg:min-w-[30%]">
        <p className="text-2xl font-bold bg-white p-2 h-5">{}</p>
        <p className="text-lg bg-white p-2 h-10">{resultString}</p>

        <div className="flex bg-red-200">
          <div className="grid grid-cols-3 w-full lg:min-w-[20%]">
            {/* Render numbers from 1-9 */}
            {numbers.map((number) => {
              return (
                <button
                  key={number}
                  onClick={() => handleNumberClick(number)}
                  className="font-bold text-center col-span-1 p-2 bg-blue-400 m-2"
                >
                  {number}
                </button>
              );
            })}

            {/* Render bottom row */}
            {lowerRow.map((element) => {
              const convertedElement = Number(element);
              if (Number.isInteger(convertedElement)) {
                return (
                  <button
                    key={element}
                    onClick={() => handleNumberClick(element)}
                    className="font-bold text-center col-span-1 p-2 bg-blue-400 m-2"
                  >
                    {element}
                  </button>
                );
              }

              return (
                <button
                  key={element}
                  onClick={() => handleOperationClick(element)}
                  className="font-bold text-center col-span-1 p-2 bg-blue-400 m-2"
                >
                  {element}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col">
            {/* Render operations */}
            {operations.map((operator) => {
              return (
                <button
                  key={operator}
                  onClick={() => handleOperationClick(operator)}
                  className="font-bold text-center col-span-1 p-2 bg-blue-400 m-2 h-16 w-16"
                >
                  {operator}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center gap-5">
          <button
            onClick={handleDelete}
            className="m-2 p-3 bg-black text-white w-full font-bold"
          >
            X
          </button>
          <button
            onClick={handleAllClear}
            className="m-2 p-3 bg-black text-white w-full  font-bold"
          >
            AC
          </button>
        </div>
      </div>
    </div>
  );
}
