import axios from 'axios';
import { useState, useEffect } from 'react';

export default function LandingPage(){
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cart, setCart] = useState([]);
    const [promo, setPromo] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [newProducts, setNewProducts] = useState([]);

    let getProducts = async() => {
        let response = await axios.get('http://localhost:5000/products/');
        console.log(response.data[0]);
        setProducts(response.data);
    }

    let getCategories = async() => {
        let response = await axios.get('http://localhost:5000/categories/');
        console.log(response.data[0]);
        setCategories(response.data);
    }

    let getPromo = async() => {
        let response = await axios.get('http://localhost:5000/promo/');
        console.log(response.data[0]);
        setPromo(response.data);
    }

    let getRecommended = async() => {
        let response = await axios.get('http://localhost:5000/recommended/');
        console.log(response.data[0]);
        setRecommended(response.data);
    }

    let getNewProducts = async() => {
        let response = await axios.get('http://localhost:5000/newProducts/');
        console.log(response.data[0]);
        setNewProducts(response.data);
    }

    useEffect(() => {
        getProducts();
        getCategories();
    }, [])

    return(
        <>
        <div className='flex flex-col justify-center gap-3 px-5'>
            <div className="h-[400px] border">
                <div>banner</div>
            </div>
            {/* categories */}
            <div className="h-[300px] border flex flex-col gap-10 items-center py-5">
                <div className="text-xl font-bold">Browse Category</div>
                <div className="flex gap-3">
                    {
                        categories.map((value, index) => {
                            return(
                                <>
                                <div className="border rounded-md w-[500px] h-[100px]">{value.categories_name}</div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
            {/* recommended for you */}
            <div className="h-[450px] border p-5 flex flex-col gap-4">
                <h1 className="text-xl font-bold">Recommended for you</h1>
                <div className="flex gap-4">
                    {
                        recommended.map((value,index) => {
                            return(
                                <>
                                <div className="h-[350px] w-[200px] flex flex-col gap-3 border rounded-lg drop-shadow-lg">
                                    <div className="bg-slate-300 rounded-t-lg">
                                        <img src="https://images.unsplash.com/photo-1626121496372-8e1b2e1b2b1f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="" className="h-[200px] w-[200px] rounded-t-lg"/>
                                    </div>
                                    <div className="flex gap-4 justify-around px-2">
                                        <h2 className="text-sm ">{value.products_name}</h2>
                                        <h2 className="text-sm">Rp.{value.products_price.toLocaleString()}</h2>
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
                <div className="flex gap-4">
                    {
                        newProducts.map((value,index) => {
                            return(
                                <>
                                <div className="h-[350px] w-[200px] flex flex-col gap-3 border rounded-lg drop-shadow-lg">
                                    <div className="bg-slate-300 rounded-t-lg">
                                        <img src="https://images.unsplash.com/photo-1626121496372-8e1b2e1b2b1f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="" className="h-[200px] w-[200px] rounded-t-lg"/>
                                    </div>
                                    <div className="flex gap-4 justify-around px-2">
                                        <h2 className="text-sm ">{value.products_name}</h2>
                                        <h2 className="text-sm">Rp.{value.products_price.toLocaleString()}</h2>
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
            {/* promo */}
            <div className="h-[450px] border p-5 flex flex-col gap-4">
                <h1 className="text-xl font-bold ">Promo</h1>
                <div className="flex gap-4">
                    {
                        promo.map((value, index) => {
                            return(
                                <>
                                <div className="h-[350px] w-[200px] flex flex-col gap-3 border rounded-lg drop-shadow-lg">
                                    <div className="bg-slate-300 rounded-t-lg">
                                        <img src="https://images.unsplash.com/photo-1626121496372-8e1b2e1b2b1f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="" className="h-[200px] w-[200px] rounded-t-lg"/>
                                    </div>
                                    <div className="flex gap-4 justify-around px-2">
                                        <h2 className="text-sm ">{value.products_name}</h2>
                                        <h2 className="text-sm">Rp.{value.products_price.toLocaleString()}</h2>
                                    </div>
                                    <div className="flex justify-center">
                                        {value.store_location}
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
                    <div className="grid grid-cols-7 gap-4">
                            {
                                products.map((value, index) => {
                                    return(
                                        <>
                                        <div className="h-[350px] w-[200px] flex flex-col gap-3 border rounded-lg drop-shadow-lg">
                                            <div className="bg-slate-300 rounded-t-lg">
                                                <img src={value.products_image} alt="" className="h-[200px] w-[200px] rounded-t-lg"/>
                                            </div>
                                            <div className="flex gap-4 justify-around px-2">
                                                <h2 className="text-sm " key={index}>{value.products_name}</h2>
                                                <h2 className="text-sm" key={index}>Rp.{value.products_price.toLocaleString()}</h2>
                                            </div>
                                            <div className="flex justify-center">
                                                Tangerang Selatan
                                            </div>
                                        </div>
                                        </>
                                    )
                                })
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