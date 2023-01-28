import React, {useState, useEffect} from "react"
import DieComponent from "../components/DieComponent"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"


export default function App () {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [rollCount, setRollCount] = useState(0)
  const [timerStatus, setTimerStatus] = useState(false)
  const [centiseconds, setCentiseconds] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [bestTime, setBestTime] = useState(JSON.parse(localStorage.getItem("bestTime")) || "00:00")

  const time = {seconds: seconds, centiseconds: centiseconds}

  useEffect(() => {
    const winChecker=[]
    for (let i = 0; i < dice.length; i++) {
      const die = dice[i] 
      if (die.isHeld) {
        winChecker.push(die.randNum)
      }
    }

    if (winChecker.length === 10 && winChecker.every(currentNum => currentNum === winChecker[0])) {
      setTenzies(true)
      setTimerStatus(false)
    } else {
      setTenzies(false)
    }
  }, [dice])

  useEffect(() => {
    let interval;
    if (timerStatus) {
      interval = setInterval(() => {
        setCentiseconds((prevTime) => prevTime + 1);
      }, 10);
    } else if (!timerStatus) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerStatus]);

  if (centiseconds === 99) {
    setSeconds(second => second + 1)
    setCentiseconds(0)
  }

  function generateDice() {
    return {
      randNum: Math.ceil(Math.random() * 6), 
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateDice())
    }
    return newDice 
  }

  function roll() {
    setDice(oldDice => oldDice.map(oldDie => {
      return oldDie.isHeld ? 
      oldDie : generateDice()
    }))
    setTimerStatus(true)
  }

  function diceClick() {
    setTimerStatus(true)
  }

  function increaseRollCount() {
    setRollCount(prevCount => prevCount + 1)
  }

  function newGame() {
    setDice(allNewDice)
    setRollCount(0)
    setSeconds(0)
    setCentiseconds(0)
    if (time)
    setBestTime(localStorage.setItem("bestTime", JSON.stringify(time)))
  }
  console.log(tenzies)
  function holdDice(id) {
    //console.log(id)
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  const displayTime = `${seconds < 10 ? "0"+seconds : seconds}:${centiseconds < 10 ? "0"+centiseconds : +centiseconds}`

  const diceElements = dice.map(die => (
    <DieComponent 
      value={die.randNum}
      key={die.id}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
      handleClick={diceClick}
    />
  ))

  return(
    <main className="outer-black-container">
      {tenzies && <Confetti />}
      <div className="inner-white-container">
        <h2 className="game-title">Tenzies</h2>
        <p className="game-description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {diceElements}
        </div>
        {tenzies ? 
          <button className="roll-btn" onClick={newGame}><p>New Game</p></button> :
          <button className="roll-btn" onClick={() => {
            roll();
            increaseRollCount();
          }}><p>roll</p></button>}
          <p className="roll-count">Number of Rolls: {rollCount}</p>
          <p>Time: {displayTime}</p>
          <p>Best time: {bestTime}</p>
      </div>
    </main>
  )
}

