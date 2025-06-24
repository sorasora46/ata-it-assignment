import React from 'react';
import { IoIosArrowForward, IoIosArrowDown, IoIosHourglass } from 'react-icons/io';
import { FaEllipsis } from 'react-icons/fa6';
import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi';
import { formatDateTime } from '../utils/DateUtil';
import { formatNumber } from '../utils/NumberUtil';
import { columnDefs } from '../constants/columns';
import OrderDetail from './OrderDetail';
import Warning from './Warning';
import { LuExternalLink } from 'react-icons/lu';
import type { Order } from '../types/order';

interface OrderTableProps {
  orders: Order[];
  openRow: number | null;
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
  onToggleRow: (index: number) => void;
  onSort: (column: string) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  openRow,
  sortColumn,
  sortDirection,
  onToggleRow,
  onSort,
}) => {

  const renderSortIcons = (column: string) => {
    const isActive = sortColumn === column;
    return (
      <span className="inline-flex gap-1 flex-col ml-1 text-xs leading-none">
        <BiSolidUpArrow fontSize={12} className={`transition ${isActive && sortDirection === 'asc' ? 'text-black' : 'text-gray-300'}`} />
        <BiSolidDownArrow fontSize={12} className={`transition -mt-1 ${isActive && sortDirection === 'desc' ? 'text-black' : 'text-gray-300'}`} />
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="border-b-2 border-[#d4f2fa]">
          <tr>
            {columnDefs.map(({ key, label, hide }) => (
              <th key={key} className={`p-2 cursor-pointer ${hide ?? ''}`} onClick={() => onSort(key)}>
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
          {orders.map((order, index) => (
            <React.Fragment key={order.id}>
              <tr className={`${openRow === index ? "" : "border-"} text-right`}>
                <td className="flex justify-center items-center gap-2 font-bold text-[#2e73fe] p-2">
                  <button className='cursor-pointer text-black' onClick={() => onToggleRow(index)}>
                    {openRow === index ? <IoIosArrowDown fontSize={22} /> : <IoIosArrowForward fontSize={22} />}
                  </button>
                  <span>{order.account}</span>
                </td>
                <td className="p-2">{order.operation}</td>
                <td className="p-2">{order.symbol}</td>
                <td className="p-2 hidden sm:table-cell">{order.description}</td>
                <td className="p-2 hidden sm:table-cell">{order.quantity}</td>
                <td className="p-2 hidden sm:table-cell">{order.filledQuantity}</td>
                <td className="p-2 hidden sm:table-cell">{formatNumber(order.price, 2)}</td>
                <td className="p-2 flex justify-center items-center gap-2">
                  {order.status === 'Waiting' && (
                    <div className='border rounded-full p-1 text-[#0094dd]'>
                      <IoIosHourglass size={16} />
                    </div>
                  )}
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
                      <div className='flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-2'>
                        <div className='flex flex-col gap-2 md:flex-row md:items-center text-blue-500 font-bold'>
                          <p className='bg-white text-[#2e73fe] p-2'>
                            {order.detail.firstName} {order.detail.lastName} ({order.detail.accountCode} - {order.detail.accountType})
                          </p>
                          <button className='flex justify-center items-center gap-2 cursor-pointer rounded-full font-medium border border-gray-600 px-5 py-1 text-[#1685d0] w-full md:w-auto'>
                            <span>Full review details</span>
                            <LuExternalLink />
                          </button>
                        </div>
                        <div className='flex flex-col gap-2 md:flex-row'>
                          <button className='bg-[#0065c4] font-bold text-white rounded-full px-10 py-2 cursor-pointer w-full md:w-auto'>ACCEPT</button>
                          <button className='cursor-pointer font-bold flex justify-center items-center gap-2 bg-white border-2 border-red-500 text-red-500 rounded-full px-10 py-2 w-full md:w-auto'>
                            <span>REJECT</span>
                            <IoIosArrowDown fontSize={22} />
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
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {orders.length === 0 && <p className="text-gray-500 mt-4">No orders found.</p>}
    </div>
  );
};

export default OrderTable;
