"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import swal from 'sweetalert';
import { getFirestore, collection, addDoc } from "firebase/firestore"; 
import { db } from '@/app/firebase/config';

interface Errors {
  desiredDeliveryDate?: string;
  deliveryLocation?: string;
  quantity?: string;
  pickupDate?: string;
  pickupQuantity?: string;
}

const RequestQuoteForm: React.FC = () => {
  const [quantity, setQuantity] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [deliveryOption, setDeliveryOption] = useState<string>('delivery');
  const [desiredDeliveryDate, setDesiredDeliveryDate] = useState<string>('');
  const [deliveryLocation, setDeliveryLocation] = useState<string>('');
  const [pickupDate, setPickupDate] = useState<string>('');
  const [pickupQuantity, setPickupQuantity] = useState<string>('');
  const [dueDiligence, setDueDiligence] = useState<boolean>(false);
  const [dueDiligenceTestType, setDueDiligenceTestType] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({});

  const [params, setParams] = useState<any>({});

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setParams({
      crop: searchParams.get('crop') || '',
      country: searchParams.get('country') || '',
      region: searchParams.get('region') || '',
      quantity: searchParams.get('quantity') || ''
    });
  }, []);

  const validateForm = (): Errors => {
    const newErrors: Errors = {};

    if (deliveryOption === 'delivery') {
      if (!desiredDeliveryDate) newErrors.desiredDeliveryDate = "Desired delivery date is required";
      if (!deliveryLocation) newErrors.deliveryLocation = "Delivery location is required";
      if (!quantity) newErrors.quantity = "Quantity is required";
    } else if (deliveryOption === 'pickup') {
      if (!pickupDate) newErrors.pickupDate = "Pickup date is required";
      if (!pickupQuantity) newErrors.pickupQuantity = "Pickup quantity is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      swal({
        title: "Form Error",
        text: "Please fill in all required fields.",
        icon: "error",
      });
      return;
    }
  
    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          crop: params.crop,
          country: params.country,
          region: params.region,
          initialQuantity: params.quantity,
          quantity,
          message,
          deliveryOption,
          desiredDeliveryDate,
          deliveryLocation,
          pickupDate,
          pickupQuantity,
          dueDiligence,
          dueDiligenceTestType,
        }),
      });
  
      if (response.ok) {
        swal({
          title: "Form Submitted",
          text: "Your quote request has been submitted successfully.",
          icon: "success",
        });
        resetForm();
      } else {
        const errorData = await response.json();
        swal({
          title: "Submission Error",
          text: `There was an error submitting your request: ${errorData.message}. Please try again.`,
          icon: "error",
        });
      }
    } catch (error) {
      swal({
        title: "Submission Error",
        text: "There was an error submitting your request. Please try again.",
        icon: "error",
      });
    }
  };
  

  const resetForm = () => {
    setQuantity('');
    setMessage('');
    setDeliveryOption('delivery');
    setDesiredDeliveryDate('');
    setDeliveryLocation('');
    setPickupDate('');
    setPickupQuantity('');
    setDueDiligence(false);
    setDueDiligenceTestType('');
    setErrors({});
  };

  return (
    <div className="flex items-center justify-center w-full h-full  m-5">
      <form
        onSubmit={handleSubmit}
        className="bg-blue-500/10 border hover:shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Due Diligence Testing
          </label>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="dueDiligence"
              checked={dueDiligence}
              onChange={(e) => setDueDiligence(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="dueDiligence" className="text-gray-700">Request testing (e.g., avocado oil content, coffee quality)</label>
          </div>
          {dueDiligence && (
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDiligenceTestType">
                Type of Test
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="dueDiligenceTestType"
                type="text"
                value={dueDiligenceTestType}
                onChange={(e) => setDueDiligenceTestType(e.target.value)}
              />
            </div>
          )}
        </div>

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
              {errors.desiredDeliveryDate && <p className="text-red-500 text-xs mt-1">{errors.desiredDeliveryDate}</p>}
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
              {errors.deliveryLocation && <p className="text-red-500 text-xs mt-1">{errors.deliveryLocation}</p>}
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
              {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
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
              {errors.pickupDate && <p className="text-red-500 text-xs mt-1">{errors.pickupDate}</p>}
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
              {errors.pickupQuantity && <p className="text-red-500 text-xs mt-1">{errors.pickupQuantity}</p>}
            </div>
          </>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

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
