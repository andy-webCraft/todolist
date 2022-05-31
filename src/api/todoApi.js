import { TodoistApi } from "@doist/todoist-api-typescript";

const api = new TodoistApi("cc6c56d0d10d7f3858e8bc635faea2e145ce2ef3");

export const todoAPI = {
  getTodoLists() {
    return api.getProjects();
  },
  addTodoList(todoListTitle) {
    return api.addProject({ name: todoListTitle });
  },
  updateTodoListTitle(todoListID, todoListTitle) {
    return api.updateProject(todoListID, { name: todoListTitle });
  },
  deleteTodoList(todoListID) {
    return api.deleteProject(todoListID);
  },
  getTasks(todoListID) {
    return api.getTasks({ project_id: todoListID });
  },
  addTask(todoListID, taskTitle) {
    return api.addTask({ project_id: todoListID, content: taskTitle });
  },
  updateTask(taskID, task) {
    return api.updateTask(taskID, { task });
  },
  closeTask(taskID) {
    return api.closeTask(taskID);
  },
  reopenTask(taskID) {
    return api.reopenTask(taskID);
  },
  deleteTask(taskID) {
    return api.deleteTask(taskID);
  },
};
