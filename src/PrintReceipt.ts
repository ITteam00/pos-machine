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
  return ''
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




