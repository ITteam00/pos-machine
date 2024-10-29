import { loadAllItems, loadPromotions } from './Dependencies'

interface ItemRecord {
  barcode: string;
  name: string;
  unit: string;
  price: number;
  isProMotion: boolean;
  quantity: number;
}

interface ItemDictionary {
  [barcode: string]: ItemRecord;
}

function convertToDictionary(items: ItemRecord[]): ItemDictionary {
  const dictionary: ItemDictionary = {};
  for (const item of items) {
    if (dictionary[item.barcode]) {
      dictionary[item.barcode].quantity += 1;
    } else {
      dictionary[item.barcode] = { ...item, quantity: 1 };
    }
  }
  return dictionary;
}


export function printReceipt(tags: string[]): string {
  return ''
}