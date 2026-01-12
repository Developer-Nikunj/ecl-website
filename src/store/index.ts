import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/module1/auth/auth.slices"
import roleReducer from "./slices/module1/roles/roles.slices";
import userReducer from "./slices/module1/user/user.slices"
import menuReducer from "./slices/module1/menu/menu.slices"
import footerReducer from "./slices/module1/footer/footer.slices"
import headerReducer from "./slices/module1/header/header.slices"
import bannerReducer from "./slices/module1/banner/banner.slices"
import testimonialReducer from "./slices/module1/testimonial/testimonial.slices"
import seoReducer from "./slices/module1/seo/seo.slices"
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
  },
});

injectStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;