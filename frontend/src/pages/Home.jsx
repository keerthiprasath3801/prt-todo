import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';


const Home = () => {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        completed: false
    });
    const [isEditing, setIsEditing] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
        fetchTasks();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    const fetchTasks = async () => {
        try {
            const response = await fetch("http://localhost:5000/auth/tasks", {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log("Sending token:", localStorage.getItem('token'));

            const result = await response.json();
            if (response.ok) {
                setTasks(result);
            } else {
                handleError(result.message || 'Failed to fetch tasks');
            }
        } catch (err) {
            handleError(err.message || 'Failed to fetch tasks');
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewTask({
            ...newTask,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:5000/auth/tasks";
            const method = isEditing ? 'PUT' : 'POST';
            const endpoint = isEditing ? `${url}/${currentTaskId}` : url;

            const response = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(newTask)
            });

            const result = await response.json();
            if (response.ok) {
                handleSuccess(isEditing ? 'Task updated successfully' : 'Task added successfully');
                fetchTasks();
                setNewTask({ title: '', description: '', completed: false });
                setIsEditing(false);
                setCurrentTaskId(null);
            } else {
                handleError(result.message || 'Operation failed');
            }
        } catch (err) {
            handleError(err.message || 'Operation failed');
        }
    };

    const handleEdit = (task) => {
        setNewTask({
            title: task.title,
            description: task.description,
            completed: task.completed
        });
        setIsEditing(true);
        setCurrentTaskId(task._id);
    };

    const handleDelete = async (taskId) => {
        try {
            const response = await fetch(`http://localhost:5000/auth/tasks/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                handleSuccess('Task deleted successfully');
                fetchTasks();
            } else {
                const result = await response.json();
                handleError(result.message || 'Failed to delete task');
            }
        } catch (err) {
            handleError(err.message || 'Failed to delete task');
        }
    };

    const toggleTaskStatus = async (taskId, currentStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/auth/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ completed: !currentStatus })
            });

            if (response.ok) {
                handleSuccess('Task status updated');
                fetchTasks();
            } else {
                const result = await response.json();
                handleError(result.message || 'Failed to update task status');
            }
        } catch (err) {
            handleError(err.message || 'Failed to update task status');
        }
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <div className="logo">TASK MANAGER</div>
                <div className="user-actions">
                    <span className="username">Welcome, {loggedInUser}</span>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
            </header>

            <main className="task-manager">
                <section className="task-form-section">
                    <h2>{isEditing ? 'Edit Task' : 'Add New Task'}</h2>
                    <form onSubmit={handleSubmit} className="task-form">
                        <div className="form-group">
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={newTask.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                name="description"
                                value={newTask.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group checkbox-group">
                            <input
                                type="checkbox"
                                id="completed"
                                name="completed"
                                checked={newTask.completed}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="completed">Completed</label>
                        </div>
                        <button type="submit" className="submit-btn">
                            {isEditing ? 'Update Task' : 'Add Task'}
                        </button>
                        {isEditing && (
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => {
                                    setIsEditing(false);
                                    setNewTask({ title: '', description: '', completed: false });
                                }}
                            >
                                Cancel
                            </button>
                        )}
                    </form>
                </section>

                <section className="task-list-section">
                    <h2>Your Tasks</h2>
                    {tasks.length > 0 ? (
                        <div className="task-list">
                            {tasks.map((task) => (
                                <div key={task._id} className={`task-card ${task.completed ? 'completed' : ''}`}>
                                    <div className="task-content">
                                        <h3>{task.title}</h3>
                                        <p>{task.description}</p>
                                        <div className="task-meta">
                                            <span className="task-status">
                                                Status: {task.completed ? 'Completed' : 'Pending'}
                                            </span>
                                            <span className="task-date">
                                                Created: {new Date(task.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="task-actions">
                                        <button
                                            onClick={() => toggleTaskStatus(task._id, task.completed)}
                                            className={`status-btn ${task.completed ? 'complete' : 'incomplete'}`}
                                        >
                                            {task.completed ? 'Mark Pending' : 'Mark Complete'}
                                        </button>
                                        <button
                                            onClick={() => handleEdit(task)}
                                            className="edit-btn"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(task._id)}
                                            className="delete-btn"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="no-tasks">No tasks found. Add a new task to get started!</p>
                    )}
                </section>
            </main>
            
            <ToastContainer />
        </div>
    );
};

export default Home;