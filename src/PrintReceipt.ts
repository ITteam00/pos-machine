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
  const noDiscounts: { item: string; quantity: number }[] = [];
  let totalSubtotal = 0;
  const processedCart = tags.reduce((acc: string[], curr: string) => {
    const [curBarcode, quantity] = curr.split("-");
    const product = items.find((item) => item.barcode === curBarcode);
    if (!product) return acc;
    let parsedQuantity = Number(quantity);
    if (isNaN(parsedQuantity)) {
      parsedQuantity = 1;
    }
    const existingItem = acc.find((item) => item.startsWith(curBarcode));
    if (existingItem) {
      const [, existingQuantity] = existingItem.split("-");
      let parsedexistingQuantity = Number(quantity);
      if (isNaN(parsedexistingQuantity)) {
        parsedexistingQuantity = 1;
      }
      acc[acc.indexOf(existingItem)] = `${curBarcode}-${
        parsedQuantity + Number(parsedexistingQuantity)
      }`;
    } else {
      acc.push(curr);
    }
    return acc;
  }, []);
  console.log(processedCart)
  const promotionItems = promotions[0].barcodes;
  const promotionQuantity = 3;
  for (let item of processedCart) {
    const [curBarcode, quantity] = item.split("-");
    let parsedQuantity = Number(quantity);
    if (isNaN(parsedQuantity)) {
      parsedQuantity = 1;
    }
    if (promotionItems.includes(item.split("-")[0])
      && parsedQuantity >= promotionQuantity) {
        discounts.push({ item: curBarcode, quantity: parsedQuantity });
    }
    else{
      noDiscounts.push({ item: curBarcode, quantity: parsedQuantity });
      const product = items.find((item) => item.barcode === processedCart[0]);
      printedItems.push(
        `Name：${product?.name}，Quantity：${parsedQuantity} ${product?.unit}，Unit：${product?.price.toFixed(2)}(yuan)，Subtotal：${(product!.price *parsedQuantity).toFixed(2) }(yuan)`
      );
    }
  }
  console.log(discounts);
  console.log(noDiscounts);
  let totalDiscount = 0;
  discounts.forEach(discount => {
      const product = items.find((item) => item.barcode === discount.item);
      const discountAmount = product!.price * Math.max(0, discount.quantity - promotionQuantity);
      totalDiscount += discountAmount;
  });

  noDiscounts.forEach(discount => {
    const product = items.find((item) => item.barcode === discount.item);
    const discountAmount = product!.price * Math.max(0, discount.quantity - promotionQuantity);
    totalSubtotal += discountAmount;
});
  const receipt = `***<store earning no money>Receipt ***
${printedItems.join('\n')}
----------------------
Total：3.00(yuan)
Discounted prices：0.00(yuan)
**********************`;
  return receipt;
}
