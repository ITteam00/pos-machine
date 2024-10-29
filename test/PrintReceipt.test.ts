import { countItems } from "../src/getUserTotalItemsService";
import { printReceipt } from "../src/PrintReceipt";

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
});

describe("getAllReceiptItems", () => {
  it("should return all receipt items", () => {
    const allItems = [
      {
        barcode: "ITEM000000",
        name: "Coca-Cola",
        unit: "bottle",
        price: 3.0,
      },
    ];

    const allPromotions = [
      {
        type: "BUY_TWO_GET_ONE_FREE",
        barcodes: ["ITEM000000", "ITEM000001"],
      },
      {
        type: "OTHER_PROMOTION",
        barcodes: ["ITEM000003", "ITEM000004"],
      },
    ];
    const barcode = ["ITEM000000"];

    expect();
  });
});

describe("countItems", () => {
  it("should return count items", () => {
    const barcode = [
      "ITEM000001",
      "ITEM000001",
      "ITEM000001",
      "ITEM000001",
      "ITEM000001",
      "ITEM000003-3",
      "ITEM000005",
      "ITEM000005",
      "ITEM000005",
    ];
    const output = {
      ITEM000001: 5,
      ITEM000003: 3,
      ITEM000005: 3,
    };
    expect(countItems(barcode)).toEqual(output);
  });
});
