import {loadAllItems, loadPromotions} from './Dependencies'


export function printReceipt(tags: string[]): string {
  const allItems = loadAllItems();
  let itemQuantity = calculateQuantity(tags)
  let {itemSubtotal, totalDiscount} = calculateSubtotal(itemQuantity)
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


export function calculateQuantity(tags: string[]) {
  let itemQuantity = new Map<string, number>()

  for (let item of tags) {
    let numberToAdd: number;
    if (!item.includes("-")) {
      numberToAdd = 1
    } else {
      let splitedItem = item.split('-')
      item = splitedItem[0]
      numberToAdd = parseFloat(splitedItem[1])
    }

    if (!itemQuantity.has(item)) {
      itemQuantity.set(item, numberToAdd)
    } else {
      itemQuantity.set(item, itemQuantity.get(item)! + numberToAdd)
    }
  }

  return itemQuantity
}




export function calculateSubtotal(itemQuantity:Map<string,number>) {
  let itemSubtotal = new Map<string, number>()
  let totalDiscount = 0
  for ( let [barcode, quantity] of itemQuantity) {
    const allItems  = loadAllItems();
    const item = allItems.find(item => item.barcode == barcode)
    const singlePrice: number = item? item.price : 9999
    let subDiscount = 0
    let isPromotion = false
    let allPromotions = loadPromotions()
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