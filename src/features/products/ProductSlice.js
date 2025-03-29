import { createSlice } from "@reduxjs/toolkit";
import Products from "../../productsContent";

const initialState = {
    items : Products,
    filteredItems: Products,
    searchTerm: "",
    selectedCategory: "All"
};

//Search Product and Search Category

const filterProducts = (state)=>{
    return state.items.filter((product)=>{
        const matchsearch = product.title.toLowerCase().includes(state.searchTerm.toLowerCase());

        const matchCategory = 
        state.selectedCategory === "All" ||
        product.category === state.selectedCategory;
        return matchsearch && matchCategory;

    })
}

const productSlice = createSlice({

    name: "products",
    initialState,
    reducers:{
        setSearchTerm:(state,action)=>{
            state.searchTerm = action.payload;
            state.filteredItems = filterProducts(state)
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
            state.filteredItems = filterProducts(state);
        }
    }
})

export const {setSearchTerm, setSelectedCategory} = productSlice.actions;
export default productSlice.reducer;