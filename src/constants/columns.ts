export const COLUMNS = {
  ACCOUNT: "Account",
  OPERATION: "Operation",
  SYMBOL: "Symbol",
  DESCRIPTION: "Description",
  QTY: "Qty.",
  FILLED_QTY: "Filled Qty.",
  PRICE: "Price",
  STATUS: "Status",
  DATE: "Date",
  EXPIRATION: "Expiration",
  NO_REF: "No. Ref.",
  EXT_REF: "Ext. Ref.",
};

export const columnDefs = [
  { key: 'account',      label: COLUMNS.ACCOUNT },
  { key: 'operation',    label: COLUMNS.OPERATION },
  { key: 'symbol',       label: COLUMNS.SYMBOL },
  { key: 'description',  label: COLUMNS.DESCRIPTION, hide: 'hidden sm:table-cell' },
  { key: 'quantity',     label: COLUMNS.QTY,          hide: 'hidden sm:table-cell' },
  { key: 'filledQuantity', label: COLUMNS.FILLED_QTY, hide: 'hidden sm:table-cell' },
  { key: 'price',        label: COLUMNS.PRICE,        hide: 'hidden sm:table-cell' },
  { key: 'status',       label: COLUMNS.STATUS },
  { key: 'date',         label: COLUMNS.DATE,         hide: 'hidden sm:table-cell' },
  { key: 'expiration',   label: COLUMNS.EXPIRATION,   hide: 'hidden sm:table-cell' },
  { key: 'noRef',        label: COLUMNS.NO_REF,       hide: 'hidden sm:table-cell' },
  { key: 'extRef',       label: COLUMNS.EXT_REF,      hide: 'hidden sm:table-cell' },
];
