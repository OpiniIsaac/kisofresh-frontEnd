'use client'
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
 const [pickupLocation, setPickupLocation] = useState('');

 const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log({ name, email, cropType, quantity, message, deliveryOption, desiredDeliveryDate, pickupLocation });
 };

 return (
    <div className="flex w-full justify-center h-full items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-blue-500/10 border hover:shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg h-[450px]"
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

        {/* Desired Delivery Date */}
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
           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="desiredDeliveryDate">
             Location To be Delivered to 
           </label>
           <input
             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             id="desiredDeliveryDate"
             type="text"
             value={desiredDeliveryDate}
             onChange={(e) => setDesiredDeliveryDate(e.target.value)}
           />
         </div>
         </>
        )}

        {/* Pickup Location */}
        {deliveryOption === 'pickup' && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pickupLocation">
            Desired PickUp Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="pickupLocation"
              type="date"
              placeholder="Enter pickup location"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            />
          </div>
        )}

        {/* Submit button */}
        <div className="flex items-center justify-center  pt-6">
          <Button type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
 );
};

export default RequestQuoteForm;
