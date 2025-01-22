import React from 'react'

export default function Stars({ stars }) {
    const half1 = Math.floor(new Date().valueOf() * Math.random())
    const half2 = Math.floor(new Date().valueOf() * Math.random())
    const half3 = Math.floor(new Date().valueOf() * Math.random())
    const half4 = Math.floor(new Date().valueOf() * Math.random())
    const half5 = Math.floor(new Date().valueOf() * Math.random())

    return (
        <div className="stars">
            <svg style={{ display: "none" }}>
                <defs>
                    <symbol viewBox="0 0 32 32" id="star">
                        <path d="M31.547 12a.848.848 0 00-.677-.577l-9.427-1.376-4.224-8.532a.847.847 0 00-1.516 0l-4.218 8.534-9.427 1.355a.847.847 0 00-.467 1.467l6.823 6.664-1.612 9.375a.847.847 0 001.23.893l8.428-4.434 8.432 4.432a.847.847 0 001.229-.894l-1.615-9.373 6.822-6.665a.845.845 0 00.214-.869z" />
                    </symbol>
                </defs>
            </svg>
            <svg class="c-icon" width="14" height="14" viewBox="0 0 32 32">
                <use href="#star" fill={`url(#${half1})`}></use>
                <defs>
                    <linearGradient id={half1} x1="0" x2="100%" y1="0" y2="0">
                        <stop offset="50%" stop-color={stars >= 0.1 ? "#E50000" : "#f3f3f3a3"}></stop>
                        <stop offset="50%" stop-color={stars >= 1.1 ? "#E50000" : "#f3f3f3a3"}></stop>
                    </linearGradient>
                </defs>
            </svg>
            <svg class="c-icon" width="14" height="14" viewBox="0 0 32 32">
                <use href="#star" fill={`url(#${half2})`}></use>
                <defs>
                    <linearGradient id={half2} x1="0" x2="100%" y1="0" y2="0">
                        <stop offset="50%" stop-color={stars >= 2.1 ? "#E50000" : "#f3f3f3a3"}></stop>
                        <stop offset="50%" stop-color={stars >= 3.1 ? "#E50000" : "#f3f3f3a3"}></stop>
                    </linearGradient>
                </defs>
            </svg>
            <svg class="c-icon" width="14" height="14" viewBox="0 0 32 32">
                <use href="#star" fill={`url(#${half3})`}></use>
                <defs>
                    <linearGradient id={half3} x1="0" x2="100%" y1="0" y2="0">
                        <stop offset="50%" stop-color={stars >= 4.1 ? "#E50000" : "#f3f3f3a3"}></stop>
                        <stop offset="50%" stop-color={stars >= 5.1 ? "#E50000" : "#f3f3f3a3"}></stop>
                    </linearGradient>
                </defs>
            </svg>
            <svg class="c-icon" width="14" height="14" viewBox="0 0 32 32">
                <use href="#star" fill={`url(#${half4})`}></use>
                <defs>
                    <linearGradient id={half4} x1="0" x2="100%" y1="0" y2="0">
                        <stop offset="50%" stop-color={stars >= 6.1 ? "#E50000" : "#f3f3f3a3"}></stop>
                        <stop offset="50%" stop-color={stars >= 7.1 ? "#E50000" : "#f3f3f3a3"}></stop>
                    </linearGradient>
                </defs>
            </svg>
            <svg class="c-icon" width="14" height="14" viewBox="0 0 32 32">
                <use href="#star" fill={`url(#${half5})`}></use>
                <defs>
                    <linearGradient id={half5} x1="0" x2="100%" y1="0" y2="0">
                        <stop offset="50%" stop-color={stars >= 8.1 ? "#E50000" : "#f3f3f3a3"}></stop>
                        <stop offset="50%" stop-color={stars >= 9.1 ? "#E50000" : "#f3f3f3a3"}></stop>
                    </linearGradient>
                </defs>
            </svg>
        </div>
    )
}
