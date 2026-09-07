import { configureStore } from "@reduxjs/toolkit";
import WeatherApiSliceReducer from "./weatherApiSlice";

export default configureStore({
  reducer: {
    weather: WeatherApiSliceReducer,
    
  },

});
// //123