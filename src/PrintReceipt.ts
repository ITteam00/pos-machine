import {loadAllItems, loadPromotions} from './Dependencies'

interface Item {
  barcode: string,
  name: string,
  unit: string,
  price: number
}

export function printReceipt(tags: string[]): string {
  let allItems: Item[] = loadAllItems()
  return ''
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




export function calculateSubtotal(tags: string[]) {
  let itemSubtotal = new Map<string, number>()
  return itemSubtotal
}