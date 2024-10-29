import { ReceiptItemWithSubtotal } from "../PosMachineDTO/ReceiptItemsDTO";

export class FormatService {
  public static format(receiptItems: ReceiptItemWithSubtotal[]): string {
    let str = "";
    let realTotal = 0;
    let disCount = 0;
    receiptItems.forEach((item) => {
      str +=
        `Name：${item.name}，Quantity：${item.quantity} ${
          item.unit
        }，Unit：${item.price.toFixed(
          2
        )}(yuan)，Subtotal：${item.subtotal?.toFixed(2)}(yuan)` + `\n`;
      realTotal += item.subtotal!;
      disCount += item.price * item.quantity - item.subtotal!;
    });

    return (
      `***<store earning no money>Receipt ***` +
      `\n` +
      `${str.trim()}
----------------------
Total：${realTotal.toFixed(2)}(yuan)
Discounted prices：${disCount.toFixed(2)}(yuan)
**********************`
    );
  }
}
