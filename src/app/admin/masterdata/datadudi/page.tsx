// pages/index.tsx
import React from "react";
import Card from "@/components/admin/DataDudi";
import WhiteTemplate from "@/components/WhiteTemplate";
import Banner from "@/components/admin/Banner";

const dataDudi: React.FC = () => {
  const cards = [
    { code: "0010", number: "0814 7777 8900" },
    { code: "0010", number: "0814 7777 8900" },
    { code: "0010", number: "0814 7777 8900" },
    { code: "0010", number: "0814 7777 8900" },
    { code: "0010", number: "0814 7777 8900" },
  ];

  return (
    <>
      <Banner title="Data DU/DI" />
      <WhiteTemplate>
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4">
              <div>
                <label
                  htmlFor="filter"
                  className="block text-sm font-medium text-gray-700"
                >
                  Filter by:
                </label>
                <select
                  id="filter"
                  name="filter"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option>Date & Time</option>
                </select>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  placeholder="Cari data..."
                />
                <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-600">
                  Cari
                </button>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="space-y-4">
              {cards.map((card, index) => (
                <Card key={index} code={card.code} number={card.number} />
              ))}
            </div>
            <button className="absolute right-4 bottom-4 bg-blue-500 text-white p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
        </div>
      </WhiteTemplate>
    </>
  );
};

export default dataDudi;
