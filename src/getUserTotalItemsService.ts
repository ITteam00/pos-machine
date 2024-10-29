import { Item } from "../PosMachineDTO/ItemsDTO";
import { Promotion } from "../PosMachineDTO/PromotionsDTO";
import { ReceiptItem } from "../PosMachineDTO/ReceiptItemsDTO";

export class getUserTotalItemsService {
  public static getUserTotalReceiptItems(
    allItems: Item[],
    allPromotions: Promotion[],
    inPutBarcodes: string[]
  ) {
    const receiptItems: ReceiptItem[] = [];
    const itemCounts = countItems(inPutBarcodes);
    for (const [barcode, quantity] of Object.entries(itemCounts)) {
      const item = allItems.find((item) => item.barcode === barcode);
      const promotion = allPromotions.find((promo) =>
        promo.barcodes.includes(barcode)
      );

      if (item) {
        const receiptItem: ReceiptItem = {
          barcode: item.barcode,
          name: item.name,
          unit: item.unit,
          price: item.price,
          promotionType: promotion ? promotion.type : "NONE",
          quantity: quantity,
        };
        receiptItems.push(receiptItem);
      }
    }
  }
}
export function countItems(items: string[]): Record<string, number> {
  return items.reduce((acc, item) => {
    const [itemId, count] = item.split("-");
    const itemCount = count ? parseInt(count, 10) : 1;

    if (acc[itemId]) {
      acc[itemId] += itemCount;
    } else {
      acc[itemId] = itemCount;
    }
    return acc;
  }, {} as Record<string, number>);
}
