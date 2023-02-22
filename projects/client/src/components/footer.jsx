

export default function Footer(){
    return(
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
    )
}