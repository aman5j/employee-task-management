// // import {
// //   createAsyncThunk,
// //   createSlice,
// // } from "@reduxjs/toolkit";

// // import { taskService } from "../../services/taskService";


// // // GET TASKS
// // export const fetchTasks = createAsyncThunk(
// //   "tasks/fetchTasks",
// //   async (_, thunkAPI) => {
// //     try {
// //       return await taskService.getTasks();
// //     } catch (error) {
// //       return thunkAPI.rejectWithValue(
// //         error.response?.data?.message ||
// //           "Failed to fetch tasks"
// //       );
// //     }
// //   }
// // );


// // // CREATE TASK
// // export const createTask = createAsyncThunk(
// //   "tasks/createTask",
// //   async (taskData, thunkAPI) => {
// //     try {
// //       return await taskService.createTask(
// //         taskData
// //       );
// //     } catch (error) {
// //       return thunkAPI.rejectWithValue(
// //         error.response?.data?.message ||
// //           "Failed to create task"
// //       );
// //     }
// //   }
// // );


// // // UPDATE TASK
// // export const updateTask = createAsyncThunk(
// //   "tasks/updateTask",
// //   async ({ id, data }, thunkAPI) => {
// //     try {
// //       return await taskService.updateTask(
// //         id,
// //         data
// //       );
// //     } catch (error) {
// //       return thunkAPI.rejectWithValue(
// //         error.response?.data?.message ||
// //           "Failed to update task"
// //       );
// //     }
// //   }
// // );


// // // DELETE TASK
// // export const deleteTask = createAsyncThunk(
// //   "tasks/deleteTask",
// //   async (id, thunkAPI) => {
// //     try {
// //       await taskService.deleteTask(id);

// //       return id;
// //     } catch (error) {
// //       return thunkAPI.rejectWithValue(
// //         error.response?.data?.message ||
// //           "Failed to delete task"
// //       );
// //     }
// //   }
// // );


// // const initialState = {
// //   tasks: [],
// //   loading: false,
// //   error: null,
// // };


// // const taskSlice = createSlice({
// //   name: "tasks",

// //   initialState,

// //   reducers: {
// //     clearTaskError: (state) => {
// //       state.error = null;
// //     },
// //   },

// //   extraReducers: (builder) => {
// //     builder

// //       // FETCH
// //       .addCase(
// //         fetchTasks.pending,
// //         (state) => {
// //           state.loading = true;
// //           state.error = null;
// //         }
// //       )

// //       .addCase(
// //         fetchTasks.fulfilled,
// //         (state, action) => {
// //           state.loading = false;

// //           state.tasks =
// //             action.payload.data ||
// //             action.payload;
// //         }
// //       )

// //       .addCase(
// //         fetchTasks.rejected,
// //         (state, action) => {
// //           state.loading = false;
// //           state.error = action.payload;
// //         }
// //       )


// //       // CREATE
// //       .addCase(
// //         createTask.pending,
// //         (state) => {
// //           state.loading = true;
// //           state.error = null;
// //         }
// //       )

// //       .addCase(
// //         createTask.fulfilled,
// //         (state, action) => {
// //           state.loading = false;

// //           const newTask =
// //             action.payload.data ||
// //             action.payload;

// //           state.tasks.unshift(newTask);
// //         }
// //       )

// //       .addCase(
// //         createTask.rejected,
// //         (state, action) => {
// //           state.loading = false;
// //           state.error = action.payload;
// //         }
// //       )


// //       // UPDATE
// //       .addCase(
// //         updateTask.pending,
// //         (state) => {
// //           state.loading = true;
// //           state.error = null;
// //         }
// //       )

// //       .addCase(
// //         updateTask.fulfilled,
// //         (state, action) => {
// //           state.loading = false;

// //           const updatedTask =
// //             action.payload.data ||
// //             action.payload;

// //           const index =
// //             state.tasks.findIndex(
// //               (task) =>
// //                 task._id ===
// //                   updatedTask._id ||
// //                 task.id ===
// //                   updatedTask.id
// //             );

// //           if (index !== -1) {
// //             state.tasks[index] =
// //               updatedTask;
// //           }
// //         }
// //       )

// //       .addCase(
// //         updateTask.rejected,
// //         (state, action) => {
// //           state.loading = false;
// //           state.error = action.payload;
// //         }
// //       )


