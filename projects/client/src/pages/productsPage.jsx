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
        <div className="flex gap-4 mx-10">
            {/* sidebar nav */}
            <div className="border w-[300px] p-4 flex flex-col gap-4">
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
                <div className='flex flex-col'>
                    <div>
                        <h1 className='text-xl font-bold'>Sort by</h1>
                    </div>
                    <div className='flex gap-3'>
                        <select value={sort} onChange={(event) => setSort(event.target.value)}>
                            <option value={'options'}>options</option>
                            <option value={'name'}>Name</option>
                            <option value={'price'}>Price</option>
                        </select>
                    </div>
                    <div>
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
                    <div className='flex flex-col gap-3'>
                        <input type='text' ref={search} placeholder='filter...'/>
                        <select value={filter} onChange={(event) => setFilter(event.target.value)}>
                            <option value={'ProductsName'}>Product Name</option>
                            <option value={'category'}>Category</option>
                        </select>
                        <button onClick={handleFilter}>filter</button>
                    </div>
                </div>
                
            </div>
            {/* main content */}
            <div className="border w-[1000px] p-5 flex flex-col gap-4 mb-4">
                <div>
                    <h1 className="text-xl font-bold">Products</h1>
                </div>
                <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-3">
                    {
                        currentItems.length ? currentItems.map((product) => {
                            return(
                                <div key={product.id} onClick={() => Navigate(`/Details/${product.id}`)}>
                                    
                                    <div className="h-[350px] w-[200px] flex flex-col gap-3 border rounded-lg drop-shadow-lg">
                                        <div className="bg-slate-300 rounded-t-lg">
                                            <img src={product.products_image} alt="" className="h-[200px] w-[200px] rounded-t-lg"/>
                                        </div>
                                        <div className="flex gap-4 justify-around px-2">
                                            <h2 className="text-sm " key={product.id}>{product.products_name}</h2>
                                            {
                                                product.products_details.map((product, index) => {
                                                    return(
                                                        <h2 className="text-sm" key={index}>Rp.{product.price.toLocaleString()}</h2>
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
            <div className="border w-[300px]">
                {/* <img src={BannerVertical} alt="" className='object-fill' /> */}
                <h1>banner</h1>
            </div>
        </div>
        </>
    )
}