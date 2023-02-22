
export default function landingPage(){
    return(
        <>
        <div className='flex flex-col justify-center gap-3 px-5'>
            <div className="h-[400px] border">
                <div>banner</div>
            </div>
            <div className="h-[300px] border flex flex-col gap-10 items-center py-5">
                <div>Browse Category</div>
                <div className="flex gap-3">
                    <div className="border rounded-md w-[500px] h-[100px]">console</div>
                    <div className="border rounded-md w-[500px] h-[100px]">Games</div>
                    <div className="border rounded-md w-[500px] h-[100px]">Voucher Game</div>
                </div>
            </div>
            <div className="h-[450px] border p-5 flex flex-col gap-4">
                <h1 className="text-xl font-bold">Recommended for you</h1>
                <div className="flex gap-4">
                    {/* cards */}
                    <div className="h-[350px] w-[200px] flex flex-col gap-3 border rounded-lg drop-shadow-lg">
                        <div className="bg-slate-300 rounded-t-lg">
                            <img src="https://images.unsplash.com/photo-1626121496372-8e1b2e1b2b1f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="" className="h-[200px] w-[200px] rounded-t-lg"/>
                        </div>
                        <div className="flex gap-4 justify-around px-2">
                            <h2 className="text-sm ">Playstation 4 </h2>
                            <h2 className="text-sm">Rp.5.645.000</h2>
                        </div>
                        <div className="flex justify-center">
                            Tangerang Selatan
                        </div>
                        {/* <div className="flex justify-center">
                            <button className="bg-green-300 rounded-lg p-2 w-[150px]">add to cart</button>
                        </div> */}
                        <div>rating</div>
                    </div>
                    <div className="h-[350px] w-[200px] flex flex-col gap-3 border rounded-lg drop-shadow-lg">
                        <div className="bg-slate-300 rounded-t-lg">
                            <img src="https://images.unsplash.com/photo-1626121496372-8e1b2e1b2b1f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="" className="h-[200px] w-[200px] rounded-t-lg"/>
                        </div>
                        <div className="flex gap-4 justify-around px-2">
                            <h2 className="text-sm ">Nintendo Switch OLED </h2>
                            <h2 className="text-sm">Rp.4.765.000</h2>
                        </div>
                        <div className="flex justify-center">
                            Tangerang Selatan
                        </div>
                        {/* <div className="flex justify-center">
                            <button className="bg-green-300 rounded-lg p-2 w-[150px]">add to cart</button>
                        </div> */}
                        <div>rating</div>
                    </div>
                    <div className="h-[350px] w-[200px] flex flex-col gap-3 border rounded-lg drop-shadow-lg">
                        <div className="bg-slate-300 rounded-t-lg">
                            <img src="https://images.unsplash.com/photo-1626121496372-8e1b2e1b2b1f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="" className="h-[200px] w-[200px] rounded-t-lg"/>
                        </div>
                        <div className="flex gap-4 justify-around px-2">
                            <h2 className="text-sm ">Playstation 5 </h2>
                            <h2 className="text-sm">Rp.6.765.000</h2>
                        </div>
                        <div className="flex justify-center">
                            Tangerang Selatan
                        </div>
                        {/* <div className="flex justify-center">
                            <button className="bg-green-300 rounded-lg p-2 w-[150px]">add to cart</button>
                        </div> */}
                        <div>rating</div>
                    </div>
                </div>
            </div>
            <div className="h-[450px] border p-5 flex flex-col gap-4">
                <h1 className="text-xl font-bold">What's New</h1>
                <div className="flex gap-4">
                    {/* cards */}
                    <div className="h-[350px] w-[200px] flex flex-col gap-3 border rounded-lg drop-shadow-lg">
                        <div className="bg-slate-300 rounded-t-lg">
                            <img src="https://images.unsplash.com/photo-1626121496372-8e1b2e1b2b1f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="" className="h-[200px] w-[200px] rounded-t-lg"/>
                        </div>
                        <div className="flex gap-4 justify-around px-2">
                            <h2 className="text-sm ">Playstation 4 </h2>
                            <h2 className="text-sm">Rp.5.645.000</h2>
                        </div>
                        <div className="flex justify-center">
                            Tangerang Selatan
                        </div>
                        {/* <div className="flex justify-center">
                            <button className="bg-green-300 rounded-lg p-2 w-[150px]">add to cart</button>
                        </div> */}
                        <div>rating</div>
                    </div>
                    <div className="h-[350px] w-[200px] flex flex-col gap-3 border rounded-lg drop-shadow-lg">
                        <div className="bg-slate-300 rounded-t-lg">
                            <img src="https://images.unsplash.com/photo-1626121496372-8e1b2e1b2b1f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="" className="h-[200px] w-[200px] rounded-t-lg"/>
                        </div>
                        <div className="flex gap-4 justify-around px-2">
                            <h2 className="text-sm ">Nintendo Switch OLED </h2>
                            <h2 className="text-sm">Rp.4.765.000</h2>
                        </div>
                        <div className="flex justify-center">
                            Tangerang Selatan
                        </div>
                        {/* <div className="flex justify-center">
                            <button className="bg-green-300 rounded-lg p-2 w-[150px]">add to cart</button>
                        </div> */}
                        <div>rating</div>
                    </div>
                    <div className="h-[350px] w-[200px] flex flex-col gap-3 border rounded-lg drop-shadow-lg">
                        <div className="bg-slate-300 rounded-t-lg">
                            <img src="https://images.unsplash.com/photo-1626121496372-8e1b2e1b2b1f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="" className="h-[200px] w-[200px] rounded-t-lg"/>
                        </div>
                        <div className="flex gap-4 justify-around px-2">
                            <h2 className="text-sm ">Playstation 5 </h2>
                            <h2 className="text-sm">Rp.6.765.000</h2>
                        </div>
                        <div className="flex justify-center">
                            Tangerang Selatan
                        </div>
                        {/* <div className="flex justify-center">
                            <button className="bg-green-300 rounded-lg p-2 w-[150px]">add to cart</button>
                        </div> */}
                        <div>rating</div>
                    </div>
                </div>
            </div>
            <div className="h-[400px] border p-5">all products</div>
            <div className="h-[300px] border bg-slate-600 flex justify-around p-5">
                <div>
                    <h1 className="text-xl font-bold">Gamepedia</h1>
                    <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
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