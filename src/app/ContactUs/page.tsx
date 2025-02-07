import React from "react";

const ContactPage = () => {
  return (
    <div className='bg-black' id='Contact'> 
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-semibold text-center mb-6">Contact Us</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Phone Number</label>
            <p className="text-lg font-medium text-gray-800">0315-024-9953</p>
          </div>
          <div className="flex justify-center space-x-6">
            <a href="http://bilalmotiwala20@gmail.com" className="hover:text-blue-500">Gmail</a>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ContactPage;
