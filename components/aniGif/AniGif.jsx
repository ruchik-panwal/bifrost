import { useState, useEffect, useRef } from "react";
import { pinData } from "./pinData";
import { AniGifAni } from "./AniGifAni"; // <-- Imported Hook

function AniGif() {
  const [number, setNumber] = useState(() => {
    const saved = localStorage.getItem("pinIndex");
    const initialValue = JSON.parse(saved);
    return initialValue !== null ? initialValue : 0;
  });

  const contanerRef = useRef();
  const loaderRef = useRef();
  const btnRef = useRef();
  const txtRef = useRef();

  // Consume the custom animation hook
  const { inAnimation, outAnimation, containerAnimation } = AniGifAni({
    contanerRef,
    btnRef,
    txtRef,
    loaderRef,
    number,
    setNumber,
    pinData,
  });

  useEffect(() => {
    localStorage.setItem("pinIndex", JSON.stringify(number));
  }, [number]);

  return (
    <div
      className="relative flex flex-col overflow-hidden items-center box-border max-h-120"
      onMouseEnter={inAnimation}
      onMouseLeave={outAnimation}
      ref={contanerRef}
    >
      <img
        src={pinData.images[number].url}
        alt={`Pin ${number}`}
        className="h-full w-full object-cover rounded-none"
      />
      <div
        className="absolute bg-white h-full w-full mix-blend-difference rounded-none cursor-pointer"
        onClick={() => window.open(pinData.images[number].url, "_blank")}
      ></div>
      <button
        onClick={containerAnimation}
        className="absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-white rounded-[5px] p-2 mix-blend-difference hover:cursor-pointer"
        ref={btnRef}
      >
        <p
          className="absolute top-full left-1/2 -translate-x-1/2 font-[Racing_Sans_One] font-bold text-3xl text-black"
          ref={txtRef}
        >
          Sike
        </p>
      </button>
      <div
        className="absolute bottom-0 bg-mainWhite w-full"
        ref={loaderRef}
      ></div>
    </div>
  );
}

export default AniGif;
