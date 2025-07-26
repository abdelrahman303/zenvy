import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const CartContext = createContext()


export default function CartContextProvider({ children }) {
    const { token } = useContext(UserContext)
    const [cartItems, setCartItems] = useState(0)
    useEffect(() => {
        token && numItems()

    }, [token])
    const headers = {
        authorization: token
    }
    // function getuserOrders(userId) {
    //     try {
    //         return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    {/* get the cart api */ }
    function getCart() {
        try {
            return axios.get('https://sheshop.salis.app/cart/my-cart', {
                headers
            })
        } catch (error) {
            console.log(error);
        }
    }
    {/* add to cart api */ }
    function addProductToCart(productId , quantity ) {
        try {
            return axios.post('https://sheshop.salis.app/cart/add-to-cart', { productId , quantity}, {
                headers
            })
        } catch (error) {
            console.log(error);
        }
    }
    {/* update item count api */ }
    function updateProductQuantity(id, quantity) {
        try {
            return axios.put(`https://sheshop.salis.app/cart/update-product-quantity/${id}`, { quantity: quantity }, {
                headers
            })
        } catch (error) {
            console.log(error);
        }
    }
    {/* delete an item from cart api */ }
    function deleteProductFromCart(id) {
        try {
            return axios.delete(`https://sheshop.salis.app/cart/remove-product-from-cart/${id}`, {
                headers
            })
        } catch (error) {
            console.log(error);
        }
    }

    {/* ckeckout api */ }
    function CkeckOutSession(cartId, values) {
        try {
            return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`, {
                shippingAddress: values
            }, {
                headers
            })

        } catch (error) {
            console.log(error);
        }
    }

    
    {/* total cart items number */ }
    async function numItems() {
        const res = await getCart();
        if (res.data.status == 'success') {
            setCartItems(res.data.numOfCartItems)
        }
    }
    return <CartContext.Provider value={{ getCart, addProductToCart, updateProductQuantity, deleteProductFromCart, cartItems, setCartItems, CkeckOutSession }}>
        {children}
    </CartContext.Provider>
}