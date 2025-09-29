import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AddTaskForm = ({ onTaskAdd, theme }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        
        onTaskAdd({ title, description, board_id: 1 });
        
        setTitle('');
        setDescription('');
    };

    return (
        <Card className={theme === 'dark' ? 'bg-dark text-white border-secondary' : 'bg-light text-dark'}>
            <Card.Body>
                <Card.Title className={theme === 'dark' ? 'text-white' : 'text-dark'}>Añadir Nueva Tarea</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Título de la tarea"
                            required
                            className={theme === 'dark' ? 'bg-secondary text-white border-dark' : ''}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            as="textarea"
                            rows={2}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Descripción (opcional)"
                            className={theme === 'dark' ? 'bg-secondary text-white border-dark' : ''}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                        <FontAwesomeIcon icon={faPlus} className="me-2" /> Añadir Tarea
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default AddTaskForm;