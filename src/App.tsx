import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { mockOrders } from './mocks/order';
import { FaEllipsis } from 'react-icons/fa6';
import { IoIosArrowDown, IoIosArrowForward, IoIosHourglass } from 'react-icons/io';
import { LuExternalLink } from 'react-icons/lu';
import Warning from './components/Warning';
import OrderDetail from './components/OrderDetail';
import { formatDateTime } from './utils/DateUtil';
import CustomDatePicker from './components/CustomDatePicker';
import type { Order } from './types/order';
import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi';
import { columnDefs } from './constants/columns';
import { formatNumber } from './utils/NumberUtil';

function App() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [openRow, setOpenRow] = useState<number | null>(null);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(mockOrders);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const toggleRow = (index: number) => {
    setOpenRow(openRow === index ? null : index);
  };

  const sortOrders = (orders: typeof mockOrders) => {
    if (!sortColumn) return orders;

    return [...orders].sort((a, b) => {
      const valA = a[sortColumn as keyof typeof a];
      const valB = b[sortColumn as keyof typeof b];

      if (valA == null || valB == null) return 0;

      const isDate = ['date', 'expiration'].includes(sortColumn);
      const aValue = isDate ? new Date(valA as string).getTime() : valA;
      const bValue = isDate ? new Date(valB as string).getTime() : valB;

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  };
  const sortedOrders = sortOrders(filteredOrders);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };


  const handleSearchClick = () => {
    const result = mockOrders.filter(order => {
      const orderDate = new Date(order.date);
      return (
        (!startDate || orderDate >= startDate) &&
        (!endDate || orderDate <= endDate)
      );
    });
    setFilteredOrders(result);
    setOpenRow(null);
  }

  const renderSortIcons = (column: string) => {
    const isActive = sortColumn === column;

    return (
      <span className="inline-flex gap-1 flex-col ml-1 text-xs leading-none">
        <BiSolidUpArrow
          fontSize={12}
          className={`transition ${isActive && sortDirection === 'asc' ? 'text-black' : 'text-gray-300'
            }`}
        />
        <BiSolidDownArrow
          fontSize={12}
          className={`transition -mt-1 ${isActive && sortDirection === 'desc' ? 'text-black' : 'text-gray-300'
            }`}
        />
      </span>
    );
  };

  return (
    <main className="p-4 w-full">
      <header className="mb-6 flex justify-between">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-bold">Search</h1>
            <p>Search result: {filteredOrders.length}</p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4">
          <div className='flex justify-center items-center gap-2'>
            <label htmlFor='period' className="text-sm font-medium block">Period</label>
            <div className="relative w-40">
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
                fontWeight="bold"
                fontSize={18}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
              />
            </div>
          </div>
          <div className='flex justify-center items-center gap-2'>
            <label htmlFor='status' className="text-sm font-medium block">Status</label>
            <div className="relative w-40">
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
                fontWeight="bold"
                fontSize={18}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
              />
            </div>
          </div>
          <div className='flex justify-center items-center gap-2'>
            <label htmlFor='startDate' className="text-sm font-medium block">From</label>
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              placeholderText='Start date'
              dateFormat="dd/MM/yyyy"
              customInput={<CustomDatePicker />}
            />
          </div>
          <div className='flex justify-center items-center gap-2'>
            <label htmlFor='endDate' className="text-sm font-medium block">To</label>
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date)}
              placeholderText='End date'
              dateFormat="dd/MM/yyyy"
              customInput={<CustomDatePicker />}
            />
          </div>
          <div className='flex justify-center items-center'>
            <button className="px-7 py-2 rounded-full w-full bg-[#0065c4] text-white cursor-pointer" onClick={handleSearchClick}>Search</button>
          </div>
        </div>
      </header>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b-2 border-[#d4f2fa]">
            <tr>
              {columnDefs.map(({ key, label, hide }) => (
                <th
                  key={key}
                  className={`p-2 cursor-pointer ${hide ?? ''}`}
                  onClick={() => handleSort(key)}
                >
                  <span className="flex items-center justify-center gap-1">
                    {label}
                    {renderSortIcons(key)}
                  </span>
                </th>
              ))}
              <th className="p-2 hidden sm:table-cell"></th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((order, index) => (
              <>
                <tr key={order.id} className={`${openRow === index ? "" : "border-"} text-right`}>
                  <td className="flex justify-center items-center gap-2 font-bold text-[#2e73fe] p-2">
                    <button className='cursor-pointer text-black' onClick={() => toggleRow(index)}>
                      {openRow === index ? <IoIosArrowDown fontWeight='bold' fontSize={22} /> : <IoIosArrowForward fontWeight='bold' fontSize={22} />}
                    </button>
                    <span>
                      {order.account}
                    </span>
                  </td>
                  <td className="p-2">{order.operation}</td>
                  <td className="p-2">{order.symbol}</td>
                  <td className="p-2 hidden sm:table-cell">{order.description}</td>
                  <td className="p-2 hidden sm:table-cell">{order.quantity}</td>
                  <td className="p-2 hidden sm:table-cell">{order.filledQuantity}</td>
                  <td className="p-2 hidden sm:table-cell">{formatNumber(order.price, 2)}</td>
                  <td className="p-2 flex justify-center items-center gap-2">
                    {order.status === 'Waiting' ?
                      <div className='border rounded-full p-1 text-[#0094dd]'>
                        <IoIosHourglass size={16} />
                      </div> : null}
                    <span>{order.status}</span>
                  </td>
                  <td className="p-2 hidden sm:table-cell">{formatDateTime(order.date)}</td>
                  <td className="p-2 hidden sm:table-cell">{formatDateTime(order.expiration)}</td>
                  <td className="p-2 hidden sm:table-cell">{order.noRef}</td>
                  <td className="p-2 hidden sm:table-cell">{order.extRef}</td>
                  <td className="p-2 hidden sm:table-cell">
                    <button className='cursor-pointer p-1 bg-[#edf4fa] rounded-full'>
                      <FaEllipsis className='text-[#0169c5]' />
                    </button>
                  </td>
                </tr>
                {openRow === index && (
                  <tr>
                    <td colSpan={13}>
                      <div className="p-2 text-sm bg-[#faf8fe] rounded-lg m-2">
                        <div className='flex justify-between items-centers mb-2'>
                          <div className='flex items-center gap-2 text-blue-500 text-bold'>
                            <p className='bg-white font-bold text-[#2e73fe] p-2'>{order.detail.firstName} {order.detail.lastName} ({order.detail.accountCode} - {order.detail.accountType})</p>
                            <button className='flex justify-center items-center gap-2 cursor-pointer rounded-full font-medium border border-gray-600 px-5 py-1 text-[#1685d0]'>
                              <span>
                                Full review details
                              </span>
                              <LuExternalLink />
                            </button>
                          </div>
                          <div className='flex gap-2'>
                            <button className='bg-[#0065c4] font-bold text-white rounded-full px-10 cursor-pointer'>ACCEPT</button>
                            <button className='cursor-pointer font-bold flex justify-center items-center gap-2 bg-white border-2 border-red-500 text-red-500 rounded-full px-10'>
                              <span>REJECT</span>
                              <IoIosArrowDown fontWeight='bold' fontSize={22} />
                            </button>
                          </div>
                        </div>
                        <hr className='text-gray-300' />
                        <OrderDetail detail={order.detail} />
                        <Warning />
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
        {filteredOrders.length === 0 && (
          <p className="text-gray-500 mt-4">No orders found.</p>
        )}
      </div>
    </main>
  );
}

export default App;
