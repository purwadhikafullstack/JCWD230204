import { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineArrowRight, AiFillDelete } from "react-icons/ai";
import { useParams } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState(0);
  const [newQuantity, setNewQuantity] = useState(1);
  const [total, setTotal] = useState(0);

  const { id } = useParams();

  const getCart = async () => {
    //add to cart function
    try {
      const response = await axios.get(
        `http://localhost:8000/products/Cart?id=${id}`
      );
      // console.log(response.data.data[0].id)
      setCart(response.data.data);
      setCartId(response.data.data[0].id);
      setNewQuantity(response.data.data[0].qty);
      console.log(response.data.data[0].qty);
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeFromCart = async () => {
    //remove from cart function
    try {
      await axios.delete(
        `http://localhost:8000/products/Cart/delete?id=${cartId}`
      );
      getCart();
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateQty = async (id, option) => {
    //update cart automatically updates qty
    try {
      await axios.get(
        `http://localhost:8000/products/update?id=${id}&option=${option}`
      );
      getCart();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    //get cart from db
    getCart();
  }, []);

  return (
    <>
      <div className="flex justify-center m-5 gap-3">
        <div className="flex flex-col border-b-2 p-9 w-[500px] h-[600px] gap-4">
          <h1 className="text-2xl font-bold border-b-2 border-black">Cart</h1>
          <table className="table-auto">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((value, index) => {
                return (
                  <tr key={value.id}>
                    <td>{value.product.products_name}</td>
                    <td>
                      Rp.
                      {parseInt(
                        value.product.products_details[0].price
                      ).toLocaleString()}
                    </td>
                    <td>
                      <div className="flex gap-3">
                        <button onClick={() => updateQty(value.id, "min")}>
                          -
                        </button>
                        <div>{value.qty}</div>
                        <button onClick={() => updateQty(value.id, "plus")}>
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      <button onClick={removeFromCart}>
                        <AiFillDelete />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="border-b-2 p-6 flex flex-col gap-4 w-[300px] h-[400px] ">
            <div className="text-2xl font-bold border-b-2 border-black">Summary</div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>total price</td>
                        <td>Rp.0</td>
                    </tr>
                    <tr>
                        <td>discount</td>
                        <td>Rp.0</td>
                    </tr>
                    <tr>
                        <td>subtotal</td>
                        <td>Rp.0</td>
                    </tr>
                </tbody>
            </table>
            <button className="self-end flex items-center gap-3">
                <div>checkout</div>
                <div>
                <AiOutlineArrowRight />
                </div>
          </button>
        </div>
      </div>
    </>
  );
}
