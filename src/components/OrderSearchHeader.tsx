import React from 'react';
import DatePicker from 'react-datepicker';
import { IoIosArrowDown } from 'react-icons/io';
import CustomDatePicker from './CustomDatePicker';
import 'react-datepicker/dist/react-datepicker.css';

interface OrderSearchHeaderProps {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  onSearch: () => void;
  resultCount: number;
}

const OrderSearchHeader: React.FC<OrderSearchHeaderProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  onSearch,
  resultCount
}) => {
  return (
    <header className="mb-6 flex flex-col gap-4 md:flex-row md:justify-between">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">Search</h1>
          <p>Search result: {resultCount}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:justify-center md:items-center md:gap-4">
        <div className='flex flex-col md:flex-row md:items-center md:gap-2'>
          <label htmlFor='period' className="text-sm font-medium block mb-1 md:mb-0">Period</label>
          <div className="relative w-full md:w-40">
            <input
              id='period'
              name='period'
              disabled
              type="text"
              value="Transmission"
              readOnly
              className="border py-1 px-3 pr-8 w-full bg-gray-100 cursor-not-allowed rounded-md"
            />
            <IoIosArrowDown
              fontSize={18}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
            />
          </div>
        </div>

        <div className='flex flex-col md:flex-row md:items-center md:gap-2'>
          <label htmlFor='status' className="text-sm font-medium block mb-1 md:mb-0">Status</label>
          <div className="relative w-full md:w-40">
            <input
              id='status'
              name='status'
              disabled
              type="text"
              value="Waiting"
              readOnly
              className="border py-1 px-3 pr-8 w-full bg-gray-100 cursor-not-allowed rounded-md"
            />
            <IoIosArrowDown
              fontSize={18}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
            />
          </div>
        </div>

        <div className='flex flex-col md:flex-row md:items-center md:gap-2'>
          <label htmlFor='startDate' className="text-sm font-medium block mb-1 md:mb-0">From</label>
          <DatePicker
            selected={startDate}
            onChange={setStartDate}
            placeholderText='Start date'
            dateFormat="dd/MM/yyyy"
            customInput={<CustomDatePicker />}
          />
        </div>

        <div className='flex flex-col md:flex-row md:items-center md:gap-2'>
          <label htmlFor='endDate' className="text-sm font-medium block mb-1 md:mb-0">To</label>
          <DatePicker
            selected={endDate}
            onChange={setEndDate}
            placeholderText='End date'
            dateFormat="dd/MM/yyyy"
            customInput={<CustomDatePicker />}
          />
        </div>

        <div className='flex justify-center items-center'>
          <button
            className="px-7 py-2 rounded-full w-full md:w-auto bg-[#0065c4] text-white cursor-pointer"
            onClick={onSearch}
          >
            Search
          </button>
        </div>
      </div>
    </header>
  );
};

export default OrderSearchHeader;
