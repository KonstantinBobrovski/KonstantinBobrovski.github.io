import gsap from "gsap";
import { memo, useEffect, useRef, useState } from "react";

import "./Bubble.css";

const Bubble = ({ color, size }) => {
  const ref = useRef();

  useEffect(() => {
    let anim;

    const Anim = () => {
      const y = getRandomNumber(
        0,
        window.screen.height - ref.current.getBoundingClientRect().height
      );
      const x = getRandomNumber(
        0,
        window.screen.width - ref.current.getBoundingClientRect().width
      );

      anim = gsap.to(ref.current, {
        x,
        y,
        stagger: 0.3,
        duration: 2,
        onComplete: () => Anim(),
      });
    };

    Anim();
    return () => {
      anim && anim.kill();
    };
  }, [document.body.clientWidth, document.body.clientHeight]);

  return (
    <div
      ref={ref}
      className="bubble"
      style={{ "--color": color, "--size": size }}
    ></div>
  );
};

export default memo(Bubble, () => true);

function getRandomNumber(low, high) {
  return Math.floor(Math.random() * (high - low)) + low;
}
