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
}
