import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

import ConfirmationModal from '../components/confirmationModal';

export default function CheckoutPage(){
    // const [cart, setCart] = useState([])
    // const [cartId, setCartId] = useState(0)
    // const [shipping, setShipping] = useState([])
    const [city, setCity] = useState([])
    const [state, setState] = useState([])
    const [province, setProvince] = useState([])
    const [destination, setDestination] = useState([])
    const [service, setService] = useState([])
    const [services, setServices] = useState([])
    const [courier, setCourier] = useState([])
    const [ongkir, setOngkir] = useState(0)
    const [subtotal, setSubtotal] = useState(0)
    const [total, setTotal] = useState(0)
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)

    const { id } = useParams()

    const inputAddress = useRef('')
    const inputZip = useRef('')
    const inputCountry = useRef('')

    const Navigate = useNavigate()

    const getCart = async() => {
        try {
            const response = await axios.get(`http://localhost:8000/products/Cart?id=${id}`)
            console.log(response.data.data)
            let subtotal = 0;
            let total = 0;
            response.data.data.forEach((value) => {
                subtotal += value.product.products_details[0].price * value.qty;
            })
            setSubtotal(subtotal)
            total = parseInt(subtotal) + parseInt(ongkir)
            setTotal(total)
            
        } catch (error) {
            console.log(error.message)
        }
    }

    const PlaceOrder = async() => {

        const token = localStorage.getItem('token')

        try{
            const response = await axios.post('http://localhost:8000/transaction/order', {
                cartItem: id,
                address: inputAddress.current.value,
                city: destination,
                state: province,
                zip: inputZip.current.value,
                country: inputCountry.current.value,
                shipping: courier,
                total: total
            }, {
                headers: {token}
            })
            console.log(response)
            toast("Order Placed")
        }
        catch(error){
            console.log(error.message)
        }

    }

    const getCity = async() => {
        try {
            const response =await axios.get('http://localhost:8000/rajaOngkir/api/city')
            console.log(response.data.data)
            setCity(response.data.data)

        } catch (error) {
            console.log(error.message)
        }
    }

    const getProvince = async() => {
        try {
            const response =await axios.get('http://localhost:8000/rajaOngkir/api/province')
            console.log(response.data.data)
            setState(response.data.data)

        } catch (error) {
            console.log(error.message)
        }
    }

    const getOngkir = async() => {
        try {
            const response = await axios.post(`http://localhost:8000/rajaOngkir/api/ongkir`, {
                origin: 501,
                destination: destination,
                weight: 1700,
                courier: courier
            })
            console.log(response.data.data[0].costs)
            setService(response.data.data[0].costs)
        } catch (error) {
            console.log(error.message)
        }

    }
    useEffect(() => {
        // getCart()
        getCity()
        getProvince()
    }, [])

    const handleDestinationChange = (event) => {
        setDestination(event.target.value)
       
    }

    const handleCourierChange = (event) => {
        setCourier(event.target.value)
       
    }

    const handleServicesChange = (event) => {
        setOngkir(event.target.value)

    }

    const handleProvinceChange = (event) => {
        setProvince(event.target.value)
    }



    return(
        <>
        {ongkir}
        <div className="flex justify-center bg-[#261C2C] p-4">
            <div className="flex gap-10 justify-center p-5 bg-white w-[1200px] m-12 rounded-lg">
                <div className="flex flex-col gap-4">
                    <h1>Shipping</h1>
                    <input ref={inputAddress} type='text' placeholder='address'/>
                    {/* show city and select destination */}
                    <select onChange={handleDestinationChange}>
                        <option value=''>Select City</option>
                        {
                            city.map((value, index) => {
                                return(
                                    <option key={index} value={value.city_id}>{value.city_name}</option>
                                )
                            })
                        }
                    </select>
                    {/* show state and select state */}
                    <select onChange={handleProvinceChange}>
                        <option value=''>Select State/province</option>
                        {
                            state.map((value, index) => {
                                return(
                                    <option key={index} value={value.province_id}>{value.province}</option>
                                )
                            })
                        }
                    </select>
                    <input ref={inputZip} type='text' placeholder='zip code'/>
                    <input ref={inputCountry} type='text' placeholder='country'/>
                    {/* show courier and select courier */}
                    <select onChange={handleCourierChange}>
                        <option value=''>Select Shipping Method</option>
                        <option value='jne'>JNE</option>
                        <option value='pos'>POS Indonesia</option>
                        <option value='tiki'>TIKI</option>
                    </select>
                    {/* show service and select service */}
                    <select onChange={handleServicesChange}>
                        <option value=''>Select Service</option>
                        {
                            service.map((value, index) => {
                                return(
                                    <option key={index} value={value.cost[0].value}>{value.service}  Rp.{value.cost[0].value.toLocaleString()}</option>
                                )
                            })
                        }
                    </select>
                    <button onClick={getOngkir} className="p-5 bg-green-300 rounded-lg">Get Ongkir</button>
                </div>
                <div className='flex flex-col gap-4'>
                    <h1>Payment</h1>
                    <p>Bank Mandiri a/n Fauzan 4000388388747475849</p>
                    <p>Bank BCA a/n Putri 299300039940934343</p>
                </div>
                <div className='flex flex-col gap-4'>
                    <h1>Order Summary</h1>
                    <p>Subtotal : {subtotal}</p>
                    <p>Shipping : Rp.{parseInt(ongkir).toLocaleString()}</p>
                    <p>Total    : {total}</p>
                    <button onClick={() => {setShowConfirmationModal(true)}} className="p-5 bg-green-300 rounded-lg">Checkout</button>
                </div>
            </div>
            {showConfirmationModal && (
                <ConfirmationModal
                message="are you sure you want to perform this transaction?"
                onConfirm={() => {
                    PlaceOrder()
                    Navigate('/uploadPayment')
                    setShowConfirmationModal(false)
                }}
                onCancel={() => {
                    setShowConfirmationModal(false)
                    setTimeout(() => {
                        Navigate('/cart')
                    }, 1000)
                    
                }}
                />
            )
            }
            <Toaster/>
        </div>
        </>
    )
}