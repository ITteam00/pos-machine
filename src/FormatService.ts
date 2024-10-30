import { ReceiptItemWithSubtotal } from "../PosMachineDTO/ReceiptItemsDTO";

export class FormatService {
  public static format(receiptItems: ReceiptItemWithSubtotal[]): string {
    let formatReceipt = "";
    let realUserTotalPrice = 0;
    let discountPrice = 0;
    receiptItems.forEach((item) => {
      formatReceipt +=
        `Name：${item.name}，Quantity：${item.quantity} ${
          item.unit
        }，Unit：${item.price.toFixed(
          2
        )}(yuan)，Subtotal：${item.subtotal?.toFixed(2)}(yuan)` + `\n`;
      realUserTotalPrice += item.subtotal!;
      discountPrice += item.price * item.quantity - item.subtotal!;
    });

    return (
      `***<store earning no money>Receipt ***` +
      `\n` +
      `${formatReceipt.trim()}
----------------------
Total：${realUserTotalPrice.toFixed(2)}(yuan)
Discounted prices：${discountPrice.toFixed(2)}(yuan)
**********************`
    );
  }
}
