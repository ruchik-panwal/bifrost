import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function usePinAnimation({
  contanerRef,
  btnRef,
  txtRef,
  loaderRef,
  number,
  setNumber,
  pinData,
}) {
  const tlRef = useRef();
  const containerTlRef = useRef();

  const { contextSafe } = useGSAP({ scope: contanerRef });

  const numSetter = () => {
    setNumber((prev) => (prev >= pinData.total - 1 ? 0 : prev + 1));
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
    const nextIndex = number >= pinData.total - 1 ? 0 : number + 1;
    const ratio =
      pinData.images[nextIndex].width / pinData.images[nextIndex].height;

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

  return { inAnimation, outAnimation, containerAnimation };
}