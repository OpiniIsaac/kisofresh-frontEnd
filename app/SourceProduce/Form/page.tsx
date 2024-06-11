"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const RequestQuoteForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cropType, setCropType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('delivery');
  const [desiredDeliveryDate, setDesiredDeliveryDate] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupQuantity, setPickupQuantity] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log({ name, email, cropType, quantity, message, deliveryOption, desiredDeliveryDate, deliveryLocation, pickupDate, pickupQuantity });
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <form
        onSubmit={handleSubmit}
        className="bg-blue-500/10 border hover:shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Delivery or Pickup
          </label>
          <div className="flex items-center">
            <input
              type="radio"
              id="delivery"
              name="deliveryOption"
              value="delivery"
              checked={deliveryOption === 'delivery'}
              onChange={(e) => setDeliveryOption(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="delivery" className="text-gray-700">Delivery</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="pickup"
              name="deliveryOption"
              value="pickup"
              checked={deliveryOption === 'pickup'}
              onChange={(e) => setDeliveryOption(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="pickup" className="text-gray-700">Pickup</label>
          </div>
        </div>

        {deliveryOption === 'delivery' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="desiredDeliveryDate">
                Desired Delivery Date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="desiredDeliveryDate"
                type="date"
                value={desiredDeliveryDate}
                onChange={(e) => setDesiredDeliveryDate(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deliveryLocation">
                Location to be Delivered to
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="deliveryLocation"
                type="text"
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                Quantity in tonnes
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="quantity"
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </>
        )}

        {deliveryOption === 'pickup' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pickupDate">
                Desired Pickup Date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="pickupDate"
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pickupQuantity">
                Quantity in tonnes
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="pickupQuantity"
                type="text"
                value={pickupQuantity}
                onChange={(e) => setPickupQuantity(e.target.value)}
              />
            </div>
          </>
        )}

        <div className="flex items-center justify-center pt-6">
          <Button type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RequestQuoteForm;
