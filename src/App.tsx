import { useOrderFilter } from './hooks/useOrderFilter';
import OrderTable from './components/OrderTable';
import OrderSearchHeader from './components/OrderSearchHeader';

const App = () => {
  const {
    startDate, endDate, setStartDate, setEndDate,
    openRow, toggleRow,
    sortedOrders, handleSearchClick,
    sortColumn, sortDirection, handleSort,
    filteredOrders
  } = useOrderFilter();

  return (
    <main className="p-4 w-full">
      <OrderSearchHeader
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        onSearch={handleSearchClick}
        resultCount={filteredOrders.length}
      />
      <OrderTable
        orders={sortedOrders}
        openRow={openRow}
        onToggleRow={toggleRow}
        onSort={handleSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
      />
    </main>
  );
}

export default App;
