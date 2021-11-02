import React from 'react'
import GlobalState from '../GlobalState'

export default function Result() {

    let [ logs ] = GlobalState.useState<Array<string>>('log', [])
    let [ succes ] = GlobalState.useState<boolean>('succes')

    return (
        <div className="results">
            <div className="log">{ logs.map((x,i) => <div key={i}>{x}</div>)}</div>
            <div className={"button next " + (succes ? ' succes' : '')}>NEXT</div>
        </div>)
}
