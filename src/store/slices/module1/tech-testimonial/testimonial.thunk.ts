import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";
import { toast } from "react-toastify";

interface testimonialResponse {
    status:boolean;
    message:string;
}

export const createTestimonial = createAsyncThunk<
  testimonialResponse,
  FormData,
  { rejectValue: string }
>("testionial/create", async (formData, { rejectWithValue }) => {
  try {
    const res = await api.post("/tech-testimonial", formData);
    console.log("res", res);

    if (res.data.status === 0) {
      toast.error(String(res.data.message));
      return rejectWithValue(res.data.message);
    }
    toast.success(String(res.data.message));

    return res.data;
  } catch (error:any) {
    toast.error(String(error.message));

    return rejectWithValue(error.response?.data?.message || "Tech Testimonial creation failed");
  }
});

interface Testimonial {
    id:number;
    icon:string;
    image:string;
    title:string;
    designation:string;
    slug:string;
    description:string;
    rating:number;
    categories:string;
    active:boolean;
}
interface getTestimonialResponse {
    status:boolean;
    message:string;
    data:Testimonial[]
    meta:{
        total:number;
        offset:number;
        limit:number;
    }
}

interface getTestimonialPayload {
    limit:number;
    offset:number;
    startDate:string;
    endDate:string;
}

export const allTechTestimonial  = createAsyncThunk<getTestimonialResponse,getTestimonialPayload,{rejectValue:string}>
("tech-testimonial/getall",async({limit,offset,startDate,endDate},{rejectWithValue})=>{
    try {
        const res = await api.get(
          "tech-testimonial",
          { params: { limit, offset, startDate, endDate } ,withCredentials: true ,},
        );
        if(res.data.status === 0){
            toast.error(res.data.message);
            return rejectWithValue(res.data.message);
        }
        return res.data;
    } catch (error) {
        const message =  error.response?.data?.message || "Tech testimonial failed";

        toast.error(message);

        return rejectWithValue(message);
    }
})

interface getOneTstimonialResponse {
    status:boolean;
    message:string;
    data:Testimonial
}

// export const getTechTestimonial = createAsyncThunk<getOneTstimonialResponse,slug>;