import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios'

export const getProduct = createAsyncThunk('product/getProduct', async (query = '', { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`https://ecommerce-jiot.onrender.com/api/v1/products${query}`);
        console.log("API Response:", data);
        return data;
    } catch (error) {
        console.error("API Error:", error);
        return rejectWithValue(error?.response?.data?.message || 'An error occurred while fetching products');
    }
})


export const getProductDetails=createAsyncThunk('product/getProductDetails',async(id,{rejectWithValue})=>{
    try {
        const {data} = await axios.get(`https://ecommerce-jiot.onrender.com/api/v1/products/${id}`);
        console.log("Data",data)
        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data || 'An error occurred');
    }
})
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productCount: 0,
    loading: false,
    error: null,
    product:null,
  },
  reducers: {
    removeError:(state)=>{
        state.error = null;
    },
    
  },
  extraReducers:(builder)=>{
    builder
      .addCase(getProduct.pending,(state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(getProduct.fulfilled,(state,action)=>{
        state.loading = false;
        state.products = action.payload.products || [];
        state.productCount = action.payload.productCount || 0;
        state.error = null;
      })
      .addCase(getProduct.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload || 'Failed to fetch products';
        state.products = [];
      })

      builder
      .addCase(getProductDetails.pending,(state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductDetails.fulfilled,(state,action)=>{
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductDetails.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
  }
});

export const {
  removeError,

} = productSlice.actions;

export default productSlice.reducer;
