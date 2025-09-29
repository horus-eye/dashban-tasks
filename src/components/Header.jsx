import React from 'react';
import { Navbar, Container, Badge, Dropdown } from 'react-bootstrap';
import ThemeToggle from './ThemeToggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck, faFilter } from '@fortawesome/free-solid-svg-icons';

const Header = ({ theme, toggleTheme, tasks, boardRef }) => {
    const statusCounts = {
        'To Do': tasks.filter(task => task.status === 'To Do').length,
        'In Progress': tasks.filter(task => task.status === 'In Progress').length,
        'Done': tasks.filter(task => task.status === 'Done').length,
    };

    const statusColors = {
        'To Do': 'primary',
        'In Progress': 'warning',
        'Done': 'success',
    };

    const handleStatusClick = (status) => {
        if (boardRef.current) {
            boardRef.current.scrollToColumn(status);
        }
    };

    return (
        <Navbar bg={theme === 'dark' ? 'dark' : 'light'} variant={theme === 'dark' ? 'dark' : 'light'} expand="lg" className="shadow-sm">
            <Container>
                <Navbar.Brand href="#" className={theme === 'dark' ? 'text-white' : 'text-dark'}>
                    <FontAwesomeIcon icon={faClipboardCheck} className="me-2" />
                    Tablero Kanban
                </Navbar.Brand>
                <Dropdown>
                    <Dropdown.Toggle variant={theme === 'dark' ? 'outline-light' : 'outline-dark'} id="dropdown-basic">
                        <FontAwesomeIcon icon={faFilter} className="me-2" />
                        Status
                    </Dropdown.Toggle>

                    <Dropdown.Menu variant={theme === 'dark' ? 'dark' : 'light'} className="status-dropdown">
                        {Object.entries(statusCounts).map(([status, count]) => (
                            <Dropdown.Item key={status} onClick={() => handleStatusClick(status)} className="d-flex justify-content-between align-items-center">
                                <div>
                                    <Badge pill bg={statusColors[status]} className="me-2">
                                        {count}
                                    </Badge>
                                    {status}
                                </div>
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </Container>
        </Navbar>
    );
};

export default Header;