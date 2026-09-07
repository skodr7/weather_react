import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

// //122
export const fetchWeather = createAsyncThunk(
  "weatherApi/fetchWeather",
  async () => {
    console.log("calling fetch weatherrrrrrrrr");
    const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather?lat=13.96667&lon=44.18333&appid=2fd84d744d345aa9ca383c449ebb21d9",
        // {
        //   cancelToken: new axios.CancelToken((c) => {
        //     cancelAxios = c;
        //   }),
        // }
      );
      // handle success
        const reqTemp = Math.round(response.data.main.temp - 272.15);
        const min = Math.round(response.data.main.temp_min - 272.15);
        const max = Math.round(response.data.main.temp_max - 272.15);
        const des = response.data.weather[0].description;
        const icon = response.data.weather[0].icon;

        console.log(response);
        // setTemp({
        //   number: reqTemp,
        //   min: min,
        //   max: max,
        //   des: des,
        //   icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
        // });

        // //123
        return{
          number: reqTemp,
          min,
          max,
          des,
          icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
        };

    }
);
const WeatherApiSlice = createSlice({
  name: "weatherApi",
  initialState: {
    result: "emp",
    weather: {},
    isLoading: false,
  },

  reducers: {
    changeResult: (state, action) => {
      state.result = "changed";
    },

  },

  extraReducers(builder) {
    builder.addCase(fetchWeather.pending, (state, action) => {
      state.isLoading = true;

    }).addCase(fetchWeather.fulfilled, (state, action) => {
      state.isLoading = false;
      
      console.log("==============*************");
      console.log(state, action);
      state.weather = action.payload;

    }).addCase(fetchWeather.rejected, (staet, action) => {
      staet.isLoading = false;
    });

  },

});

export const { changeResult } = WeatherApiSlice.actions;
export default WeatherApiSlice.reducer;
// //123