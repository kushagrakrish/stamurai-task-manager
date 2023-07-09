import { types, applySnapshot } from "mobx-state-tree";

export const Task = types
  .model("Task", {
    id: types.identifier,
    title: types.string,
    description: types.string,
    status: types.string,
  })
  .actions((self) => ({
    setTitle(title: string) {
      self.title = title;
    },
    setDescription(description: string) {
      self.description = description;
    },
    setStatus(status: string) {
      self.status = status;
    },
  }));

const TaskStore = types
  .model("TaskStore", {
    tasks: types.optional(types.array(Task), []), // Make tasks optional with an empty array as the default value
  })
  .actions((self) => {
    const storeTasksToLocalStorage = () => {
      const tasksJson = JSON.stringify(self.tasks);
      localStorage.setItem("tasks", tasksJson);
    };

    const loadTasksFromLocalStorage = () => {
      const tasksJson = localStorage.getItem("tasks");
      if (tasksJson) {
        self.tasks = JSON.parse(tasksJson);
      }
    };

    return {
      addTask(task: typeof Task.Type) {
        self.tasks.push(task);
        storeTasksToLocalStorage();
      },
      editTask(taskId: string, updatedTask: typeof Task.Type) {
        const task = self.tasks.find((t) => t.id === taskId);
        if (task) {
          applySnapshot(task, updatedTask);
          storeTasksToLocalStorage();
        }
      },
      deleteTask(taskId: string) {
        const taskIndex = self.tasks.findIndex((t) => t.id === taskId);
        if (taskIndex !== -1) {
          self.tasks.splice(taskIndex, 1);
          storeTasksToLocalStorage();
        }
      },
      loadTasksFromLocalStorage,
      storeTasksToLocalStorage,
    };
  });

export default TaskStore;
