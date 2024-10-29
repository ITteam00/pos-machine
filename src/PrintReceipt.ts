import {loadAllItems, loadPromotions} from './Dependencies'

interface Item {
  barcode: string,
  name: string,
  unit: string,
  price: number
}

export function printReceipt(tags: string[]): string {
  let itemQuantity = calculateQuantity(tags)

  let totalPrice = 0
  let {itemSubtotal, totalDiscount} = calculateSubtotal(itemQuantity)
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




export function calculateSubtotal(itemQuantity:Map<string,number>) {
  // console.log("!!!!!!!!!")
  // console.log(itemQuantity)
  let itemSubtotal = new Map<string, number>()
  let totalDiscount = 0
  for ( let [barcode, quantity] of itemQuantity) {
    const allItems  = loadAllItems();
    console.log("!!!!!!!!!")
    const item = allItems.find(item => item.barcode == barcode)
    const singlePrice: number = item? item.price : 9999
    console.log("singlePrice ", singlePrice)

    let subDiscount : number = singlePrice * Math.floor(quantity/3)
    totalDiscount += subDiscount
    let subtotal = singlePrice * quantity - subDiscount
    itemSubtotal.set(barcode, subtotal)
  } 
  return {itemSubtotal:itemSubtotal, totalDiscount:totalDiscount}
}