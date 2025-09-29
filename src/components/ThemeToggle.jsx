import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const ThemeToggle = ({ theme, toggleTheme }) => {
    return (
        <Button 
            onClick={toggleTheme}
            className={`theme-toggle-btn ${theme === 'dark' ? 'bg-secondary' : 'bg-light'}`}>
            <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} className={theme === 'dark' ? 'text-white-50' : 'text-dark'} />
        </Button>
    );
};

export default ThemeToggle;