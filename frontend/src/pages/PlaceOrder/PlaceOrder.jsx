import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../components/context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    const orderItems = food_list
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({
        ...item,
        quantity: cartItems[item._id]
      }));

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
      payment: paymentMethod
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token }
      });

      if (response.data.success) {
        if (paymentMethod === 'online') {
          window.location.replace(response.data.session_url);
        } else {
          const query = new URLSearchParams({
            name: `${data.firstName} ${data.lastName}`,
            address: `${data.street}, ${data.city}, ${data.state}`,
            phone: data.phone,
            pincode: data.zipcode,
            payment: 'cod'
          }).toString();
          navigate(`/order-confirmation?${query}`);
        }
      } else {
        alert('Payment session creation failed.');
      }
    } catch (err) {
      alert('Order failed. Please try again.');
      console.error(err);
    }
  };

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token, getTotalCartAmount, navigate]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input name="firstName" required value={data.firstName} onChange={onChangeHandler} type="text" placeholder="First Name" />
          <input name="lastName" required value={data.lastName} onChange={onChangeHandler} type="text" placeholder="Last Name" />
        </div>
        <input name="email" required value={data.email} onChange={onChangeHandler} type="email" placeholder="Email Address" />
        <input name="street" required value={data.street} onChange={onChangeHandler} type="text" placeholder="Street" />
        <div className="multi-fields">
          <input name="city" required value={data.city} onChange={onChangeHandler} type="text" placeholder="City" />
          <input name="state" required value={data.state} onChange={onChangeHandler} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input name="zipcode" required value={data.zipcode} onChange={onChangeHandler} type="text" placeholder="Zip Code" />
          <input name="country" required value={data.country} onChange={onChangeHandler} type="text" placeholder="Country" />
        </div>
        <input name="phone" required value={data.phone} onChange={onChangeHandler} type="text" placeholder="Phone" />

        <p className="title">Payment Method</p>
        <div className="payment-method-options">
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={() => setPaymentMethod('cod')}
            />{' '}
            Cash on Delivery
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="online"
              checked={paymentMethod === 'online'}
              onChange={() => setPaymentMethod('online')}
            />{' '}
            Online Payment
          </label>
        </div>
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-detail">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-detail">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
          </div>
          <hr />
          <div className="cart-total-detail">
            <b>Total</b>
            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

