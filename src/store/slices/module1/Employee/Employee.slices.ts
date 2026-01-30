// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import {
//   createEmployeeEntry,
//   getAllEmployees,
//   deleteEmployee,
//   getEmployeeById,
//   updateEmployee,
// } from "./employee.thunk";

// interface Employee {
//      id: number;
//   name: string;
//   email: string;
//   designation: string;
//   status: boolean;
//   experience: string;
//   rating: string;
//   employeeImg: string;
//   employeeMobileNo: string;
//   linkedinUrl: string;
//   twitterUrl: string;
// }

// interface Meta {
//     total: number;
//   limit: number;
//   offset: number;
// }

// interface RoleState {
//   loading: boolean;
//   success: boolean;
//   error: string | null;
//   roles: Employee[];
//   selectedRole: Employee | null;
//   meta: Meta | null;
// }

// const initialState: RoleState = {
//   loading: false,
//   success: false,
//   error: null,
//   roles: [],
//   selectedRole: null,
//   meta: null,
// };

// const roleSlice = createSlice({
//   name: "employee",
//   initialState,
//   reducers: {
//     clearRoleState(state) {
//       state.loading = false;
//       state.success = false;
//       state.error = null;
//     },
// },


// extraReducers: (builder) => {
//     builder
//       /* ================= CREATE Employee ================= */

//       .addCase(createEmployeeEntry.pending, (state) => {
//         state.loading = true;
//         state.success = false;
//         state.error = null;
//       })

//       .addCase(createEmployeeEntry.fulfilled, (state) => {
//               state.loading = false;
//               state.success = true;
//               state.error = null;
//             })
      
//             .addCase(createEmployeeEntry.rejected, (state, action) => {
//               state.loading = false;
//               state.success = false;
//               state.error = (action.payload as string) || "Employee creation failed";
//             })

//     .addCase(getAllEmployees.pending, (state) => {
//             state.loading = true;
//             state.error = null;
//           })
    
//            .addCase(getAllEmployees.fulfilled, (state, action) => {
//                   state.loading = false;
//                   state.success = true;
//                   state.roles = action.payload.data;
//                   state.meta = action.payload.meta;
//                 })
//     .addCase(getAllEmployees.rejected, (state, action) => {
//             state.loading = false;
//             state.success = false;
//             state.error = (action.payload as string) || "Employee fetching failed";
//           })
//      /* ---------------- DELETE Employee ---------------- */
//           .addCase(deleteEmployee.pending, (state) => {
//             state.loading = true;
//             state.error = null;
//           })
//           .addCase(deleteEmployee.fulfilled, (state) => {
//             state.loading = false;
//             state.success = true;
//           )}
       
//           .addCase(deleteEmployee.rejected, (state, action) => {
//                   state.loading = false;
//                   state.success = false;
//                   state.error = (action.payload as string) || "Employee deletion failed";
//                 })

//      /* ---------------- GET SINGLE ROLE ---------------- */
//           .addCase(getEmployeeById.pending, (state) => {
//             state.loading = true;
//             state.error = null;
//             state.selectedRole = null; // clear previous
//           })
//           .addCase(getEmployeeById.fulfilled, (state, action) => {
//             state.loading = false;
//             state.selectedRole = action.payload.data; // store single role
//           })
//           .addCase(getEmployeeById.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.payload || "Failed to fetch employee";
//             state.selectedRole = null;
//           })

//      /* ---------------- UPDATE SINGLE ROLE ---------------- */
    
//           .addCase(updateEmployee.pending, (state) => {
//             state.loading = true;
//             state.success = false;
//             state.error = null;
//           })
    
//           // Update role → fulfilled
//           .addCase(updateEmployee.fulfilled, (state) => {
//             state.loading = false;
//             state.success = true;
//             state.error = null;
//           })
//      // Update role → rejected
//           .addCase(updateEmployee.rejected, (state, action) => {
//             state.loading = false;
//             state.success = false;
//             state.error = (action.payload as string) || "Role update failed";
//           });
//         } 

// )};

// export const { clearEmployeeState } = employeeSlice.action;
// export  default employeeSlice.reducer;





import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createEmployeeEntry,
  getAllEmployees,
  deleteEmployee,
  getEmployeeById,
  updateEmployee,
} from "./employee.thunk";

interface Employee {
  id: number;
  name: string;
  email: string;
  designation: string;
  status: boolean;
  experience: string;
  rating: string;
  employeeImg: string;
  employeeMobileNo: string;
  linkedinUrl: string;
  twitterUrl: string;
}

interface Meta {
  total: number;
  limit: number;
  offset: number;
}

interface EmployeeState { // Fixed: was RoleState
  loading: boolean;
  success: boolean;
  error: string | null;
  employees: Employee[]; // Fixed: was roles
  selectedEmployee: Employee | null; // Fixed: was selectedRole
  meta: Meta | null;
}

const initialState: EmployeeState = {
  loading: false,
  success: false,
  error: null,
  employees: [], // Fixed: was roles
  selectedEmployee: null, // Fixed: was selectedRole
  meta: null,
};

const employeeSlice = createSlice({ // Fixed: was roleSlice
  name: "employee",
  initialState,
  reducers: {
    clearEmployeeState(state) { // Fixed: was clearRoleState
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      /* ================= CREATE Employee ================= */
      .addCase(createEmployeeEntry.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createEmployeeEntry.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(createEmployeeEntry.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = (action.payload as string) || "Employee creation failed";
      })

      /* ================= GET ALL Employees ================= */
      .addCase(getAllEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.employees = action.payload.data; // Fixed: was roles
        state.meta = action.payload.meta;
      })
      .addCase(getAllEmployees.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = (action.payload as string) || "Employee fetching failed";
      })

      /* ================= DELETE EMPLOYEE ================= */
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state) => { // Fixed: added missing semicolon
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = (action.payload as string) || "Employee deletion failed";
      })

      /* ================= GET SINGLE EMPLOYEE ================= */
      .addCase(getEmployeeById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedEmployee = null; // Fixed: was selectedRole
      })
      .addCase(getEmployeeById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedEmployee = action.payload.data; // Fixed: was selectedRole
      })
      .addCase(getEmployeeById.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch employee"; // Fixed: added type cast
        state.selectedEmployee = null; // Fixed: was selectedRole
      })

      /* ================= UPDATE EMPLOYEE ================= */
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateEmployee.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = (action.payload as string) || "Employee update failed"; // Fixed: was "Role update failed"
      });
  },
});

export const { clearEmployeeState } = employeeSlice.actions; // Fixed: was .action (singular)
export default employeeSlice.reducer;