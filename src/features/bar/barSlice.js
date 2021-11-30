import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("bar/fetchData", async () => {
  const res = await fetch(
    "https://s3-ap-southeast-1.amazonaws.com/he-public-data/chart2986176.json"
  );
  const data = await res.json();
  return data;
});

const barSlie = createSlice({
  name: "barchart",
  initialState: {
    data: [],
    isLoading: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        const newData = payload
          .filter((t) => (t.type = "Bar"))
          .map((el) => {
            const generateColors = (n) => {
              const colors = [];

              for (let i = 0; i < n; i++) {
                const color = "#" + Math.random().toString(16).slice(-6);
                colors.push(color);
              }
              return colors;
            };
            return {
              datasets: [
                {
                  data: el.elements,
                  backgroundColor: generateColors(el.elements.length),
                  hoverBackgroundColor: generateColors(el.elements.length),
                },
              ],
            };
          });
        state.isLoading = false;
        state.data = state.data.concat(newData);
      })
      .addCase(fetchData.rejected, (state) => {
        state.isError = true;
      }),
});

export const selectData = (state) => state.bar;

export default barSlie.reducer;