// //       // DELETE
// //       .addCase(
// //         deleteTask.pending,
// //         (state) => {
// //           state.loading = true;
// //           state.error = null;
// //         }
// //       )

// //       .addCase(
// //         deleteTask.fulfilled,
// //         (state, action) => {
// //           state.loading = false;

// //           state.tasks =
// //             state.tasks.filter(
// //               (task) =>
// //                 task._id !==
// //                   action.payload &&
// //                 task.id !==
// //                   action.payload
// //             );
// //         }
// //       )

// //       .addCase(
// //         deleteTask.rejected,
// //         (state, action) => {
// //           state.loading = false;
// //           state.error = action.payload;
// //         }
// //       );
// //   },
// // });


// // export const {
// //   clearTaskError,
// // } = taskSlice.actions;


// // export default taskSlice.reducer;



// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { taskService } from "../../services/taskService";

// export const fetchTasks = createAsyncThunk(
//   "tasks/fetchTasks",
//   async (_, thunkAPI) => {
//     try {
//       const response = await taskService.getTasks();
//       return response.data || response;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Failed to fetch tasks"
//       );
//     }
//   }
// );

// export const createTask = createAsyncThunk(
//   "tasks/createTask",
//   async (taskData, thunkAPI) => {
//     try {
//       const response = await taskService.createTask(taskData);
//       return response.data || response;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Failed to create task"
//       );
//     }
//   }
// );

// export const updateTask = createAsyncThunk(
//   "tasks/updateTask",
//   async ({ id, data }, thunkAPI) => {
//     try {
//       const response = await taskService.updateTask(id, data);
//       return response.data || response;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Failed to update task"
//       );
//     }
//   }
// );

// export const deleteTask = createAsyncThunk(
//   "tasks/deleteTask",
//   async (id, thunkAPI) => {
//     try {
//       await taskService.deleteTask(id);
//       return id;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Failed to delete task"
//       );
//     }
//   }
// );

// const initialState = {
//   tasks: [],
//   loading: false,
//   error: null,
// };

// const taskSlice = createSlice({
//   name: "tasks",
//   initialState,
//   reducers: {
//     clearTaskError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // FETCH
//       .addCase(fetchTasks.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchTasks.fulfilled, (state, action) => {
//         state.loading = false;
//         state.tasks = Array.isArray(action.payload) ? action.payload : [];
//       })
//       .addCase(fetchTasks.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // CREATE
//       .addCase(createTask.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createTask.fulfilled, (state, action) => {
//         state.loading = false;
//         const newTask = action.payload;
//         if (newTask) {
//           state.tasks.unshift(newTask);
//         }
//       })
//       .addCase(createTask.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // UPDATE
//       .addCase(updateTask.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateTask.fulfilled, (state, action) => {
//         state.loading = false;
//         const updatedTask = action.payload;
//         const index = state.tasks.findIndex(
//           (task) =>
//             (task._id || task.id) === (updatedTask._id || updatedTask.id)
//         );
//         if (index !== -1) {
//           state.tasks[index] = updatedTask;
//         }
//       })
//       .addCase(updateTask.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // DELETE
//       .addCase(deleteTask.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteTask.fulfilled, (state, action) => {
//         state.loading = false;
//         state.tasks = state.tasks.filter(
//           (task) => (task._id || task.id) !== action.payload
//         );
//       })
//       .addCase(deleteTask.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearTaskError } = taskSlice.actions;
// export default taskSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { taskService } from "../../services/taskService";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, thunkAPI) => {
    try {
      const response = await taskService.getTasks();
      return response.data || response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch tasks"
      );
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData, thunkAPI) => {
    try {
      const response = await taskService.createTask(taskData);
      return response.data || response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create task"
      );
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await taskService.updateTask(id, data);
      return response.data || response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update task"
      );
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, thunkAPI) => {
    try {
      await taskService.deleteTask(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete task"
      );
    }
  }
);

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    clearTaskError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        const newTask = action.payload;
        if (newTask) {
          state.tasks.unshift(newTask);
        }
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTask = action.payload;
        const index = state.tasks.findIndex(
          (task) =>
            (task._id || task.id) === (updatedTask._id || updatedTask.id)
        );
        if (index !== -1) {
          state.tasks[index] = updatedTask;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter(
          (task) => (task._id || task.id) !== action.payload
        );
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTaskError } = taskSlice.actions;
export default taskSlice.reducer;