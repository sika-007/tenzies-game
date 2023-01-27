import React, {useState} from "react"

export default function DieComponent(props) {

    function diePattern(value) {
        if (value === 1) {
            return (
                <div className="dice one-dice">
                    <div className="first-dot"></div>
                </div>
            )
        } else if (value === 2) {
            return (
                <div className="dice two-dice">
                    <div className="first-dot"></div>
                    <div className="second-dot"></div>
                </div>
            )
        } else if (value === 3) {
            return (
                <div className="dice three-dice">
                    <div className="first-dot"></div>
                    <div className="second-dot"></div>
                    <div className="third-dot"></div>
                </div>
            )
        } else if (value === 4) {
            return (
                <div className="dice four-dice">
                    <div className="first-dot"></div>
                    <div className="second-dot"></div>
                    <div className="third-dot"></div>
                    <div className="fourth-dot"></div>
                </div>
            )
        } else if (value === 5) {
            return (
                <div className="dice five-dice">
                    <div className="first-dot"></div>
                    <div className="second-dot"></div>
                    <div className="third-dot"></div>
                    <div className="fourth-dot"></div>
                    <div className="fifth-dot"></div>
                </div>
            )
        }   else if (value === 6) {
            return (
                <div className="dice six-dice">
                    <div className="first-dot"></div>
                    <div className="second-dot"></div>
                    <div className="third-dot"></div>
                    <div className="fourth-dot"></div>
                    <div className="fifth-dot"></div>
                    <div className="sixth-dot"></div>
                </div>
            )
        }
    }

    const style = {
        backgroundColor: props.isHeld ? "#59E391" : "#ffffff"
    }

    return(
        <div className="die-component" style={style} onClick={props.holdDice}>
            <div className="die-container">{diePattern(props.value)}</div>
        </div>
    )
}