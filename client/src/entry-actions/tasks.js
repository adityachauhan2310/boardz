import EntryActionTypes from '../constants/EntryActionTypes';

const createTask = (taskListId, data) => ({
  type: EntryActionTypes.TASK_CREATE,
  payload: {
    taskListId,
    data,
  },
});

const handleTaskCreate = (task) => ({
  type: EntryActionTypes.TASK_CREATE_HANDLE,
  payload: {
    task,
  },
});

const updateTask = (id, data) => ({
  type: EntryActionTypes.TASK_UPDATE,
  payload: {
    id,
    data,
  },
});

const handleTaskUpdate = (task) => ({
  type: EntryActionTypes.TASK_UPDATE_HANDLE,
  payload: {
    task,
  },
});

const moveTask = (id, taskListId, index) => ({
  type: EntryActionTypes.TASK_MOVE,
  payload: {
    id,
    taskListId,
    index,
  },
});

const deleteTask = (id) => ({
  type: EntryActionTypes.TASK_DELETE,
  payload: {
    id,
  },
});

const handleTaskDelete = (task) => ({
  type: EntryActionTypes.TASK_DELETE_HANDLE,
  payload: {
    task,
  },
});

export default {
  createTask,
  handleTaskCreate,
  updateTask,
  handleTaskUpdate,
  moveTask,
  deleteTask,
  handleTaskDelete,
};
