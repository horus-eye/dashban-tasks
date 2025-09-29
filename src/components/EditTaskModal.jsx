import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditTaskModal = ({ task, isOpen, onClose, onSave, theme }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (task) {
            setTitle(task.title || '');
            setDescription(task.description || '');
        }
    }, [task]);

    const handleSave = () => {
        onSave(task.id, { title, description });
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered dialogClassName={theme === 'dark' ? 'modal-dark' : ''}>
            <Modal.Header closeButton className={theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}>
                <Modal.Title className={theme === 'dark' ? 'text-white' : 'text-dark'}>Editar Tarea</Modal.Title>
            </Modal.Header>
            <Modal.Body className={theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label className={theme === 'dark' ? 'text-white' : 'text-dark'}>Título</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={theme === 'dark' ? 'bg-secondary text-white border-dark' : ''}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className={theme === 'dark' ? 'text-white' : 'text-dark'}>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={theme === 'dark' ? 'bg-secondary text-white border-dark' : ''}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className={theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}>
                <Button variant="secondary" onClick={onClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Guardar Cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditTaskModal;