import React from 'react'
import GlobalState from '../GlobalState'

export default function Result() {

    let [ logs ] = GlobalState.useState<Array<string>>('log', [])
    let [ succes ] = GlobalState.useState<boolean>('succes')

    return (
        <div className="results">
            <pre>
                <div className="log">{ logs.map((x,i) => <div key={i}>{x}</div>)}</div>
            </pre>
            <div className={"button next " + (succes ? ' succes' : '')}>NEXT</div>
        </div>)
}
