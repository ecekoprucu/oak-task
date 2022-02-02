import React, {useState} from 'react';

const DataContext = React.createContext();

export const DataProvider = ({children}) => {
  const [taskData, setTaskData] = useState(() => {
    if(JSON.parse(localStorage.getItem('taskData'))) {
      return JSON.parse(localStorage.getItem('taskData'))
    }
    return (
      {
        foundation: [],
        discovery: [],
        delivery: []
      }
    )
  });

  const changeTask = (dataId, value, taskParent) => {
    setTaskData({
      ...taskData,
      [taskParent]: taskData[taskParent].map(task => task.id === dataId ? {
        ...task,
        text: value
      } : task),
    });
  };

  const addTask = (textValue, taskParent) => {
    const parentTask = taskData[taskParent];
    
    setTaskData({
      ...taskData,
      [taskParent]: [...parentTask, {
        id: parentTask[parentTask.length -1]?.id !== undefined ? parentTask[parentTask.length -1].id + 1 : 0,
        text: textValue,
        completed: false
      }],
    });
  }

  const deleteTask = (taskId, taskParent) => {
    const parentTask = taskData[taskParent];
    setTaskData({
      ...taskData,
      [taskParent] : parentTask.filter(task => task.id!==taskId)
    })
  }

  const changeTaskStatus = (taskId, taskParent, isChecked) => {
    const parentTask = taskData[taskParent];
    setTaskData({
      ...taskData,
      [taskParent] : parentTask.map(task => task.id === taskId ? {
        ...task,
        completed: isChecked,
      }: task)
    })
  }

  // TODO: Add Task Parent

  return (
    <DataContext.Provider value={{data: taskData, changeTask, addTask, deleteTask, changeTaskStatus}}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
