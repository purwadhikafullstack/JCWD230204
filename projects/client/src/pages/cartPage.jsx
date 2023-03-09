import {useState, useEffect} from 'react'
import axios from 'axios'
import {AiOutlineArrowRight, AiFillDelete} from 'react-icons/ai'
import {useParams} from 'react-router-dom'

export default function Cart(){
    const [cart, setCart] = useState([])
    const [cartId, setCartId] = useState(0)
    const [total, setTotal] = useState(0)

    const {id} = useParams()

    const getCart = async() => {
        //add to cart function
        try {
            const response = await axios.get(`http://localhost:8000/products/Cart?id=${id}`)
            console.log(response.data.data[0].id)
            setCart(response.data.data)
            setCartId(response.data.data[0].id)
            console.log(cartId)
        } catch (error) {
            console.log(error.message)
        }
    }

    const removeFromCart = async() => {
        //remove from cart function
        try {
            await axios.delete(`http://localhost:8000/products/Cart/delete?id=${cartId}`)
            getCart()
            window.location.reload()
        } catch (error) {
            console.log(error.message)
        }
    }

    const updateQty = async(cartId, newQuantity) => {
        //update cart automatically updates qty
        try{
            await axios.patch(`http://localhost:8000/products/Cart/update?id=${cartId}`, {
                qty: newQuantity
            })
            getCart()
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleQuantityChange = (cartId, newQuantity) => {
        //handle quantity change
        updateQty(cartId, newQuantity)
    }

    const handleDecrease = (cartId, currentQuantity) => {
        const newQuantity = currentQuantity - 1;
        if(newQuantity >= 0){
            handleQuantityChange(cartId, newQuantity)
        }
    }

    const handleIncrease = (cartId, currentQuantity) => {
        const newQuantity = currentQuantity + 1;
        handleQuantityChange(cartId, newQuantity)
    }

    useEffect(() => {
        //get cart from db
        getCart()
    }, [])


    return(
        <>
        <div className='flex justify-center m-5'>
            <div className='flex flex-col border-b-2 p-9 w-[500px] h-[600px] gap-4'>
            <h1 className='text-2xl font-bold border-b-2 border-black'>Cart</h1>
            <div className="flex flex-col gap-4 ">
                {/* {
                    cart.map((value, index) => {
                        return(
                            <>
                            <div className='flex gap-4'>
                                <div>{value.product.products_name}</div>
                                <div>{value.product.products_details[0].price}</div>
                                <div className='flex gap-3'>
                                    <button>-</button>
                                    <div key={index}>{value.qty}</div>
                                    <button>+</button>
                                </div>
                            </div>
                            
                            </>
                        )
                    })
                } */}
            </div>
            <table className='table-auto'>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.map((value, index) => {
                            return(
                                <tr>
                                    <td key={value.id}>{value.product.products_name}</td>
                                    <td key={value.id}>Rp.{parseInt(value.product.products_details[0].price).toLocaleString()}</td>
                                    <td><div className='flex gap-3'>
                                    <button onClick={() => handleDecrease(value.id, value.qty)}>-</button>
                                    <div key={value.id}>{value.qty}</div>
                                    <button onClick={() => handleIncrease(value.id, value.qty)}>+</button>
                                </div></td>
                                <td>
                                    <button onClick={removeFromCart}>
                                        <AiFillDelete/>
                                    </button>
                                </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className="flex gap-5">
                <div>total</div>
                <div>0</div>
            </div>
            {console.log(cartId)}
            <div className='self-end flex items-center gap-3'>
                <div>checkout</div>
                <div><AiOutlineArrowRight/></div>
            </div>
            </div>
        </div>
        </>
    )
}