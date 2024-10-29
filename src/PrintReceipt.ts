import { loadAllItems, loadPromotions } from "./Dependencies";

export interface ItemInfo {
  barcode: string;
  name: string;
  unit: string;
  price: number;
  promotionsType?: string;
  quantity?: number;
  totalPrice?: number;
}

export interface Promotion {
  type: string;
  barcodes: string[];
}

export function printReceipt(tags: string[]): string {
  const items = loadAllItems();
  const promotions = loadPromotions();

  const tagsCount = countTags(tags);
  const itemsInfo = extractItemInfo(items, tagsCount);

  const itemsInfoWithPromotions = setItemPromotion(itemsInfo, promotions);
  const itemsWithTotalprice = getPrice(itemsInfoWithPromotions);

  const re = generateReceipt(itemsWithTotalprice);
  return re;
}

export function countTags(tags: string[]): Map<string, number> {
  const cnt = new Map<string, number>();
  tags.forEach((rawTag) => {
    const splitTags = rawTag.split('-');
    const tag = splitTags[0];
    const quantity = splitTags.length > 1 ? Number(splitTags[1]) : 1;

    if (cnt.has(tag)) {
      cnt.set(tag, cnt.get(tag)! + quantity);
    } else {
      cnt.set(tag, quantity);
    }
  });
  return cnt;
}

export function extractItemInfo(
  items: ItemInfo[],
  tagsCnt: Map<string, number>
): ItemInfo[] {
  const itemsInfo: ItemInfo[] = [];
  items.forEach((item) => {
    if (tagsCnt.has(item.barcode)) {
      const info: ItemInfo = {
        ...item,
        quantity: tagsCnt.get(item.barcode)!,
      };
      itemsInfo.push(info);
    }
  });
  return itemsInfo;
}

export function setItemPromotion(
  items: ItemInfo[],
  promotions: Promotion[]
): ItemInfo[] {
  const re: ItemInfo[] = [];

  promotions.forEach((promotion) => {
    items.forEach((item) => {
      if (promotion.barcodes.includes(item.barcode)) {
        re.push({ ...item, promotionsType: promotion.type });
      } else re.push({ ...item });
    });
  });
  return re;
}

export function getPrice(items: ItemInfo[]): ItemInfo[] {
  const re: ItemInfo[] = [];

  items.forEach((item) => {
    if (item.promotionsType === "BUY_TWO_GET_ONE_FREE" && item.quantity) {
      const discountItemNum = Math.floor(item.quantity / 3);
      const totalPrice = item.price * (item.quantity - discountItemNum);
      re.push({ ...item, totalPrice });
    } else {
      re.push({ ...item, totalPrice: item.price * item.quantity! });
    }
  });

  return re;
}


export function generateReceipt(items: ItemInfo[]): string {
  let total = 0;
  let discountedTotal = 0;
  let receipt = "***<store earning no money>Receipt ***\n";

  items.forEach((item) => {
    if (item.quantity && item.totalPrice !== undefined) {
      const subtotal = item.totalPrice;
      total += subtotal;
      const discount = item.price * item.quantity - subtotal;
      discountedTotal += discount;

      receipt += `Name：${item.name}，Quantity：${item.quantity} ${item.unit}${
        item.quantity > 1 ? "s" : ""
      }，Unit：${item.price.toFixed(2)}(yuan)，Subtotal：${subtotal.toFixed(
        2
      )}(yuan)\n`;
    }
  });

  receipt += "----------------------\n";
  receipt += `Total：${total.toFixed(2)}(yuan)\n`;
  receipt += `Discounted prices：${discountedTotal.toFixed(2)}(yuan)\n`;
  receipt += "**********************";

  return receipt;
}
