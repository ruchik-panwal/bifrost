import { useEffect, useRef } from "react";

function SearchBar({ termSetter }) {
  // 1. Create a reference to the input element
  const inputRef = useRef(null);

  // 2. Focus the input when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []); // Empty array ensures this only runs once on load

  function inputChange(value) {
    termSetter(value);
  }

  return (
    <input
      ref={inputRef} // 3. Attach the ref to the input
      type="text"
      className="w-full h-[8vh] border bg-mainWhite text-black rounded-[7px] outline-none p-1 pl-3 pr-3"
      onChange={(event) => inputChange(event.target.value)}
      placeholder=""
    />
  );
}

export default SearchBar;