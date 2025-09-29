import React from 'react';
import { Card } from 'react-bootstrap';
import TaskCard from './TaskCard';

const KanbanColumn = ({ title, tasks, onEdit, onDelete, onMove, theme, animationState }) => {
    return (
        <Card className={theme === 'dark' ? 'bg-dark text-white border-secondary' : 'bg-light text-dark'}>
            <Card.Header className="text-center">
                <h4 className={theme === 'dark' ? 'text-white' : 'text-dark'}>{title}</h4>
            </Card.Header>
            <Card.Body className="p-3 task-list" style={{ minHeight: '200px' }}>
                {tasks.length === 0 ? (
                    <p className={`text-center ${theme === 'dark' ? 'text-white-50' : 'text-muted'}`}>No hay tareas en esta columna.</p>
                ) : (
                    tasks.map(task => (
                        <TaskCard 
                            key={task.id} 
                            task={task} 
                            onEdit={onEdit} 
                            onDelete={onDelete}
                            onMove={onMove}
                            theme={theme}
                            animationClass={animationState ? animationState[task.id] : ''}
                        />
                    ))
                )}
            </Card.Body>
        </Card>
    );
};

export default KanbanColumn;