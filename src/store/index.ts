import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/module1/auth/auth.slices";
import roleReducer from "./slices/module1/roles/roles.slices";
import userReducer from "./slices/module1/user/user.slices";
import menuReducer from "./slices/module1/menu/menu.slices";
import footerReducer from "./slices/module1/footer/footer.slices";
import headerReducer from "./slices/module1/header/header.slices";
import bannerReducer from "./slices/module1/banner/banner.slices";
import testimonialReducer from "./slices/module1/testimonial/testimonial.slices";
import seoReducer from "./slices/module1/seo/seo.slices";
import profileReducer from "./slices/module1/profile/profile.slices";
import blogCategoryReducer from "./slices/module1/blogCategory/blogCategory.slices";
import blogReducer from "./slices/module1/blog/blog.slices";
import employeeReducer from "./slices/module1/Employee/Employee.slices";
import serviceCategoryReducer from "./slices/module1/services/services.slices";
import serviceReducer from "./slices/module1/service/service.slices";
import careerReducer from "./slices/module1/career/career.slices";
import servingIndustryReducer from "./slices/module1/servingIndustry/servingIndustry.slices";
import recentWorkReducer from "./slices/module1/recentWorks/recentwork.slices";
import { injectStore } from "@/lib/axios";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    role: roleReducer,
    user: userReducer,
    menu: menuReducer,
    footer: footerReducer,
    header: headerReducer,
    banner: bannerReducer,
    testimonial: testimonialReducer,
    seo: seoReducer,
    profile: profileReducer,
    blogCat: blogCategoryReducer,
    blog: blogReducer,
    employee: employeeReducer,
    ServCat: serviceCategoryReducer,
    service: serviceReducer,
    career: careerReducer,
    servingIndustry: servingIndustryReducer,
    recentWork: recentWorkReducer,
  },
});

injectStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
