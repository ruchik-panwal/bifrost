import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { pinData } from "./pinData";

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
  const tlRef = useRef();
  const containerTlRef = useRef();
  const { contextSafe } = useGSAP({ scope: contanerRef });

  useEffect(() => {
    localStorage.setItem("pinIndex", JSON.stringify(number));
  }, [number]);

  const numSetter = () => {
    if (number >= pinData.total - 1) {
      setNumber(0);
    } else {
      setNumber(number + 1);
    }
  };

  const inAnimation = contextSafe(() => {
    if (tlRef.current) tlRef.current.kill();

    tlRef.current = gsap.timeline();

    tlRef.current
      .to(btnRef.current, {
        width: "40%",
        height: "40px",
        duration: 0.7,
        ease: "power3.out",
      })
      .to(txtRef.current, {
        top: "50%",
        yPercent: "-50",
        duration: 0.05,
      });
  });

  const outAnimation = contextSafe(() => {
    if (tlRef.current) tlRef.current.kill();

    tlRef.current = gsap.timeline();

    tlRef.current
      .to(txtRef.current, {
        top: "100%",
        yPercent: "0",
        duration: 0.1,
      })
      .to(btnRef.current, {
        width: "100%",
        height: "100%",
        duration: 0.7,
        ease: "power3.out",
      });
  });

  const containerAnimation = contextSafe(() => {
    if (containerTlRef.current) containerTlRef.current.kill();

    const w = contanerRef.current.offsetWidth;
    console.log(w);

    const nextIndex = number >= pinData.total - 1 ? 0 : number + 1;
    const ratio =
      pinData.images[nextIndex].width / pinData.images[nextIndex].height;
    console.log(ratio);

    const calculatedHeight = w / ratio;
    const conHeight = Math.min(calculatedHeight, 480) + "px";

    containerTlRef.current = gsap.timeline();

    containerTlRef.current
      .to(loaderRef.current, {
        height: "100%",
        duration: 0.5,
        onComplete: numSetter,
      })
      .to(contanerRef.current, {
        height: conHeight,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(loaderRef.current, {
        height: "0%",
        duration: 0.3,
      });
  });

  return (
    <div
      className="relative flex flex-col rounded-[10px] overflow-hidden items-center box-border max-h-120"
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
