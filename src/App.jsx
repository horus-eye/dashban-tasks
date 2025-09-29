import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import KanbanBoard from './components/KanbanBoard';
import * as api from './api';
import Swal from 'sweetalert2';

function App() {
  const [theme, setTheme] = useState('light');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const boardRef = useRef(null);

  useEffect(() => {
    document.body.className = theme;
    document.body.classList.add('fade-in');
    const timer = setTimeout(() => document.body.classList.remove('fade-in'), 500);
    fetchTasks();
    return () => clearTimeout(timer);
  }, [theme]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await api.getTasks();
      const sortedTasks = response.data.sort((a, b) => b.id - a.id);
      setTasks(sortedTasks);
      setError(null);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError('No se pudieron cargar las tareas. Asegúrate de que el backend esté funcionando.');
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} tasks={tasks} boardRef={boardRef} />
      <div id="kanban-board-container" className="p-5">
        <KanbanBoard 
          ref={boardRef}
          theme={theme} 
          tasks={tasks} 
          fetchTasks={fetchTasks} 
          loading={loading}
          error={error}
          setTasks={setTasks}
        />
      </div>
    </div>
  );
}

export default App;
