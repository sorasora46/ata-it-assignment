import type { FC, ReactNode } from "react";
import type { IOrderDetail } from "../types/order";
import { formatDateTime } from "../utils/DateUtil";
import { formatNumber } from "../utils/NumberUtil";
import { DETAIL_LABELS } from "../constants/details";

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
    <DetailCell label={DETAIL_LABELS.NET_AMOUNT}>
      {formatNumber(detail.netAmount, 2)} USD
    </DetailCell>
    <DetailCell label={DETAIL_LABELS.PRICE}>
      {formatNumber(detail.price, 2)}
    </DetailCell>
    <DetailCell label={DETAIL_LABELS.EXCHANGE_RATE}>
      {formatNumber(detail.exchangeRate, 4)}
    </DetailCell>
    <DetailCell label={DETAIL_LABELS.OS_LIMIT}>
      {formatNumber(detail.osLimit, 1)}
    </DetailCell>
    <DetailCell label={DETAIL_LABELS.REFERENCE_NUMBER}>
      {detail.referenceNumber}
    </DetailCell>
    <DetailCell label={DETAIL_LABELS.DATE_TIME}>
      {formatDateTime(detail.dateTime)}
    </DetailCell>
    <DetailCell label={DETAIL_LABELS.TELEPHONE}>
      {detail.telephone}
    </DetailCell>
    <DetailCell label={DETAIL_LABELS.USER_ID}>
      {detail.userId}
    </DetailCell>
  </div>
);

export default OrderDetail;
