import type { FC, ReactNode } from "react";
import type { IOrderDetail } from "../types/order";

interface OrderDetailProps {
  detail: IOrderDetail;
}

interface DetailCellProps {
  label: string;
  children: ReactNode;
}

const DetailCell: FC<DetailCellProps> = ({ label, children }) => (
  <div className="flex whitespace-nowrap gap-1">
    <span>{label}:</span>
    <span className="font-bold">{children}</span>
  </div>
);

const OrderDetail: FC<OrderDetailProps> = ({ detail }) => (
  <div className="my-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-4 text-sm">
    <DetailCell label="Net Amount">{detail.netAmount}</DetailCell>
    <DetailCell label="Price">{detail.price}</DetailCell>
    <DetailCell label="Exchange Rate">{detail.exchangeRate}</DetailCell>
    <DetailCell label="O/S Limit">{detail.osLimit}</DetailCell>
    <DetailCell label="Reference Number">{detail.referenceNumber}</DetailCell>
    <DetailCell label="Date / Time">{detail.dateTime}</DetailCell>
    <DetailCell label="Telephone">{detail.telephone}</DetailCell>
    <DetailCell label="User ID">{detail.userId}</DetailCell>
  </div>
);

export default OrderDetail;
