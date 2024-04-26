import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

function DarkModeToggle() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Load the saved dark mode setting at startup
    useEffect(() => {
        const savedIsDarkMode = localStorage.getItem('isDarkMode') === 'true';
        setIsDarkMode(savedIsDarkMode);
        if (savedIsDarkMode) {
            document.body.classList.add('dark-mode');
        }
    }, []);

    const toggleDarkMode = () => {
        const newIsDarkMode = !isDarkMode;
        setIsDarkMode(newIsDarkMode);
        localStorage.setItem('isDarkMode', newIsDarkMode.toString());
        document.body.classList.toggle('dark-mode');
    };

    return (
        <div className="dark-mode-toggle">
            {isDarkMode ? (
                <FaSun className="text-amber-500" onClick={toggleDarkMode} />
            ) : (
                <FaMoon className="text-slate-800" onClick={toggleDarkMode} />
            )}
        </div>
    );
}

export default DarkModeToggle;