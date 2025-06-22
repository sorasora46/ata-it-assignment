export interface Order {
  id: number;
  account: string;
  operation: string;
  symbol: string;
  description: string;
  quantity: number;
  filledQuantity: number;
  price: number;
  status: string;
  date: string;
  expiration: string;
  noRef: string;
  extRef: string;
  detail: IOrderDetail;
}

export interface IOrderDetail {
  firstName: string;
  lastName: string;
  netAmount: number;
  price: number;
  exchangeRate: number;
  osLimit: number;
  referenceNumber: string;
  dateTime: string;
  telephone: string;
  userId: string;
  accountCode: string;
  accountType: string;
}
