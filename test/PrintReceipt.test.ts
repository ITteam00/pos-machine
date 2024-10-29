import {
  countTags,
  extractItemInfo,
  ItemInfo,
  printReceipt,
} from "../src/PrintReceipt";

describe("printReceipt", () => {
  it("should print receipt with promotion when print receipt", () => {
    const tags = [
      "ITEM000001",
      "ITEM000001",
      "ITEM000001",
      "ITEM000001",
      "ITEM000001",
      "ITEM000003-2.5",
      "ITEM000005",
      "ITEM000005-2",
    ];

    const expectText = `***<store earning no money>Receipt ***
Name：Sprite，Quantity：5 bottles，Unit：3.00(yuan)，Subtotal：12.00(yuan)
Name：Litchi，Quantity：2.5 pounds，Unit：15.00(yuan)，Subtotal：37.50(yuan)
Name：Instant Noodles，Quantity：3 bags，Unit：4.50(yuan)，Subtotal：9.00(yuan)
----------------------
Total：58.50(yuan)
Discounted prices：7.50(yuan)
**********************`;

    expect(printReceipt(tags)).toEqual(expectText);
  });

  it("should get tags count", () => {
    const tags = [
      "ITEM000001",
      "ITEM000001",
      "ITEM000001",
      "ITEM000001",
      "ITEM000001",
      "ITEM000003-2.5",
      "ITEM000005",
      "ITEM000005-2",
    ];
    const expected = new Map<string, number>([
      ["ITEM000001", 5],
      ["ITEM000003-2.5", 1],
      ["ITEM000005", 1],
      ["ITEM000005-2", 1],
    ]);
    const result = countTags(tags);

    expected.forEach((value, key) => {
      expect(result.get(key)).toEqual(value);
    });
  });

  it("should extract item info with quantity from tags count", () => {
    const items: ItemInfo[] = [
      { barcode: "ITEM000001", name: "Sprite", unit: "bottle", price: 3.0 },
      { barcode: "ITEM000002", name: "Apple", unit: "pound", price: 5.5 },
      { barcode: "ITEM000003", name: "Litchi", unit: "pound", price: 15.0 },
    ];

    const tagsCnt = new Map<string, number>([
      ["ITEM000001", 5],
      ["ITEM000003", 2.5],
    ]);

    const expected: ItemInfo[] = [
      {
        barcode: "ITEM000001",
        name: "Sprite",
        unit: "bottle",
        price: 3.0,
        quantity: 5,
      },
      {
        barcode: "ITEM000003",
        name: "Litchi",
        unit: "pound",
        price: 15.0,
        quantity: 2.5,
      },
    ];

    const result = extractItemInfo(items, tagsCnt);
    expect(result).toEqual(expected);
  });
});
