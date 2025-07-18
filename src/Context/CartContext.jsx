import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext()


export default function CartContextProvider({ children }) {

    const [cartItems, setCartItems] = useState(0)
    const token = localStorage.getItem("token");
    useEffect(() => {
        token && numItems()
        
    }, [token])
    const headers = {
        token  // ES6 ==> lw el key nafs el value momken a4el wa7d mnhom 
    }
    function getuserOrders(userId) {
        try {
            return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
        } catch (error) {
            console.log(error);
        }
    }
    {/* get the cart api */}
    function getCart() {
        try {
            return axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
                headers
            })
        } catch (error) {
            console.log(error);
        }
    }
    {/* add to cart api */}
    function addProductToCart(p_id) {
        try {
            return axios.post('https://ecommerce.routemisr.com/api/v1/cart', { productId: p_id }, {
                headers
            })
        } catch (error) {
            console.log(error);
        }
    }
    {/* update item count api */}
    function updateProductCount(id, count) {
        try {
            return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { count: count }, {
                headers
            })
        } catch (error) {
            console.log(error);
        }
    }
    {/* delete an item from cart api */}
    function deleteProductFromCart(id) {
        try {
            return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                headers
            })
        } catch (error) {
            console.log(error);
        }
    }
    {/* delete all cart api */}
    function deleteAllProductsFromCart() {
        try {
            return axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
                headers
            })
        } catch (error) {
            console.log(error);
        }
    }
    {/* ckeckout api */}
    function CkeckOutSession(cartId , values) {
        try {
            return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`, {
                shippingAddress : values
            }, {
                headers
            })

        } catch (error) {
            console.log(error);
        }
    }
    {/* total cart items number */}
    async function numItems() {
        const res = await getCart();
        if (res.data.status == 'success') {
            setCartItems(res.data.numOfCartItems)
        }
    }
    return <CartContext.Provider value={{getuserOrders,  getCart, addProductToCart, updateProductCount, deleteProductFromCart, deleteAllProductsFromCart, cartItems, setCartItems , CkeckOutSession }}>
        {children}
    </CartContext.Provider>
}