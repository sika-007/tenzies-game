import React, {useState, useEffect} from "react"
import DieComponent from "../components/DieComponent"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"


export default function App () {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [rollCount, setRollCount] = useState(0)
  const [shouldTimeRun, setShouldTimeRun] = useState(false)
  const [milliseconds, setMilliseconds] = useState(0)
  const [seconds, setSeconds] = useState(0)
  
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
      setShouldTimeRun(false)
      console.log("Game won")
    } else {
      setTenzies(false)
      console.log("keep playing")
    }
  }, [dice])

  function timerLogic() {
      setMilliseconds(prevMilSec => prevMilSec + 1)
      if (milliseconds >= 999) {
        setSeconds(prevSec => prevSec + 1)
        setMilliseconds(0)
      }
  }

  useEffect(()=>{
    const interval = shouldTimeRun && setInterval(timerLogic, 1000)
  }, [shouldTimeRun])


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
    setShouldTimeRun(true)
    
  }

  function increaseRollCount() {
    setRollCount(prevCount => prevCount + 1)
  }

  function newGame() {
    setDice(allNewDice)
    setRollCount(0)
  }

  function holdDice(id) {
    //console.log(id)
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  const diceElements = dice.map(die => (
    <DieComponent 
      value={die.randNum}
      key={die.id}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
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
          <p>Time: {`${seconds < 10 ? "0"+seconds : seconds}:${milliseconds < 100 ? milliseconds < 10 ? "00"+milliseconds : "0"+milliseconds : milliseconds}`}</p>
      </div>
    </main>
  )
}

