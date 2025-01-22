import React from 'react'

export default function Description({text}) {
    return (
        <div className="box description">
            <h3>Description</h3>
            <p>{text}</p>
        </div>
    )
}
