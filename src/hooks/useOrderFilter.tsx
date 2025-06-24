import { useState } from 'react';
import { mockOrders } from '../mocks/order';
import type { Order } from '../types/order';

export function useOrderFilter() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [openRow, setOpenRow] = useState<number | null>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(mockOrders);

  const toggleRow = (index: number) => {
    setOpenRow(openRow === index ? null : index);
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortOrders = (orders: Order[]) => {
    if (!sortColumn) return orders;
    return [...orders].sort((a, b) => {
      const valA = a[sortColumn as keyof Order];
      const valB = b[sortColumn as keyof Order];
      if (valA == null || valB == null) return 0;
      const isDate = ['date', 'expiration'].includes(sortColumn);
      const aVal = isDate ? new Date(valA as string).getTime() : valA;
      const bVal = isDate ? new Date(valB as string).getTime() : valB;
      return (aVal < bVal ? -1 : aVal > bVal ? 1 : 0) * (sortDirection === 'asc' ? 1 : -1);
    });
  };

  const handleSearchClick = () => {
    const result = mockOrders.filter(order => {
      const orderDate = new Date(order.date);
      return (!startDate || orderDate >= startDate) && (!endDate || orderDate <= endDate);
    });
    setFilteredOrders(result);
    setOpenRow(null);
  };

  const sortedOrders = sortOrders(filteredOrders);

  return {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    openRow,
    toggleRow,
    sortedOrders,
    handleSearchClick,
    sortColumn,
    sortDirection,
    handleSort,
    filteredOrders
  };
}
