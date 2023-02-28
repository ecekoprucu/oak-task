import React, { useState, useContext, useEffect } from "react";
import CheckItem from "./CheckItem";
import DataContext from "../context/dataContext";
import { FaPlus, FaCheck, FaTimes } from "react-icons/fa";

import "../styles/CheckList.css";

const CheckList = () => {
  const { data, addTask } = useContext(DataContext);
  const [addTaskMode, setAddTaskMode] = useState(false);
  const [newTaskInput, setNewTaskInput] = useState({
    parent: "foundation",
    text: "",
  });

  const [fact, setFact] = useState("");

  const [isPartComplete, setIsPartComplete] = useState({
    foundation:
      data.foundation.every(task => task.completed === true) &&
      data.foundation.length > 0,
    discovery:
      data.discovery.every(task => task.completed === true) &&
      data.discovery.length > 0,
    delivery:
      data.delivery.every(task => task.completed === true) &&
      data.delivery.length > 0,
  });

  useEffect(() => {
    setIsPartComplete({
      foundation:
        data.foundation.every(task => task.completed === true) &&
        data.foundation.length > 0,
      discovery:
        data.discovery.every(task => task.completed === true) &&
        data.discovery.length > 0,
      delivery:
        data.delivery.every(task => task.completed === true) &&
        data.delivery.length > 0,
    });
    localStorage.setItem("taskData", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    if (
      isPartComplete.foundation &&
      isPartComplete.discovery &&
      isPartComplete.delivery
    ) {
      fetch("https://api.quotable.io/random")
        .then(res => res.json())
        .then(data => setFact(data.content));
    }
  }, [
    isPartComplete.foundation,
    isPartComplete.discovery,
    isPartComplete.delivery,
  ]);

  const handleSaveTask = () => {
    if (newTaskInput.text.length === 0) {
      alert("Please write some text");
      return false;
    }

    addTask(newTaskInput.text, newTaskInput.parent);
    setAddTaskMode(false);

    setNewTaskInput({
      parent: "foundation",
      text: "",
    });
  };
  return (
    <div>
      {fact?.length > 0 ? (
        <p>{fact}</p>
      ) : (
        <div className="documentBody">
          {Object.keys(data).map((taskData, index) => {
            return (
              <div className="task-header" key={`header-${taskData}-${index}`}>
                <h3>{taskData[0].toUpperCase() + taskData.slice(1)}</h3>
                {data[taskData].map(task => {
                  return (
                    <CheckItem
                      completeStatuses={isPartComplete}
                      task={task}
                      taskParent={taskData}
                      key={task.id}
                    />
                  );
                })}
              </div>
            );
          })}
          {!addTaskMode ? (
            <div
              className="add-task-wrapper"
              data-testid="addTask-button-wrapper">
              <button
                className="add-task"
                data-testid="add-task"
                onClick={() => setAddTaskMode(true)}>
                <FaPlus />
              </button>
            </div>
          ) : (
            <div className="addTask-area" data-testid="addTask-area">
              <input
                type="text"
                value={newTaskInput.text}
                data-testid="addTask-input"
                onChange={e =>
                  setNewTaskInput({
                    ...newTaskInput,
                    text: e.target.value,
                  })
                }
              />
              <select
                data-testid="addTask-select"
                onChange={e =>
                  setNewTaskInput({
                    ...newTaskInput,
                    parent: e.target.value,
                  })
                }>
                {Object.keys(data).map((parentTitle, index) => {
                  return (
                    <option
                      data-testid="addTask-option"
                      value={parentTitle}
                      key={`parentTitle-${index}`}>
                      {parentTitle}
                    </option>
                  );
                })}
              </select>
              <button
                className="save-task"
                data-testid="addTask-saveTaskButton"
                onClick={handleSaveTask}>
                <FaCheck />
              </button>
              <button
                className="cancel-task"
                onClick={() => setAddTaskMode(false)}>
                <FaTimes />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckList;
