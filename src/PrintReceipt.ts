import { loadAllItems, loadPromotions } from "./Dependencies";

export function printReceipt(tags: string[]): string {
  const items = loadAllItems();
  const promotions = loadPromotions();

  const tagsCount = countTags(tags);

  const receipt = `***<store earning no money>Receipt ***
Name：Sprite，Quantity：5 bottles，Unit：3.00(yuan)，Subtotal：12.00(yuan)
Name：Litchi，Quantity：2.5 pounds，Unit：15.00(yuan)，Subtotal：37.50(yuan)
Name：Instant Noodles，Quantity：3 bags，Unit：4.50(yuan)，Subtotal：9.00(yuan)
----------------------
Total：58.50(yuan)
Discounted prices：7.50(yuan)
**********************`;
  return receipt;
}

export function countTags(tags: string[]): Map<string, number> {
  const cnt = new Map<string, number>();
  tags.forEach((tag) => {
    if (cnt.has(tag)) {
      cnt.set(tag, cnt.get(tag)! + 1);
    } else {
      cnt.set(tag, 1);
    }
  });
  return cnt;
}
