import gsap from "gsap";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./App.css";
import { Header } from "./const";
import usePrevious from "./hooks/usePrevValue";

function App() {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const lettersRef = useRef();
  const maintTextRef = useRef();

  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,

    width: window.innerWidth,
  });

  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,

        width: window.innerWidth,
      });
    }
    window.addEventListener("resize", handleResize);
    document.getElementsByTagName("title")[0].innerHTML = "Мотивационно писмо";

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useLayoutEffect(() => {
    [...lettersRef.current.children]
      .filter((el) => {
        return el.textContent != "  " && el.textContent != " ";
      })
      .forEach((el, i) => {
        let ii = i;

        el.addEventListener("click", () => {
          setCurrentTabIndex(ii);
        });
      });
  }, []);

  useLayoutEffect(() => {
    console.log("mount");
    const textArea = maintTextRef.current
      .querySelector(".second-letter")
      .getBoundingClientRect();
    const letter = [...lettersRef.current.children].filter((el) => {
      return el.textContent != "  " && el.textContent != " ";
    })[currentTabIndex];
    letter.classList.add("active");

    const letterBounds = letter.getBoundingClientRect();
    const wasCapital = letter.textContent === letter.textContent.toUpperCase();
    gsap.to(letter, {
      y: textArea.y - letterBounds.y - letterBounds.height / 2 + "px",
      x: textArea.x - letterBounds.width - letterBounds.x + "px",
      onComplete: () => {
        letter.textContent = letter.textContent.toUpperCase();
      },
    });
    return () => {
      letter.classList.remove("active");
      console.log("UNmount");

      gsap.to(letter, {
        y: 0,
        x: 0,
        onComplete: () => {
          if (!wasCapital)
            letter.textContent = letter.textContent.toLowerCase();
        },
      });
    };
  }, [currentTabIndex, dimensions]);

  const textArray = [
    "з съм Константин Алексеевич Бобровский и живея на този свят 18 години, 12 от които съм в България.",
    "а сега нищо по-различно он минало годинашното писмо, май няма, дали е заради това че нищо особено не се промени или аз не обръщам внимание на промените, не знам.",
    "оите планове за бъдеще (в текущ момент от времето) са обучение в университета, кариерен ръст до middle developer в рамките на 1-2 години, и помежду другото може би частни уроци по програмиране, които евентуално да станат бизнес.",
    "свен тези по-стандартни и материални планове все още искам да чета повече литература и най-накрая да почна активно да тренирам.",
    "оворенето е лесно, но се надявам че вече този път вече ще го направя.",
    "  освен това не би било лошо да намеря още няколко интереса и да разбера поне базови принципи на дизайна.",
    " ипичното ми ежедневие представлява търсене на поръчки за работа, диалози с индийци и малко игри с кода.",
    "х, това е прекрасно, нали?",
    "акто и да е, не се оплаквам.",
    "  стигнахме вече до епилога без да минаваме през кулминация, както във всеки зле режесиран филм.",
    "лушайки песен за човека, не се и надявам да бъда вписан в пожълтелите страници на историйкaта.",
    "квилибристичните ми умения делегиращи ми ролята на джокер не ми забраняват и аз да имам копнеж за едрите звезди над Фамагуста.",
    "Епитафията ми не ще написана на камък в храсталаците, ще издълбана в глава и блясък на моите следци.",
    " аз се радвам, че не съм Вапцаров, пишещ за Ботев, не казвам «Н е  м о г а!», а казвам «зная свойто място в живота и напразно няма да се дам».",
  ];

  return (
    <section className="App">
      <header>
        <h1 ref={lettersRef}>{Spainfy([...Header])}</h1>
        <h2>By: Константин Бобровский</h2>
      </header>
      <main className="main-text">
        <p ref={maintTextRef} className="main-text-inner">
          {NormalizeText(textArray[currentTabIndex])}
        </p>
      </main>
    </section>
  );
}

function NormalizeText(str) {
  const firstLetter = <span className="second-letter">{str[0]}</span>;
  const rest = [...str].filter((_, i) => i !== 0).join("");
  return [firstLetter, rest];
}
function Spainfy(str) {
  return [...str].map((el, i) =>
    React.createElement("button", {
      className: `header-button ${el !== " " ? "" : "empty"}`,
      role: "button",
      key: i,
      children: [el],
    })
  );
}

export default App;
