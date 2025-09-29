import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const TaskCard = ({ task, onEdit, onDelete, onMove, theme, animationClass }) => {

    return (
        <div className={`card-container ${animationClass}`}>
            <Card className={`mb-3 ${theme === 'dark' ? 'dark' : ''}`}>
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-2 gap-2">
                        <Card.Title>{task.title}</Card.Title>
                        <Badge bg="black" className={`status-badge status-${task.status.replace(/\s+/g, '-').toLowerCase()}`}>{task.status}</Badge>
                    </div>
                    <Card.Text>
                        {task.description || 'No description provided.'}
                    </Card.Text>
                    <div className="d-flex justify-content-end gap-2 mt-3">
                        <Button variant="outline-secondary" size="sm" onClick={() => onEdit(task)}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={() => onDelete(task.id)}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>
                    </div>
                    <div className="d-flex justify-content-end gap-2 mt-2">
                        {task.status === 'To Do' && (
                            <Button variant="outline-info" size="sm" onClick={() => onMove(task, 'In Progress')}>
                                Mover a In Progress
                            </Button>
                        )}
                        {task.status === 'In Progress' && (
                            <>
                                <Button variant="outline-secondary" size="sm" onClick={() => onMove(task, 'To Do')}>
                                    Mover a To Do
                                </Button>
                                <Button variant="outline-success" size="sm" onClick={() => onMove(task, 'Done')}>
                                    Mover a Done
                                </Button>
                            </>
                        )}
                        {task.status === 'Done' && (
                            <Button variant="outline-warning" size="sm" onClick={() => onMove(task, 'In Progress')}>
                                Mover a In Progress
                            </Button>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default TaskCard;