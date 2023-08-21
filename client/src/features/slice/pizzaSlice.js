import { createSlice } from '@reduxjs/toolkit';

const pizzaSlice = createSlice({
    name: "pizza",

    initialState: {
        allPizzas: [],
        vegPizzas: [], 
        nonvegPizzas: [],
        pizzas: [],
        selectedFilter: "all", 
        isPizzasFetched: false 
    },

    reducers: {
        applyFilter: (state, action) => {
            const filter = action.payload;
            state.selectedFilter = filter;
        },

        setPizzasData: (state, action) => {
            const pizzaData = action.payload;

            state.allPizzas = [...pizzaData];
            state.pizzas = [...pizzaData];

            state.vegPizzas = [...pizzaData].filter( (pizza) => {
                return pizza.category === "veg"
            });

            state.nonvegPizzas = [...pizzaData].filter( (pizza) => {
                return pizza.category === "nonveg"
            });

            state.isPizzasFetched = true;
        },

        setPizzas: (state) => {
            const {
                selectedFilter, 
                allPizzas, 
                vegPizzas, 
                nonvegPizzas
            } = state;

            if (selectedFilter === "all")
            {
                state.pizzas = [...allPizzas];
            }
    
            else if (selectedFilter === "veg")
            {
                state.pizzas = [...vegPizzas];
            }
    
            else 
            {
                state.pizzas = [...nonvegPizzas];
            }
        }, 

        removePizzas: (state) => {
            state.allPizzas = [];
            state.vegPizzas = [];
            state.nonvegPizzas = [];
            state.pizzas = [];
            state.selectedFilter = 'all';
            state.isPizzasFetched = false;
        }
    }
});

export const { applyFilter, setPizzasData, setPizzas, removePizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;