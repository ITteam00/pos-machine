import { loadAllItems, loadPromotions } from './Dependencies'

interface ItemRecord {
  barcode: string;
  name: string;
  unit: string;
  price: number;
  isProMotion: boolean;
  quantity: number;
  totalExpense: number
}

interface ItemDictionary {
  [barcode: string]: ItemRecord;
}

const allPromotion = loadPromotions()


function convertToDictionary(items: ItemRecord[]): ItemDictionary {
  const dictionary: ItemDictionary = {};
  for (const item of items) {
    if (dictionary[item.barcode]) {
      dictionary[item.barcode].quantity += item.quantity;
      dictionary[item.barcode].isProMotion = isPromotion(item.barcode)
    } else {
      dictionary[item.barcode] = { ...item, quantity: item.quantity };
    }
  }
  return dictionary;
}

export function isPromotion(barcode: string): boolean {
  return allPromotion[0].barcodes.includes(barcode)
}


export function printReceipt(tags: string[]): string {
  const itemDictionary = getItemsCount(tags)
  calculateExpense(itemDictionary)
  return formatReceipt(itemDictionary)
}


export function getItemsCount(tags: string[]): ItemDictionary {
  const itemsList: ItemRecord[] = []
  const allItems = loadAllItems()

  tags.forEach(tag => {
    const tagValue = tag.split('-')
    allItems.forEach(item => {
      if (item.barcode === tagValue[0]) {
        let itemDetal: ItemRecord = {
          barcode: item.barcode,
          name: item.name,
          unit: item.unit,
          price: item.price,
          isProMotion: false,
          quantity: tagValue.length <= 1 ? 1.00 : parseFloat(tagValue[1]),
          totalExpense: 0
        }
        itemsList.push(itemDetal)
      }
    })
  });
  return convertToDictionary(itemsList)
}

export function calculateExpense(itemDictionary: ItemDictionary): void {
  for (const item in itemDictionary) {
    if (itemDictionary[item].isProMotion === true) {
      itemDictionary[item].totalExpense = (itemDictionary[item].quantity - Math.floor(itemDictionary[item].quantity / 3)) * itemDictionary[item].price
    }
    else {
      itemDictionary[item].totalExpense = itemDictionary[item].quantity * itemDictionary[item].price
    }
  }
}

export function calculateDiscount(itemDictionary: ItemDictionary): [number, number] {
  let totalPrice = 0;
  let realPrice = 0;
  for (const item in itemDictionary) {
    realPrice += itemDictionary[item].totalExpense
    totalPrice += itemDictionary[item].quantity * itemDictionary[item].price
  }
  return [realPrice, totalPrice - realPrice]
}

export function formatReceipt(itemDictionary: ItemDictionary): string {
  let res = "***<store earning no money>Receipt ***\n"
  for (const item in itemDictionary) {
    res += `Name：${itemDictionary[item].name}，Quantity：${
      itemDictionary[item].quantity} ${itemDictionary[item].unit}${itemDictionary[item].quantity > 1 ? 's' : ''}，Unit：${
        itemDictionary[item].price.toFixed(2)}(yuan)，Subtotal：${itemDictionary[item].totalExpense.toFixed(2)}(yuan)\n`
  }
  res += `----------------------
Total：${calculateDiscount(itemDictionary)[0].toFixed(2)}(yuan)
Discounted prices：${calculateDiscount(itemDictionary)[1].toFixed(2)}(yuan)
**********************`
  return res
}



