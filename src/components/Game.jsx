import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Button from "./Button";
import Die from "./Die";
import Confetti from "react-confetti";
const Game = () => {
  const [flourDimensions, setflourDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  useEffect(() => {
    const resizeWindow = () => {
      setflourDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  });
  const newDice = () => {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  };
  const generateRandomNumber = () => {
    let arr = [];
    for (let i = 1; i <= 10; i++) {
      arr.push(newDice());
    }
    return arr;
  };
  const holdDie = (id) => {
    setRandomDie((prevDie) =>
      prevDie.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  };
  const [randomDie, setRandomDie] = useState(generateRandomNumber());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = randomDie.every((die) => die.isHeld);
    const firstValue = randomDie[0].value;
    const allSameValue = randomDie.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [randomDie]);

  const randomElement = randomDie.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDie={() => holdDie(die.id)}
    />
  ));

  const generateDice = () => {
    if (!tenzies) {
      setRandomDie((prevDice) =>
        prevDice.map((die) => {
          return die.isHeld ? die : newDice();
        })
      );
    } else {
      setTenzies(false);
      setRandomDie(generateRandomNumber());
    }
  };
  return (
    <>
      {tenzies && (
        <Confetti
          width={flourDimensions.width}
          height={flourDimensions.height}
        />
      )}
      <div className="bg-[#F5F5F5] h-[400px] w-[600px] mx-auto container rounded-md flex gap-6 flex-col justify-center items-center">
        <div className="w-2/5 text-center">
          <h2 className="font-bold text-3xl text-[#2B283A] mb-4">Tenzies</h2>
          <p className="text-[#4A4E74] text-sm">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
        </div>
        <div className="grid grid-cols-5 gap-5">{randomElement}</div>
        <Button generateDie={generateDice} tenzies={tenzies} />
      </div>
    </>
  );
};

export default Game;
