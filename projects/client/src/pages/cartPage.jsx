import {useState, useEffect} from 'react'
import axios from 'axios'

export default function Cart(){
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)

    const getCart = async() => {
        //add to cart function
        try {
            const response = await axios.get('http://localhost:8000/products/carts')
            setCart(response)
        } catch (error) {
            console.log(error.message)
        }
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
        <div className='flex justify-center m-5'>
            <div className='flex flex-col border p-9'>
            <h1 className='text-2xl font-bold'>Cart</h1>
            <div className="flex gap-4">
                <div>products Name</div>
                <div>Price</div>
                <div className='flex gap-3'>
                    <button>-</button>
                    <div>0</div>
                    <button>+</button>
                </div>
            </div>
            <div className="flex gap-5">
                <div>total</div>
                <div>0</div>
            </div>

            <div className='self-end'>
                <div>checkout</div>
            </div>
            </div>
        </div>
        </>
    )
}