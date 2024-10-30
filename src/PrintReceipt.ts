import {loadAllItems, loadPromotions} from './Dependencies'
import { Item } from './Item.model';
import { Promotion } from './Promotion.model';

export function printReceipt(tags: string[]): string {
  const allItems = loadAllItems();
  const allPromotions:Promotion[] = loadPromotions()
  let itemQuantity = calculateQuantity(tags)
  let {itemSubtotal, totalDiscount} = calculateSubtotal(itemQuantity, allItems, allPromotions)
  let totalPrice = 0
  let receiptItems = '';

  for (let [barcode, subtotal] of itemSubtotal) {
    totalPrice += subtotal
    const item = allItems.find(item => item.barcode === barcode);
    const quantity = itemQuantity.get(barcode);
    if (item && quantity !== undefined) {
      receiptItems += `Name：${item.name}，Quantity：${quantity} ${item.unit}${quantity > 1 ? 's' : ''}，Unit：${item.price.toFixed(2)}(yuan)，Subtotal：${subtotal.toFixed(2)}(yuan)\n`;
    }
  }
  let totalPriceStr= totalPrice.toFixed(2);
  let totalDiscountStr = totalDiscount.toFixed(2);
 

  return `***<store earning no money>Receipt ***
${receiptItems}----------------------
Total：${totalPriceStr}(yuan)
Discounted prices：${totalDiscountStr}(yuan)
**********************`
}


export function calculateQuantity(tags: string[]): Map<string, number> {
  const itemQuantity = new Map<string, number>();

  tags.forEach(tag => {
    const [item, quantity] = parseTag(tag);
    const currentQuantity = itemQuantity.get(item) || 0;
    itemQuantity.set(item, currentQuantity + quantity);
  });

  return itemQuantity;
}

function parseTag(tag: string): [string, number] {
  if (!tag.includes("-")) {
    return [tag, 1];
  } else {
    const [item, quantity] = tag.split('-');
    return [item, parseFloat(quantity)];
  }
}





export function calculateSubtotal(itemQuantity:Map<string,number>, allItems: Item[], allPromotions: Promotion[]) {
  let itemSubtotal = new Map<string, number>()
  let totalDiscount = 0
  for ( let [barcode, quantity] of itemQuantity) {
    const item = allItems.find(item => item.barcode == barcode)
    const singlePrice: number = item!.price
    let subDiscount = 0
    let isPromotion = false
    if (allPromotions[0].barcodes.includes(barcode)) {
      isPromotion = true
    }
    if (isPromotion) {
      subDiscount = singlePrice * Math.floor(quantity/3)
    }
    totalDiscount += subDiscount
    let subtotal = singlePrice * quantity - subDiscount
    itemSubtotal.set(barcode, subtotal)
  } 
  return {itemSubtotal:itemSubtotal, totalDiscount:totalDiscount}
}