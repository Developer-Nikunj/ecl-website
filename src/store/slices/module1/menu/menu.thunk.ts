import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export interface CreateMenuPayload {
  slug: string;
  submenus: ("get" | "post" | "put" | "delete")[];
}

export interface CreateMenuResponse {
  status: number;
  message: string;
}

export const createMenu = createAsyncThunk<
  CreateMenuResponse,
  CreateMenuPayload,
  { rejectValue: string }
>("menu/create", async ({ slug, submenus }, { rejectWithValue }) => {
  try {
    const res = await api.post<CreateMenuResponse>("/menu/create", {
      slug,
      submenus,
    });

    if (res.data.status === 0) {
      toast.error(res.data.message);
      return rejectWithValue(res.data.message);
    }

    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    const message = err.response?.data?.message || "Menu creation failed";

    toast.error(message);
    return rejectWithValue(message);
  }
});

interface getAllMenuItem {
  slug: string;
  permissions: string[];
}

interface GetAllMenuResponse {
  status: number;
  data: getAllMenuItem[];
}

export const getAllMenus = createAsyncThunk<
  getAllMenuItem[],
  void,
  { rejectValue: string }
>("menu/getAll", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get<GetAllMenuResponse>("/menu/getAll");

    if (res.data.status === 0) {
      toast.error("Failed to fetch menus");
      return rejectWithValue("Failed to fetch menus");
    }
  // toast.success("successfull to fetch menus");
    return res.data.data; // ✅ only array goes to store
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    const message = err.response?.data?.message || "Failed to load menus";

    toast.error(message);
    return rejectWithValue(message);
  }
});


export interface MenuItemBySlug {
  slug: string;
  menus: {
    id: number;
    menuName: string;
  }[];
}

export interface GetMenuBySlugResponse {
  status: number;
  data: MenuItemBySlug | null;
}

export const getMenuBySlug = createAsyncThunk<
  GetMenuBySlugResponse,
  string,
  { rejectValue: string }
>("menu/getBySlug", async (slug, { rejectWithValue }) => {
  try {
    console.log("slug------",slug);
    const res = await api.get(`/menu/getBySlug/${slug}`, {
      withCredentials: true,
    });

    if (res.data.status === 0) {
      toast.error(res.data.message);
      return rejectWithValue(res.data.message || "Failed to fetch menu");
    }
    toast.success(res.data.message);

    return res.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to fetch menu by slug"
    );
  }
});





export interface MenuItem {
  id?: number;
  menuName: string;
}
export interface UpdateMenuPayload {
  slug: string;
  menus: MenuItem[];
}
export const updateMenu = createAsyncThunk<
  any, // response type from backend
  UpdateMenuPayload,
  { rejectValue: string }
>("menu/updateMenu", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post("/menu/update", payload, {
      withCredentials: true,
    });
    if (res.data.status === 0) {
      toast.error(res.data.message);
      return rejectWithValue(res.data.message || "Failed to update menu");
    }
    toast.success(res.data.message);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to update menu"
    );
  }
});



export interface DeleteMenuItemBySlug {
  slug: string;
  menus: {
    id: number;
    menuName: string;
  }[];
}

export interface DeleteMenuBySlugResponse {
  status: number;
  message: string;
}

export const deleteMenuBySlug = createAsyncThunk<
  DeleteMenuBySlugResponse,
  string,
  { rejectValue: string }
>("menu/delete", async (slug, { rejectWithValue }) => {
  try {
    console.log("slug------", slug);
    const res = await api.delete(`/menu/delete/${slug}`, {
      withCredentials: true,
    });

    if (res.data.status === 0) {
      toast.error(res.data.message);
      return rejectWithValue(res.data.message || "Failed to fetch menu");
    }
    toast.success(res.data.message);

    return res.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to fetch menu by slug"
    );
  }
});