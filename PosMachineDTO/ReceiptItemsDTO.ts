export interface ReceiptItemWithSubtotal {
  barcode: string;
  name: string;
  unit: string;
  price: number;
  promotionType: string;
  quantity: number;
  subtotal?: number;
}
