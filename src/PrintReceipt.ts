import { loadAllItems, loadPromotions } from "./Dependencies";
import { FormatService } from "./FormatService";
import { getUserTotalItemsService } from "./getUserTotalItemsService";
export function printReceipt(tags: string[]): string {
  let allItems = loadAllItems();
  let allPromotions = loadPromotions();
  let receiptItems = getUserTotalItemsService.getUserTotalReceiptItems(
    allItems,
    allPromotions,
    tags
  );
  let formattedResult = FormatService.format(receiptItems);

  return formattedResult;
}
