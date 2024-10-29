import { Item } from "../PosMachineDTO/ItemsDTO";
import { Promotion } from "../PosMachineDTO/PromotionsDTO";
import { ReceiptItemWithSubtotal } from "../PosMachineDTO/ReceiptItemsDTO";

export class getUserTotalItemsService {
  public static getUserTotalReceiptItems(
    allItems: Item[],
    allPromotions: Promotion[],
    inPutBarcodes: string[]
  ): ReceiptItemWithSubtotal[] {
    const receiptItems: ReceiptItemWithSubtotal[] = [];
    const itemCounts = countItems(inPutBarcodes);
    for (const [barcode, quantity] of Object.entries(itemCounts)) {
      const item = allItems.find((item) => item.barcode === barcode);
      const promotion = allPromotions.find((promo) =>
        promo.barcodes.includes(barcode)
      );

      if (item) {
        const receiptItem: ReceiptItemWithSubtotal = {
          barcode: item.barcode,
          name: item.name,
          unit: item.unit,
          price: item.price,
          promotionType: promotion ? promotion.type : "NONE",
          quantity: quantity,
        };
        if (receiptItem.quantity != 1) {
          receiptItem.unit = receiptItem.unit + "s";
        }
        receiptItems.push(receiptItem);
      }
    }
    return getItemSubtotal(receiptItems);
  }
}
export function countItems(items: string[]): Record<string, number> {
  return items.reduce((acc, item) => {
    const [itemId, count] = item.split("-");
    const itemCount = count ? parseFloat(count) : 1;

    if (acc[itemId]) {
      acc[itemId] += itemCount;
    } else {
      acc[itemId] = itemCount;
    }
    return acc;
  }, {} as Record<string, number>);
}

export function getItemSubtotal(
  receiptItems: ReceiptItemWithSubtotal[]
): ReceiptItemWithSubtotal[] {
  let seceiptItemWithSubtotal: ReceiptItemWithSubtotal[] = [];
  receiptItems.forEach((item) => {
    if (item.promotionType === "NONE") {
      seceiptItemWithSubtotal.push({
        ...item,
        subtotal: item.price * item.quantity,
      });
    } else if (item.promotionType === "BUY_TWO_GET_ONE_FREE") {
      const discountNum = Math.floor(item.quantity / 3);
      seceiptItemWithSubtotal.push({
        ...item,
        subtotal: item.price * (item.quantity - discountNum),
      });
    }
  });
  return seceiptItemWithSubtotal;
}
