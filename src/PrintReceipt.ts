import { loadAllItems, loadPromotions } from "./Dependencies";

export interface Item {
  barcode: string;
  name: string;
  unit: string;
  price: number;
}

export function printReceipt(tags: string[]): string {
  const printedItems: string[] = [];

  const items = loadAllItems();
  const promotions = loadPromotions();

  const discounts: { item: string; quantity: number }[] = [];
  
  let totalSubtotal = 0;

  const processedCart = getProcessedCart(tags);

  for (let item of processedCart) {
    const [curBarcode, quantity] = item.split("-");
    let parsedQuantity = Number(quantity);
    if (isNaN(parsedQuantity)) {
      parsedQuantity = 1;
    }
    discounts.push({ item: curBarcode, quantity: parsedQuantity });
  }
  let totalDiscount = 0;
  discounts.forEach((discount) => {
    const product = items.find((item) => item.barcode === discount.item);
    let discountAmount = 0
    if(promotions[0].barcodes.includes(product?.barcode!)) {
       discountAmount = Math.floor(discount.quantity /3) * product!.price
    }
    const amount = product!.price * discount.quantity;
    totalSubtotal += amount - discountAmount;
    totalDiscount += discountAmount;
    printedItems.push(
      `Name：${product!.name}，Quantity：${discount.quantity} ${
        product!.unit
      }${discount.quantity > 1 ? 's' : ''}，Unit：${product!.price.toFixed(2)}(yuan)，Subtotal：${(
        product!.price * discount.quantity -
        discountAmount
      ).toFixed(2)}(yuan)`
    );

  });

  const receipt = `***<store earning no money>Receipt ***
${printedItems.join("\n")}
----------------------
Total：${totalSubtotal.toFixed(2)}(yuan)
Discounted prices：${totalDiscount.toFixed(2)}(yuan)
**********************`;
  return receipt;
}

export function getProcessedCart(tags: string[]): string[] {
  const itemCounts = new Map<string, number>();

  tags.forEach((tag) => {
    let quantityToAdd = 1;
    let barcode = tag;

    if (tag.includes("-")) {
      const [itemBarcode, quantity] = tag.split("-");
      barcode = itemBarcode;
      quantityToAdd = parseFloat(quantity);
    }

    if (itemCounts.has(barcode)) {
      itemCounts.set(barcode, itemCounts.get(barcode)! + quantityToAdd);
    } else {
      itemCounts.set(barcode, quantityToAdd);
    }
  });

  return Array.from(
    itemCounts,
    ([barcode, quantity]) => `${barcode}-${quantity}`
  );
}
