import React, {useState, useEffect} from "react"
import DieComponent from "../components/DieComponent"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"


export default function App () {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

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
      console.log("Game won")
    } else {
      setTenzies(false)
      console.log("keep playing")
    }
  }, [dice])

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
  }

  function newGame() {
    setDice(allNewDice)
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
          <button className="roll-btn" onClick={roll}><p>roll</p></button>}
      </div>
    </main>
  )
}

