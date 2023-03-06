import {useState, useEffect} from 'react'

export default function Cart(){
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)

    const addtoCart = async() => {
        //add to cart function
    }

    const removeFromCart = async() => {
        //remove from cart function
    }

    const checkout = async() => {
        //checkout function
    }

    useEffect(() => {
        //get cart from db
    }, [])


    return(
        <>
        <h1>Cart</h1>

        <div>
            <div>products Table</div>
        </div>

        <div>
            <div>total</div>
        </div>

        <div>
            <div>checkout</div>
        </div>
        </>
    )
}