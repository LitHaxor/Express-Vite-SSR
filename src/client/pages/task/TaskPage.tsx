import React, { useState, useEffect } from "react";
import axios from "axios";
import { TaskEntity } from "src/entitiy/task.entity";
import TaskEditor, { TaskDto } from "../../components/task/TaskEditor";

const TaskPage = () => {
  const [tasks, setTasks] = useState<TaskEntity[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [initialValues, setInitialValues] = useState<TaskDto | null>(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const getUserToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  };

  useEffect(() => {
    if (getUserToken()) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${getUserToken()}`;
    } else if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = async (taskData: TaskDto) => {
    try {
      const { data, status } = await axios.post("/api/tasks", taskData);

      if (status === 201) {
        setTasks([...tasks, data]);
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error adding task:", error);
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.message;
        if (message) {
          setErr(message);
        } else {
          setErr("An error occurred");
        }
      }
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      const { status } = await axios.delete(`/api/tasks/${id}`);
      if (status === 204) {
        setTasks(tasks.filter((task) => task.id !== id));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdateTask = async (taskData: TaskDto) => {
    try {
      const { status } = await axios.put(`/api/tasks/${taskData.id}`, taskData);
      if (status === 200) {
        fetchTasks();
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-3xl w-[90%] md:w-full">
        {/* First Card - Container */}
        <div className="bg-gray-100 shadow-md rounded-md p-4 flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Your Tasks</h1>
          <button
            onClick={toggleModal}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            + Add Task
          </button>
        </div>
        {/* Second Card - Task Mapper */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tasks.length === 0 ? (
            <div className="bg-white shadow-md rounded-md p-4 col-span-3 text-center">
              No Tasks Available
            </div>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className="bg-white shadow-md rounded-md p-4">
                <h2 className="text-2xl font-semibold mb-2">{task.title}</h2>
                <p className="text-gray-600 mb-4">{task.description}</p>
                {task.status === "not_started" ? (
                  <span className="bg-red-500 text-white font-semibold py-1 px-2 rounded-md">
                    Not Started
                  </span>
                ) : (
                  <span className="bg-green-500 text-white font-semibold py-1 px-2 rounded-md">
                    Completed
                  </span>
                )}
                <div className="text-sm font-bold text-teal-300 my-4">
                  <p className="text-gray-500">
                    Created At: {new Date(task.createdAt).toLocaleString()}
                  </p>

                  <p>
                    Last Updated At: {new Date(task.updatedAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={(e) => {
                      setInitialValues({
                        id: task.id,
                        title: task.title,
                        description: task.description,
                        status: task.status as any,
                      });
                      toggleModal();
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleDeleteTask(task.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
          {showModal && (
            <TaskEditor
              initialValues={initialValues}
              onCancel={toggleModal}
              onSubmit={handleAddTask}
              onUpdate={handleUpdateTask}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
