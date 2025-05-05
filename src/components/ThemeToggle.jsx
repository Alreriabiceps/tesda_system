import React, { useEffect, useState } from 'react'

const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'winter')

    useEffect(() => {
        localStorage.setItem('theme', theme)
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'winter' ? 'business' : 'winter')
    }

    return (
        <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle"
            aria-label="Toggle theme"
        >
            {theme === 'winter' ? '🌙' : '☀️'}
        </button>
    )
}

export default ThemeToggle 