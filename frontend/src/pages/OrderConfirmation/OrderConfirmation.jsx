import { useSearchParams } from 'react-router-dom';

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();

  const name = searchParams.get('name');
  const address = searchParams.get('address');
  const phone = searchParams.get('phone');
  const pincode = searchParams.get('pincode');
  const payment = searchParams.get('payment');

  return (
    <div className="confirmation-page">
      <h2>🎉 Order Placed Successfully!</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Address:</strong> {address}</p>
      <p><strong>Phone:</strong> {phone}</p>
      <p><strong>Pin Code:</strong> {pincode}</p>
      <p><strong>Payment:</strong> {payment === 'cod' ? 'Cash on Delivery' : 'Paid Online'}</p>
    </div>
  );
};

export default OrderConfirmation;