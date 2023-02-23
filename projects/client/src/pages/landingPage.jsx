import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Banner from '../assets/img/banner.png';

export default function LandingPage(){
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cart, setCart] = useState([]);
    const [promo, setPromo] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [newProducts, setNewProducts] = useState([]);

    let getProducts = async() => {
        let response = await axios.get('http://localhost:8000/products/get');
        console.log(response.data.data);
        setProducts(response.data.data);
    }

    let getCategories = async() => {
        let response = await axios.get('http://localhost:8000/products/getCat');
        console.log(response.data.data);
        setCategories(response.data.data);
    }

    let getPromo = async() => {
        let response = await axios.get('http://localhost:5000/promo/');
        console.log(response.data);
        setPromo(response.data);
    }

    let getRecommended = async() => {
        let response = await axios.get('http://localhost:5000/recomendedProducts/');
        console.log(response.data);
        setRecommended(response.data);
    }

    let getNewProducts = async() => {
        let response = await axios.get('http://localhost:5000/newProducts/');
        console.log(response.data);
        setNewProducts(response.data);
    }

    useEffect(() => {
        getProducts();
        getCategories();
        getPromo();
        getRecommended();
        getNewProducts();
    }, [])

    return(
        <>
        <div className='flex flex-col justify-center gap-3 px-6'>
            {/* banner */}
            <div className="h-[400px] flex justify-center">
                <img src={Banner} alt="" className="h-[400px] object-scale-down"/>
            </div>
            {/* categories */}
            <div className="h-[300px] border flex flex-col gap-10 items-center py-5">
                <div className="text-xl font-bold">Browse Category</div>
                <div className="flex gap-3">
                    {
                        categories ? categories.map((value, index) => {
                            return(
                                <>
                                <Link to={null}>
                                <div className="border rounded-md w-[500px] h-[100px] bg-slate-200 hover:bg-slate-100" key={index}>
                                    <div className="text-center font-bold text-2xl">
                                        {value.category}
                                    </div>
                                    
                                </div>
                                </Link>
                                </>
                            )
                        }) : <h1>No Product Found!</h1>
                    }
                </div>
            </div>
            {/* recommended for you */}
            <div className="h-[450px] border p-5 flex flex-col gap-4">
                <h1 className="text-xl font-bold">Recommended for you</h1>
                <div className="grid xl:grid-cols-7 md:grid-cols-3 gap-4">
                    {
                        recommended.map((value,index) => {
                            return(
                                <>
                                <div className="h-[350px] w-[200px] flex flex-col gap-3 border rounded-lg drop-shadow-lg">
                                    <div className="bg-slate-300 rounded-t-lg">
                                        <img src="https://images.unsplash.com/photo-1626121496372-8e1b2e1b2b1f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="" className="h-[200px] w-[200px] rounded-t-lg"/>
                                    </div>
                                    <div className="flex gap-4 justify-around px-2">
                                        <h2 className="text-sm " key={index}>{value.products_name}</h2>
                                        <h2 className="text-sm" key={index}>Rp.{value.products_price.toLocaleString()}</h2>
                                    </div>
                                    <div className="flex justify-center">
                                        Tangerang Selatan
                                    </div>
                                    {/* <div className="flex justify-center">
                                        <button className="bg-green-300 rounded-lg p-2 w-[150px]">add to cart</button>
                                    </div> */}
                                    <div>rating</div>
                                </div>
                                </>
                            )
                        })
                    }
                    {/* cards */}
                    
                    
                </div>
            </div>
            {/* new products */}
            <div className="h-[450px] border p-5 flex flex-col gap-4">
                <h1 className="text-xl font-bold">What's New</h1>
                <div className="grid xl:grid-cols-7 md:grid-cols-3 gap-4">
                    {
                        newProducts.map((value,index) => {
                            return(
                                <>
                                <Link to={null}>
                                <div className="h-[350px] w-[200px] flex flex-col gap-3 border rounded-lg drop-shadow-lg">
                                    <div className="bg-slate-300 rounded-t-lg">
                                        <img src="https://images.unsplash.com/photo-1626121496372-8e1b2e1b2b1f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="" className="h-[200px] w-[200px] rounded-t-lg"/>
                                    </div>
                                    <div className="flex gap-4 justify-around px-2">
                                        <h2 className="text-sm " key={index}>{value.products_name}</h2>
                                        <h2 className="text-sm" key={index}>Rp.{value.products_price.toLocaleString()}</h2>
                                    </div>
                                    <div className="flex justify-center">
                                        Tangerang Selatan
                                    </div>
                                    {/* <div className="flex justify-center">
                                        <button className="bg-green-300 rounded-lg p-2 w-[150px]">add to cart</button>
                                    </div> */}
                                </div>
                                </Link>
                                
                                </>
                            )
                        })
                    }
                    {/* cards */}
                    
                    
                </div>
            </div>
            {/* promo */}
            <div className="h-[450px] border p-5 flex flex-col gap-4">
                <h1 className="text-xl font-bold ">Promo</h1>
                <div className="grid xl:grid-cols-7 md:grid-cols-3 gap-4">
                    {
                        promo.map((value, index) => {
                            return(
                                <>
                                <div className="h-[350px] w-[200px] flex flex-col gap-3 border rounded-lg drop-shadow-lg">
                                    <div className="bg-slate-300 rounded-t-lg">
                                        <img src="https://images.unsplash.com/photo-1626121496372-8e1b2e1b2b1f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="" className="h-[200px] w-[200px] rounded-t-lg"/>
                                    </div>
                                    <div className="flex gap-4 justify-around px-2">
                                        <h2 className="text-sm " key={index}>{value.promo_name}</h2>
                                        {/* <h2 className="text-sm" key={index}>Rp.{}</h2> */}
                                    </div>
                                    <div className="flex justify-center" key={index}>
                                        {/* {value.store_location} */}
                                    </div>
                                    {/* <div className="flex justify-center">
                                        <button className="bg-green-300 rounded-lg p-2 w-[150px]">add to cart</button>
                                    </div> */}
                                </div>
                                </>
                            )
                        })
                    }
                    {/* cards */}
                    
                    
                </div>
            </div>
            {/* all products */}
            <div className=" border p-5 flex flex-col gap-4">
                <h1 className="text-xl font-bold">All Products</h1>
                    <div className="grid xl:grid-cols-7 md:grid-cols-3 gap-4">
                            {
                                products.length ? products.map((value, index) => {
                                    return(
                                        <>
                                        <Link to={null}>
                                        <div className="h-[350px] w-[200px] flex flex-col gap-3 border rounded-lg drop-shadow-lg">
                                            <div className="bg-slate-300 rounded-t-lg">
                                                <img src={value.products_image} alt="" className="h-[200px] w-[200px] rounded-t-lg"/>
                                            </div>
                                            <div className="flex gap-4 justify-around px-2">
                                                <h2 className="text-sm " key={index}>{value.products_name}</h2>
                                                {
                                                    value.products_details.map((value, index) => {
                                                        return(
                                                            <h2 className="text-sm" key={index}>Rp.{value.price.toLocaleString()}</h2>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className="flex justify-center">
                                                Tangerang Selatan
                                            </div>
                                        </div>
                                        </Link>
                                        </>
                                    )
                                }) : <h1>No Product Found!</h1>
                            }
                    </div>
            </div>
            {/* footer */}
            <div className="h-[300px] border bg-slate-600 flex justify-around p-5">
                <div>
                    <h1 className="text-xl font-bold">Gamepedia</h1>
                    <p className="text-sm">One stop service for all gaming stuff</p>
                    <p>email: support@gamepedia.com phone: (021)123456789</p>
                    <p>copyright 2023</p>
                </div>
                <div>
                <ul className="flex flex-col gap-5">
                    <li className="hover:text-white">Categories</li>
                    <li className="hover:text-white">Deals</li>
                    <li className="hover:text-white">What's New</li>
                    <li className="hover:text-white">Delivery</li>
                    <li className="hover:text-white">Accounts</li>
                </ul>
                </div>
            </div>
        </div>
        </>
    )
}