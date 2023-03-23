import axios from 'axios'
import {useState, useEffect, useRef} from 'react'
import {Link, useParams} from 'react-router-dom'
import {toast, Toaster} from 'react-hot-toast'

export default function ProductDetails(){
    const [category, setCategory] = useState([])
    const [product, setProduct] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [image, setImage] = useState([])

    const {id} = useParams()

    const getProducts = async() => {
        try {
            const response = await axios.get(`http://localhost:8000/products/getDetail?id=${id}`)
            console.log(response)
            setProduct(response.data.data)
            setImage(response.data.data[0].products_images)
        } catch (error) {
            console.log(error)
        }
    }

    const getCategory = async() => {
        try{
            const response = await axios.get(`http://localhost:8000/products/getCat`)
            setCategory(response.data.data)
        } catch(error){
            console.log(error.message)
        }
    }

    const countPlusHandler = () => {
        setQuantity(quantity + 1)
    }

    const countMinHandler = () => {
        if(quantity > 1){
            setQuantity(quantity - 1)
        }
    }

    const addToCartHandler = async() => {
        try {
            console.log(quantity)
            const token = localStorage.getItem("token")
            await axios.get(`http://localhost:8000/products/add?product_id=${id}&quantity=${parseInt(quantity)}`, {
                headers: { token }
            })
            toast.success('Product added to cart')
        } catch (error) {
            console.log(error.message)
        }
        
        
    }

    useEffect(() => {
        getProducts()
        getCategory()
    },[])

    return(
        <>
        <div className="flex justify-center gap-4 py-4 bg-[#1c1c1c]">
            {/* products details */}
            <div className="bg-[#6d6d6d] rounded-lg w-[1000px]">
                <div className='flex justify-around h-[700px]'>
                    <div className=' flex border flex-col items-center w-[400px]'>
                        <div><img src={image} alt=""/></div>
                    </div>
                    {console.log(product)}
                    <div className=' flex flex-col justify-center items-center gap-4 w-[400px] p-4 text-[#cfcfcf]'>
                        <div>{console.log(product[0])}
                            <h1 className='text-xl font-bold'>{product[0] ? product[0].products_name : null}</h1>
                            <p className='text-md'>{product[0] ? product[0].products_details[0].desc : null}</p>
                        </div>
                        <div>
                            <h1 className='text-xl font-bold'>Rp. {product[0] ? parseInt(product[0].products_details[0].price).toLocaleString() : null}</h1>
                        </div>
                        <div className='border p-2 flex bg-slate-200 gap-4 rounded-full text-black'>
                            <button onClick={countMinHandler}>-</button>
                            <div>{quantity}</div>
                            <button onClick={countPlusHandler}>+</button>
                        </div>
                        <div>
                            {localStorage.getItem("token") ? <button onClick={addToCartHandler} className='bg-[#db2b39] p-3 rounded-full text-white'>Add to cart</button> : <Link to='/login'><button className='bg-[#443C68] p-3 rounded-full text-white'>Add to cart</button></Link>}
                            {/* <button onClick={ addToCartHandler} className='bg-[#443C68] p-3 rounded-full text-white'>Add to Cart</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}