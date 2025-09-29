import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import KanbanColumn from './KanbanColumn';
import AddTaskForm from './AddTaskForm';
import EditTaskModal from './EditTaskModal';
import * as api from '../api';

const KanbanBoard = forwardRef(({ theme, tasks, fetchTasks, loading, error, setTasks }, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [animationState, setAnimationState] = useState({});

    const columnRefs = {
        'To Do': useRef(null),
        'In Progress': useRef(null),
        'Done': useRef(null),
    };

    useImperativeHandle(ref, () => ({
        scrollToColumn: (status) => {
            columnRefs[status].current.scrollIntoView({ behavior: 'smooth' });
        }
    }));

    const handleTaskAdd = async (taskData) => {
        try {
            await api.createTask(taskData);
            fetchTasks();
            Swal.fire('¡Éxito!', 'Tarea creada correctamente.', 'success');
        } catch (error) {
            console.error("Error creating task:", error);
            Swal.fire('Error', 'No se pudo crear la tarea.', 'error');
        }
    };

    const handleTaskUpdate = async (taskId, taskData) => {
        try {
            await api.updateTask(taskId, taskData);
            fetchTasks();
            closeModal();
            Swal.fire('¡Éxito!', 'Tarea actualizada correctamente.', 'success');
        } catch (error) {
            console.error("Error updating task:", error);
            Swal.fire('Error', 'No se pudo actualizar la tarea.', 'error');
        }
    };

    const handleTaskDelete = async (taskId) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, ¡bórrala!',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await api.deleteTask(taskId);
                    fetchTasks();
                    Swal.fire('¡Borrada!', 'La tarea ha sido eliminada.', 'success');
                } catch (error) {
                    console.error("Error deleting task:", error);
                    Swal.fire('Error', 'No se pudo eliminar la tarea.', 'error');
                }
            }
        });
    };
    
    const handleTaskMove = async (task, newStatus) => {
        const oldStatus = task.status;
        const tasksInNewColumn = tasks.filter(t => t.status === newStatus);
        const newOrder = tasksInNewColumn.length > 0 ? Math.max(...tasksInNewColumn.map(t => t.task_order)) + 1 : 1;

        const animationClass = newStatus > oldStatus ? 'slide-out-left' : 'slide-out-right';
        setAnimationState({ ...animationState, [task.id]: animationClass });

        setTimeout(async () => {
            try {
                await api.moveTask(task.id, { newStatus, newOrder, oldStatus, oldOrder: task.task_order });
                fetchTasks(); 
            } catch (error) {
                console.error("Error moving task:", error);
                Swal.fire('Error', 'No se pudo mover la tarea.', 'error');
            } finally {
                setTimeout(() => setAnimationState(prev => ({...prev, [task.id]: ''})), 500);
            }
        }, 500); 
    };

    const openModal = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setEditingTask(null);
        setIsModalOpen(false);
    };

    const columns = ['To Do', 'In Progress', 'Done'];

    return (
        <Container className="py-4">
            <Row className="justify-content-center mb-4">
                <Col md={8} lg={6}>
                    <AddTaskForm onTaskAdd={handleTaskAdd} theme={theme} />
                </Col>
            </Row>
            
            {error && (
                <Row className="justify-content-center mb-4">
                    <Col md={8} lg={6}>
                        <Alert variant="danger">{error}</Alert>
                    </Col>
                </Row>
            )}

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status" className={theme === 'dark' ? 'text-light' : ''}>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <p className={theme === 'dark' ? 'text-light' : ''}>Loading tasks...</p>
                </div>
            ) : (
                <Row>
                    {columns.map(status => (
                        <Col key={status} md={4} className="mb-4" ref={columnRefs[status]}>
                            <KanbanColumn 
                                title={status}
                                tasks={tasks.filter(task => task.status === status)}
                                onEdit={openModal}
                                onDelete={handleTaskDelete}
                                onMove={handleTaskMove}
                                theme={theme}
                                animationState={animationState}
                            />
                        </Col>
                    ))}
                </Row>
            )}

            <EditTaskModal 
                isOpen={isModalOpen}
                onClose={closeModal}
                onSave={handleTaskUpdate}
                task={editingTask}
                theme={theme}
            />
        </Container>
    );
});

export default KanbanBoard;