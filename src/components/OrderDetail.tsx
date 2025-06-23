import type { FC, ReactNode } from "react";
import type { IOrderDetail } from "../types/order";
import { formatDateTime } from "../utils/DateUtil";
import { formatNumber } from "../utils/NumberUtil";

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
    <DetailCell label="Net Amount">{formatNumber(detail.netAmount, 2)} USD</DetailCell>
    <DetailCell label="Price">{formatNumber(detail.price, 2)}</DetailCell>
    <DetailCell label="Exchange Rate">{formatNumber(detail.exchangeRate, 4)}</DetailCell>
    <DetailCell label="O/S Limit">{formatNumber(detail.osLimit, 1)}</DetailCell>
    <DetailCell label="Reference Number">{detail.referenceNumber}</DetailCell>
    <DetailCell label="Date / Time">{formatDateTime(detail.dateTime)}</DetailCell>
    <DetailCell label="Telephone">{detail.telephone}</DetailCell>
    <DetailCell label="User ID">{detail.userId}</DetailCell>
  </div>
);

export default OrderDetail;
