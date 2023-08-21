import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: "cart",

    initialState: {
        cartItems: [],
        cartCount: 0,
        cartTotal: 0
    },

    reducers: {
        setUpCart: (state, action) => {
            const cartItems = action.payload;
            state.cartItems = cartItems;
        },

        updateCountTotal: (state) => {
            const cart = state.cartItems;

            let newCount = 0;
            let newTotal = 0;
    
            cart.forEach( (item) => {
                newCount += item.quantity;
                newTotal += item.quantity * item.price;
            });
    
            newTotal = parseFloat(newTotal).toFixed(2); 

            state.cartCount = newCount;
            state.cartTotal = newTotal;
        },

        addToCart: (state, action) => {
            const { product, size, price } = action.payload;
            const cart = state.cartItems;

            const { _id: id, pizzaName, imageUrl } = product;
    
            const pizza = cart.find( (item) => {
                return (item.id === id && item.size === size);
            });
    
            if (pizza)
            {
                const newCartItems = cart.map( (item) => {
                    if (item.id === id && item.size === size)
                    {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        };
                    }
    
                    return item;
                });

                state.cartItems = newCartItems;
            }
    
            else 
            {
                const newCartItems = [
                    ...cart,
                    {
                        id,
                        pizzaName,
                        imageUrl,
                        size,
                        price,
                        quantity: 1
                    }
                ];

                state.cartItems = newCartItems;
            }
        },

        deleteFromCart: (state, action) => {
            const { id, size } = action.payload;
            const cart = state.cartItems;

            const newCartItems = cart.filter( (item) => {
                return (item.id !== id || item.size !== size);
            });

            state.cartItems = newCartItems;
        },

        increaseItem: (state, action) => {
            const { id, size } = action.payload;
            const cart = state.cartItems;

            const newCartItems = cart.map( (item) => {
                if (item.id === id && item.size === size)
                {
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    };
                }
    
                return item;
            });

            state.cartItems = newCartItems;
        },

        decreaseItem: (state, action) => {
            const { id, size } = action.payload;
            const cart = state.cartItems;

            const newCartItems = cart.map( (item) => {
                if (item.id === id && item.size === size)
                {
                    return {
                        ...item,
                        quantity: item.quantity - 1
                    };
                }
    
                return item;
            });

            state.cartItems = newCartItems;
        }
    }
});

export const {
    setUpCart,
    updateCountTotal,
    addToCart,
    deleteFromCart,
    increaseItem,
    decreaseItem
} = cartSlice.actions;

export default cartSlice.reducer;