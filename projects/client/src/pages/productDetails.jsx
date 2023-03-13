import axios from 'axios'
import {useState, useEffect, useRef} from 'react'
import {Link, useParams} from 'react-router-dom'

export default function ProductDetails(){
    const [category, setCategory] = useState([])
    const [product, setProduct] = useState([])
    const [sortByproduct, setSortByProduct] = useState([])
    const [filterByproduct, setFilterByProduct] = useState([])
    const [quantity, setQuantity] = useState(1)

    const sort = useRef(null)
    const filter = useRef(null)

    const {id} = useParams()

    const getProducts = async() => {
        try {
            const response = await axios.get(`http://localhost:8000/products/getDetail?id=${id}`)
            setProduct(response.data.data)
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

    useEffect(() => {
        getProducts()
        getCategory()
    },[])

    return(
        <>
        <div className="flex justify-center gap-4 py-4 bg-black">
            {/* products details */}
            <div className="bg-[#393053] rounded-lg w-[1000px]">
                <div className='flex justify-around h-[700px]'>
                    <div className=' flex border flex-col items-center w-[400px]'>
                        <div>big pict</div>
                    </div>
                    {console.log(product)}
                    <div className=' flex flex-col items-center gap-4 w-[400px] p-4'>
                        <div>{console.log(product[0])}
                            <h1 className='text-xl font-bold'>{product[0] ? product[0].product.products_name : null}</h1>
                            <p className='text-md'>{product[0] ? product[0].description : null}</p>
                        </div>
                        <div>
                            <h1 className='text-xl font-bold'>Rp. {product[0] ? product[0].price : null}</h1>
                        </div>
                        <div className=' p-2 flex bg-slate-200 gap-4 rounded-full'>
                            <button onClick={countPlusHandler}>+</button>
                            <div>{quantity}</div>
                            <button onClick={countMinHandler}>-</button>
                        </div>
                        <div>
                            <button className='bg-[#443C68] p-3 rounded-full text-white'>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* ads */}
            <div className=" w-[300px]">ads</div>
        </div>
        </>
    )
}