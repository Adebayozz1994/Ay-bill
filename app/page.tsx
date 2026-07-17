"use client";

import React, { useState } from 'react';

export default function DogBillOfSaleDocument() {
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("Sending document...");

    const formData = new FormData(e.currentTarget);
    // Add your Web3Forms Access Key here
    formData.append("access_key", "8dd10863-49ed-431c-b9a8-75ff676d2fd0"); 

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("Bill of Sale submitted successfully!");
        (e.target as HTMLFormElement).reset(); // Clear the form
      } else {
        console.error("Error", data);
        setStatus("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error", error);
      setStatus("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setStatus(null);
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3ebe9] py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-900">
      <div className="max-w-212.5 mx-auto">
        
        {/* Massive Outside Header */}
        <h1 className="text-5xl md:text-7xl font-black text-[#402a26] mb-8 tracking-tight">
          Dog/Puppy Bill of Sale
        </h1>

        {/* White Document Paper */}
        <div className="bg-white p-8 md:p-16 shadow-md rounded-sm">
          
          <h2 className="text-xl md:text-2xl font-bold text-center mb-8">
            Dog/Puppy Bill of Sale
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Agreement Intro */}
            <div className="text-[15px] leading-loose">
              This Bill of Sale (&quot;Agreement&quot;) is made and entered into on 
              <span className="font-bold inline-flex items-center">
                [<input 
                  type="date" 
                  name="agreement_date" 
                  required 
                  className="font-bold outline-none bg-transparent text-center px-1 text-[15px]" 
                />]
              </span> 
              by and between:
            </div>

            {/* Seller Info */}
            <div className="mt-6 w-full max-w-lg space-y-1">
              <InlineInput label="Seller's Name" name="seller_name" required />
              <InlineInput label="Address" name="seller_address" required />
              <InlineInput label="Phone" name="seller_phone" type="tel" required />
              <InlineInput label="Email" name="seller_email" type="email" required />
            </div>

            <div className="my-5 text-[15px]">And</div>

            {/* Buyer Info */}
            <div className="w-full max-w-lg space-y-1">
              <InlineInput label="Buyer's Name" name="buyer_name" required />
              <InlineInput label="Address" name="buyer_address" required />
              <InlineInput label="Phone" name="buyer_phone" type="tel" required />
              <InlineInput label="Email" name="buyer_email" type="email" required />
            </div>

            {/* Description Info */}
            <div className="mt-8">
              <div className="text-[15px] mb-2">[Description of Dog/Puppy]</div>
              <div className="w-full max-w-md space-y-0.5">
                <BulletInput label="Name" name="dog_name" required />
                <BulletInput label="Breed" name="dog_breed" required />
                <BulletInput label="Gender" name="dog_gender" required />
                <BulletInput label="Age" name="dog_age" required />
                <BulletInput label="Color" name="dog_color" required />
                <BulletInput label="Weight" name="dog_weight" required />
                <BulletInput label="Markings" name="dog_markings" />
                <BulletInput label="Microchip Number (if any)" name="dog_microchip" />
                <BulletInput label="Registration Number (if any)" name="dog_registration" />
              </div>
            </div>

            {/* Purchase Price */}
            <div className="mt-6 text-[15px]">
              <div className="font-bold mb-1">[Purchase Price]</div>
              <div className="leading-loose">
                The Buyer agrees to pay the Seller the sum of $
                <span className="font-bold inline-flex items-center">
                  [<input 
                    type="text" 
                    name="purchase_price" 
                    value="300" 
                    readOnly 
                    required 
                    className="w-10 font-bold outline-none text-center bg-transparent cursor-not-allowed text-[15px]" 
                  />]
                </span> 
                for the Dog/Puppy.
              </div>
            </div>

            {/* Payment Section */}
            <div className="mt-4 text-[15px]">
              <div className="font-bold mb-1">[Payment]</div>
              <div className="leading-loose">
                The Buyer shall pay half of the Purchase Price to the Seller on or before delivery or pick up 
                <span className="font-bold inline-flex items-center ml-2">
                  [<input 
                    type="date" 
                    name="delivery_date" 
                    required 
                    className="font-bold outline-none bg-transparent text-center px-1 text-[15px]" 
                  />]
                </span>.
              </div>
              <div className="mt-3 flex items-center">
                <span className="mr-2">Payment method</span>
                <select 
                  name="payment_method" 
                  required 
                  className="border-b border-gray-400 font-bold outline-none bg-transparent py-0.5 px-2 text-[15px]"
                >
                  <option value="" disabled hidden>Select</option>
                  <option value="BTC">BTC</option>
                  <option value="APPLE PAY">APPLE PAY</option>
                  <option value="CHIME">CHIME</option>
                  <option value="VENMO">VENMO</option>
                </select>
              </div>
            </div>

            {/* Transfer of Ownership */}
            <div className="mt-6 text-[15px]">
              <div className="font-bold mb-1">[Transfer of Ownership]</div>
              <div className="leading-relaxed">
                The Seller hereby transfers and conveys to the Buyer all right, title, and interest in and to the Dog, free and clear of all liens and encumbrances.
              </div>
            </div>

            {/* Representations and Warranties */}
            <div className="mt-4 text-[15px]">
              <div className="font-bold mb-1">[Representations and Warranties of the Seller]</div>
              <div className="leading-relaxed">
                The Seller represents and warrants to the Buyer that the Dog is in good health and has no known health problems. The Seller further represents and warrants that the Dog is not subject to any liens or encumbrances and that the Seller has the right to sell the Dog.
              </div>
            </div>
            
            {/* Page Number mimicking the image */}
            <div className="text-center text-xs font-bold mt-10 mb-6">
              1/2
            </div>

            {/* Submit Action Area (Below the official document content) */}
            <div className="pt-8 mt-12 border-t border-gray-200 flex flex-col items-center">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full md:w-auto min-w-62.5 bg-[#402a26] hover:bg-[#2c1d1a] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
              
              {status && (
                <p className={`mt-4 text-center text-sm font-medium ${status.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
                  {status}
                </p>
              )}
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

/* --- Sub-Components to perfectly match the inline underline style --- */

function InlineInput({ label, name, type = "text", required = false }: { label: string, name: string, type?: string, required?: boolean }) {
  return (
    <div className="flex items-end mb-2 text-[15px]">
      <label className="whitespace-nowrap mr-2">{label}:</label>
      <input 
        type={type} 
        name={name} 
        required={required}
        className="grow border-b border-gray-300 bg-transparent outline-none px-2 text-[15px] font-bold pb-0.5"
      />
    </div>
  );
}

function BulletInput({ label, name, required = false }: { label: string, name: string, required?: boolean }) {
  return (
    <div className="flex items-end mb-1 text-[15px]">
      <span className="mr-2">&bull; {label}:</span>
      <input 
        type="text" 
        name={name} 
        required={required}
        className="grow border-b border-gray-300 bg-transparent outline-none px-2 text-[15px] font-bold pb-0.5"
      />
    </div>
  );
}