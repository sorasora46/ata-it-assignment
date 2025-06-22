import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { mockOrders } from './mocks/order';

function App() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [openRow, setOpenRow] = useState<number | null>(null);

  const toggleRow = (index: number) => {
    setOpenRow(openRow === index ? null : index);
  };

  const filteredOrders = mockOrders.filter(order => {
    const orderDate = new Date(order.date);
    return (
      (!startDate || orderDate >= startDate) &&
      (!endDate || orderDate <= endDate)
    );
  });

  return (
    <div className="p-4 w-full">
      <header className="mb-6 flex justify-between">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-bold">Search</h1>
            <p>Search result: {filteredOrders.length}</p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4">
          <div className='flex justify-center items-center gap-2'>
            <label className="text-sm font-medium block">Period</label>
            <input
              type="text"
              value="Transmission"
              readOnly
              className="border p-2 w-full bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div className='flex justify-center items-center gap-2'>
            <label className="text-sm font-medium block">Status</label>
            <input
              type="text"
              value="Waiting"
              readOnly
              className="border p-2 w-full bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div className='flex justify-center items-center gap-2'>
            <label className="text-sm font-medium block">From</label>
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              className="border p-2 w-full"
              placeholderText="Start date"
            />
          </div>
          <div className='flex justify-center items-center gap-2'>
            <label className="text-sm font-medium block">To</label>
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date)}
              className="border p-2 w-full"
              placeholderText="End date"
            />
          </div>
          <div className='flex justify-center items-center'>
            <button className="px-6 py-2 border rounded-full w-full">Search</button>
          </div>
        </div>
      </header>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100 border-b-2">
            <tr>
              <th className="p-2">Account</th>
              <th className="p-2">Operation</th>
              <th className="p-2">Symbol</th>
              <th className="p-2">Status</th>
              <th className="p-2 hidden sm:table-cell">Description</th>
              <th className="p-2 hidden sm:table-cell">Qty.</th>
              <th className="p-2 hidden sm:table-cell">Filled Qty.</th>
              <th className="p-2 hidden sm:table-cell">Price</th>
              <th className="p-2 hidden sm:table-cell">Date</th>
              <th className="p-2 hidden sm:table-cell">Expiration</th>
              <th className="p-2 hidden sm:table-cell">No. Ref.</th>
              <th className="p-2 hidden sm:table-cell">Ext. Ref.</th>
              <th className="p-2 hidden sm:table-cell"></th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <>
                <tr key={order.id} className='border-b text-right'>
                  <td className="p-2">
                    <button className='border' onClick={() => toggleRow(index)}>action</button>
                    {order.account}
                  </td>
                  <td className="p-2">{order.operation}</td>
                  <td className="p-2">{order.symbol}</td>
                  <td className="p-2">{order.status}</td>
                  <td className="p-2 hidden sm:table-cell">{order.description}</td>
                  <td className="p-2 hidden sm:table-cell">{order.quantity}</td>
                  <td className="p-2 hidden sm:table-cell">{order.filledQuantity}</td>
                  <td className="p-2 hidden sm:table-cell">{order.price}</td>
                  <td className="p-2 hidden sm:table-cell">{order.date}</td>
                  <td className="p-2 hidden sm:table-cell">{order.expiration}</td>
                  <td className="p-2 hidden sm:table-cell">{order.noRef}</td>
                  <td className="p-2 hidden sm:table-cell">{order.extRef}</td>
                  <td className="p-2 hidden sm:table-cell">
                    <button className='border'>action</button>
                  </td>
                </tr>
                {openRow === index && (
                  <tr>
                    <td colSpan={13} className="px-4 py-3 text-sm bg-blue-100">
                      <div className='flex justify-between items-centers mb-2'>
                        <div className='flex items-center gap-2 text-blue-500 text-bold'>
                          <p>FIRST-NAME LAST-NAME (10103ZA - US Margin)</p>
                          <button className='rounded-full border-2 border-gray-500 px-5 py-1 text-blue-500'>Full review details</button>
                        </div>
                        <div className='flex gap-2'>
                          <button className='bg-blue-500 text-white rounded-full px-5 py-1'>ACCEPT</button>
                          <button className='bg-white border-2 border-red-500 text-red-500 rounded-full px-5 py-1'>REJECT</button>
                        </div>
                      </div>
                      <hr />
                      <div className='my-2'>
                        numbers area
                      </div>
                      <div className='p-3 bg-yellow-50'>
                        <p>Warning(s)</p>
                        <ul>
                          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab quidem, commodi voluptatibus quod repellat quasi provident assumenda molestias quo! Dicta voluptate impedit et adipisci aut eius maxime saepe reprehenderit fugit?</li>
                          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab quidem, commodi voluptatibus quod repellat quasi provident assumenda molestias quo! Dicta voluptate impedit et adipisci aut eius maxime saepe reprehenderit fugit?</li>
                          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab quidem, commodi voluptatibus quod repellat quasi provident assumenda molestias quo! Dicta voluptate impedit et adipisci aut eius maxime saepe reprehenderit fugit?</li>
                          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab quidem, commodi voluptatibus quod repellat quasi provident assumenda molestias quo! Dicta voluptate impedit et adipisci aut eius maxime saepe reprehenderit fugit?</li>
                          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab quidem, commodi voluptatibus quod repellat quasi provident assumenda molestias quo! Dicta voluptate impedit et adipisci aut eius maxime saepe reprehenderit fugit?</li>
                          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab quidem, commodi voluptatibus quod repellat quasi provident assumenda molestias quo! Dicta voluptate impedit et adipisci aut eius maxime saepe reprehenderit fugit?</li>
                        </ul>
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
    </div>
  );
}

export default App;
