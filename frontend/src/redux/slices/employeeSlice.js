import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import { employeeService } from "../../services/employeeService";

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (_, thunkAPI) => {
    try {
      return await employeeService.getEmployees();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch employees"
      );
    }
  }
);

export const createEmployee = createAsyncThunk(
  "employees/createEmployee",
  async (employeeData, thunkAPI) => {
    try {
      return await employeeService.createEmployee(
        employeeData
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to create employee"
      );
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async ({ id, data }, thunkAPI) => {
    try {
      return await employeeService.updateEmployee(
        id,
        data
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to update employee"
      );
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id, thunkAPI) => {
    try {
      await employeeService.deleteEmployee(id);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete employee"
      );
    }
  }
);

const initialState = {
  employees: [],
  loading: false,
  error: null,
};

const employeeSlice = createSlice({
  name: "employees",

  initialState,

  reducers: {
    clearEmployeeError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Fetch employees

      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        fetchEmployees.fulfilled,
        (state, action) => {
          state.loading = false;

          state.employees =
            action.payload.data ||
            action.payload;
        }
      )

      .addCase(
        fetchEmployees.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // Create employee

      .addCase(
        createEmployee.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        createEmployee.fulfilled,
        (state, action) => {
          state.loading = false;

          const newEmployee =
            // action.payload.data ||
            // action.payload;
            action.payload?.data?.employee ||
            action.payload?.data ||
            action.payload;

        //   state.employees.push(newEmployee);
          state.employees.unshift(newEmployee);
        }
      )

      .addCase(
        createEmployee.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // Update employee

      .addCase(
        updateEmployee.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        updateEmployee.fulfilled,
        (state, action) => {
          state.loading = false;

          const updatedEmployee =
            action.payload.data ||
            action.payload;

          const index =
            state.employees.findIndex(
              (employee) =>
                employee._id ===
                  updatedEmployee._id ||
                employee.id ===
                  updatedEmployee.id
            );

          if (index !== -1) {
            state.employees[index] =
              updatedEmployee;
          }
        }
      )

      .addCase(
        updateEmployee.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // Delete employee

      .addCase(
        deleteEmployee.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        deleteEmployee.fulfilled,
        (state, action) => {
          state.loading = false;

          state.employees =
            state.employees.filter(
              (employee) =>
                employee._id !== action.payload &&
                employee.id !== action.payload
            );
        }
      )

      .addCase(
        deleteEmployee.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const {
  clearEmployeeError,
} = employeeSlice.actions;

export default employeeSlice.reducer;