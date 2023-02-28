/* eslint-disable react/prop-types */
import React, { useState, useContext } from "react";
import DataContext from "../context/dataContext";
import { FaTrash, FaPen, FaCheck } from "react-icons/fa";
import "../styles/CheckItem.css";
const CheckItem = ({ task, taskParent, completeStatuses }) => {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState(task.text);
  const { changeTask, deleteTask, changeTaskStatus } = useContext(DataContext);
  const handleEdit = (type, taskId, taskText, taskParent) => {
    switch (type) {
      case "edit":
        setShowInput(true);
        break;
      case "send":
        changeTask(taskId, taskText, taskParent);
        setShowInput(false);
        break;
      default:
        break;
    }
  };
  const checkDisabled = () => {
    switch (taskParent) {
      case "foundation":
        return false;
      case "discovery":
        return !completeStatuses.foundation;
      case "delivery":
        return !completeStatuses.discovery;
      default:
        break;
    }
  };
  return (
    <div className="task-item">
      <div>
        {!showInput ? (
          <div>
            <input
              type="checkbox"
              disabled={checkDisabled()}
              name="task"
              checked={task.completed}
              onChange={e =>
                changeTaskStatus(task.id, taskParent, e.target.checked)
              }
            />
            <label
              htmlFor="task"
              className={task.completed ? "completed" : "uncompleted"}>
              {task.text}
            </label>
          </div>
        ) : (
          <input
            type="text"
            data-testid="editTask-input"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
        )}
      </div>
      <div>
        <button
          data-testid="editTask-button"
          onClick={() =>
            handleEdit(
              !showInput ? "edit" : "send",
              task.id,
              inputValue,
              taskParent,
            )
          }>
          {!showInput ? <FaPen /> : <FaCheck />}
        </button>
        <button
          data-testid="deleteTask-button"
          onClick={() => deleteTask(task.id, taskParent)}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CheckItem;
