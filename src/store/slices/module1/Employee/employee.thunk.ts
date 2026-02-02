import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "@/lib/axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

type EmployeeFilters = {
  startDate?: string;
  endDate?: string;
  limit: number;
  offset: number;
};

type CreateEmployeePayload = 
  FormData
;

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

      const response = await api.get(`/employee` , {params: filters});
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
      const response = await api.get(`/employee` , data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch employee"
      );
    }   
  }
);

// Create Employee
export const createEmployee = createAsyncThunk(
  "employees/createEmployee",
  async (data: CreateEmployeePayload, { rejectWithValue }) => {
    try {
      const response = await api.post(`/employee`, data);
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
      const response = await api.put( `/employee/${employeeId}`, employeeData);
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
      await api.delete(`/employee/${employeeId}`);
      return employeeId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete employee"
      );
    }
  }
);