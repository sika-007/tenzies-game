import React, {useState} from "react"

export default function DieComponent(props) {
    const style = {
        backgroundColor: props.isHeld ? "#59E391" : "#ffffff"
    }

    return(
        <div className="die-component" style={style} onClick={props.holdDice}>
            <p className="random-number">{props.value}</p>
        </div>
    )
}