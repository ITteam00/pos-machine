import { ReceiptItem } from "./ReceiptItems";
export class getUserTotalItemsService {
  public static getUserTotalReceiptItems(
    allItems: string[],
    allPromotions: string[],
    inPutBarcodes: string[]
  ) {
    const receiptItems: ReceiptItem[] = [];
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
