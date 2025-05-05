import React, { useEffect, useState } from 'react'

const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'valentine')

    useEffect(() => {
        localStorage.setItem('theme', theme)
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'valentine' ? 'coffee' : 'valentine')
    }

    return (
        <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle"
            aria-label="Toggle theme"
        >
            {theme === 'valentine' ? '🌙' : '☀️'}
        </button>
    )
}

export default ThemeToggle 