import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

type EmployeeFilters = {
  startDate?: string;
  endDate?: string;
  limit: number;
  offset: number;
};

type CreateEmployeePayload = {
  name: string;
  email: string;
  designation: string;
  status: boolean;
  experience: string;
  rating: string;
  mobileNo: string;
  linkedinURL: string;
  twitter: string;
};

type UpdateEmployeePayload = CreateEmployeePayload & {
  employeeId: number;
};

// Get All Employees
export const getAllEmployees = createAsyncThunk(
  "employees/getAllEmployees",
  async (filters: EmployeeFilters, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      params.append("limit", filters.limit.toString());
      params.append("offset", filters.offset.toString());
      
      if (filters.startDate) {
        params.append("startDate", filters.startDate);
      }
      if (filters.endDate) {
        params.append("endDate", filters.endDate);
      }

      const response = await axios.get(`${API_BASE_URL}/employees?${params.toString()}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch employees"
      );
    }
  }
);

// Get Employee By ID
export const getEmployeeById = createAsyncThunk(
  "employees/getEmployeeById",
  async (employeeId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/employees/${employeeId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch employee"
      );
    }
  }
);

// Create Employee
export const createEmployeeEntry = createAsyncThunk(
  "employees/createEmployee",
  async (employeeData: CreateEmployeePayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/employees`, employeeData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create employee"
      );
    }
  }
);

// Update Employee
export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async (payload: UpdateEmployeePayload, { rejectWithValue }) => {
    try {
      const { employeeId, ...employeeData } = payload;
      const response = await axios.put(
        `${API_BASE_URL}/employees/${employeeId}`,
        employeeData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update employee"
      );
    }
  }
);

// Delete Employee
export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (employeeId: number, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/employees/${employeeId}`);
      return employeeId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete employee"
      );
    }
  }
);