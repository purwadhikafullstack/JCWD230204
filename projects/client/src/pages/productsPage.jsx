import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState, useRef } from 'react'

// import BannerVertical from './../assets/img/banner-vert-1.png'


export default function ProductPage(){
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const [filter, setFilter] = useState('productsName')
    // const [search, setSearch] = useState('')
    const [sort, setSort] = useState('name')
    const [sortType, setSortType] = useState('asc')
    
    const [page, setPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(8)

    const search = useRef()

    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem)
    const totalPage = Math.ceil(products.length / itemsPerPage)
    const paginate = (pageNumber) => setPage(pageNumber)

    const Navigate = useNavigate()

    let getProducts = async() => {
        try {
            const response = await axios.get(`http://localhost:8000/products/get?page=${page}sortBy=${sort}SortType=${sortType}filter=${filter}`)
            setProducts(response.data.data)
            
        } catch (error) {
            console.log(error)
        }
    }

    let getCategory = async() => {
        try{
            const response = await axios.get(`http://localhost:8000/products/getCat`)
            setCategory(response.data.data)
        } catch(error){
            console.log(error.message)
        }
    }

    useEffect(() => {
        getProducts()
        getCategory()
        handleSort()
    }, [ sort, sortType])

    const handleFilter = async() => {
        const inputSearch = search.current.value;
        console.log(filter, inputSearch)
        try{
            const response = await axios.get(`http://localhost:8000/products/get?filter=${filter}&search=${inputSearch}`);
            console.log(response.data.data)
            setProducts(response.data.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleSort = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/products/get?sortBy=${sort}&sortType=${sortType}`)
            console.log(response.data.data)
            setProducts(response.data.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    return(
        <>
        <div className="flex gap-4 bg-[#443C68] py-4">
            {/* sidebar nav */}
            <div className="w-[300px] p-4 flex flex-col gap-4 text-white ">
                <div>
                    <h1 className="text-xl font-bold ">Category</h1>
                    <ul>
                        {
                            category.map((cat, index) => {
                                return(
                                    <li key={index}>{cat.category}</li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className='flex flex-col gap-4'>
                    <div>
                        <h1 className='text-xl font-bold'>Sort by</h1>
                    </div>
                    <div className='flex flex-col align-center gap-4 text-black'>
                        <select value={sort} onChange={(event) => setSort(event.target.value)}>
                            <option value={'options'}>options</option>
                            <option value={'name'}>Name</option>
                            <option value={'price'}>Price</option>
                        </select>
                    </div>
                    <div className='flex flex-col align-center gap-4 text-black'>
                        <select value={sortType} onChange={(event) => setSortType(event.target.value)}>
                            <option value={'asc'}>ascending</option>
                            <option value={'desc'}>descending</option>
                        </select>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div>
                        <h1 className='text-xl font-bold'>Filter By</h1>
                    </div>
                    <div className='flex flex-col gap-3 text-black'>
                        <input type='text' ref={search} placeholder='filter...' className='rounded-lg h-[30px] pl-3'/>
                        <select value={filter} onChange={(event) => setFilter(event.target.value)}>
                            <option value={'ProductsName'}>Product Name</option>
                            <option value={'category'}>Category</option>
                        </select>
                        <button onClick={handleFilter} className="text-white">filter</button>
                    </div>
                </div>
                
            </div>
            {/* main content */}
            <div className=" w-[1000px] p-5 flex flex-col gap-4 mb-4 bg-[#393053] rounded-lg">
                <div>
                    <h1 className="text-xl text-white font-bold">Products</h1>
                </div>
                <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-3 relative z-0">
                    {
                        currentItems.length ? currentItems.map((product) => {
                            console.log(product.id)
                            return(
                                <div key={product.id} onClick={() => Navigate(`/Details/${product.id}`)}>
                                    
                                    <div className="h-[350px] w-[200px] flex flex-col gap-3 border rounded-lg drop-shadow-lg">
                                        <div className="bg-slate-300 rounded-t-lg">
                                            <img src={product.products_image} alt="" className="h-[200px] w-[200px] rounded-t-lg"/>
                                        </div>
                                        <div className="flex flex-col gap-4 justify-around text-white px-2">
                                            <h2 className="text-sm " key={product.id}>{product.products_name}</h2>
                                            {
                                                product.products_details.map((product, index) => {
                                                    return(
                                                        <h2 className="text-sm" key={index}>Rp.{parseInt(product.price).toLocaleString()}</h2>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : <h1>loading...</h1>
                    }
                </div>
                {/* pagination */}
                <div>
                    <div className="flex gap-4 p-2 border bg-slate-200 rounded-md">
                        {
                            Array.from({length: totalPage}, (_, index) => index + 1).map((page) => {
                                return(
                                    <button key={page} className="" onClick={() => paginate(page)}>{page}</button>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className=" w-[300px]">
                {/* <img src={BannerVertical} alt="" className='object-fill' /> */}
                <h1>banner</h1>
            </div>
        </div>
        </>
    )
}