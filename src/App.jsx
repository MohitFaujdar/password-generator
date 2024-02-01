import { useCallback, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [Password, setPassword] = useState("");
  const [Num, setNum] = useState(false);
  const [Spc, setSpc] = useState(false);
  const [Range, setRange] = useState(10);
  const [Ctext, setCtext] = useState("Copy");

  const passwordG = useCallback(() => {
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let pass = "";
    if (Num) str += "1234567890";
    if (Spc) str += "!@#$%^&*()";
    console.log(str);

    for (let index = 0; index < Range; index++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setCtext("Copy");

    setPassword(pass);
  }, [Num, Spc, Range, setPassword]);
  useEffect(() => {
    passwordG();
    // setCtext("Copy");
  }, [Num, Spc, Range]);

  const cpass = () => {
    window.navigator.clipboard.writeText(Password);
    setCtext("Copied👍");
  };

  return (
    <div className="flex items-center flex-col justify-center h-screen -mt-20">
      <h1 className="text-4xl  py-6 font-bold ">Password Generator</h1>
      <div className="border-2 border-black w-1/3 text-center flex text-lg rounded-xl overflow-hidden items-center  shadow-xl">
        <div className="flex-1">{Password}</div>
        <button
          type="button"
          onClick={cpass}
          className="bg-red-600 py-3 px-6  border-l flex-shrink shadow-lg"
        >
          {Ctext}
        </button>
      </div>
      <div className="flex gap-4 py-4 ">
        <input
          type="range"
          min={8}
          max={24}
          defaultValue={10}
          onChange={(e) => {
            setRange(e.target.value);
            // passwordG();
          }}
        />
        <div className="font-bold"> {Range}</div>
      </div>
      <div>
        <input
          type="checkbox"
          defaultChecked={Num}
          id="inputNum"
          onChange={() => {
            setNum((Num) => !Num);
            // passwordG();
          }}
        />{" "}
        Numbers
        <input
          className="ml-4"
          type="checkbox"
          defaultChecked={Spc}
          id="inputSpc"
          onChange={() => {
            setSpc((Spc) => !Spc);
            // passwordG();
          }}
        />{" "}
        Symbols
      </div>
      <button
        onClick={passwordG}
        className="bg-red-700 text-gray-100 rounded-md py-3 px-3 mt-6 shadow-xl"
      >
        Generate
      </button>
    </div>
  );
}

export default App;
