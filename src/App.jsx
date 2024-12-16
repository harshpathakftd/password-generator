import { useState, useCallback, useEffect } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxys";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*(){}[]";

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  useEffect(()=> {passwordGenerator()} , [length , numberAllowed , characterAllowed])
  
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-xl rounded-lg px-6 py-8 my-8 bg-gradient-to-r from-blue-500 via-teal-400 to-green-500">
        <div className="flex shadow-lg rounded-lg overflow-hidden mb-6">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-4 text-gray-800 bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg transition-all duration-300 ease-in-out"
            placeholder="*********"
            readOnly
          />
          <button className="outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0">Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range"  min={8} max={16} value={length} className="cursor-pointer" onChange={(e) => setLength(e.target.value)}/>
            <label htmlFor="">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={() => {
              setNumberAllowed((prev) => !prev)
            }}/>
            <label htmlFor="">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={characterAllowed} id="numberInput" onChange={() => {
              setCharacterAllowed((prev) => !prev)
            }}/>
            <label htmlFor="">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
