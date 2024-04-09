import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";
import axios from "axios";

export interface CatecoryInterface {
  _id: string;
  name: string;
  subCategories: SubCatecoryInterface[];
  image: string;
}

export interface SubCatecoryInterface {
  name: string;
  specifications?: string[];
}

type initialStateInterface = {
  value: CatecoryInterface[];
  loading: boolean;
  error: null | SerializedError;
};

const initialState: initialStateInterface = {
  value: [],
  loading: false,
  error: null,
};

export const getCategories = createAsyncThunk("/get/categories", async () => {
  const resp = await axios.get(
    `${import.meta.env.REACT_APP_BASE_URL}/categories`
  );

  return await resp.data;
});

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.value = payload;
      })
      .addCase(getCategories.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error;
      });
  },
});

export default categoriesSlice.reducer;
