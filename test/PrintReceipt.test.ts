import { printReceipt, getProcessedCart,Item } from '../src/PrintReceipt'

fdescribe('printReceipt', () => {
  it('should print receipt with promotion when print receipt', () => {
    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ]

    const expectText = `***<store earning no money>Receipt ***
Name：Sprite，Quantity：5 bottles，Unit：3.00(yuan)，Subtotal：12.00(yuan)
Name：Litchi，Quantity：2.5 pounds，Unit：15.00(yuan)，Subtotal：37.50(yuan)
Name：Instant Noodles，Quantity：3 bags，Unit：4.50(yuan)，Subtotal：9.00(yuan)
----------------------
Total：58.50(yuan)
Discounted prices：7.50(yuan)
**********************`

    expect(printReceipt(tags)).toEqual(expectText);
  });

  it('should print receipt without promotion when print receipt', () => {
    const tags = [
      'ITEM000001',
    ]
 
    const expectText = `***<store earning no money>Receipt ***
Name：Sprite，Quantity：1 bottle，Unit：3.00(yuan)，Subtotal：3.00(yuan)
----------------------
Total：3.00(yuan)
Discounted prices：0.00(yuan)
**********************`
 
    expect(printReceipt(tags)).toEqual(expectText)
  })
  it('should print receipt with one promotion when print receipt', () => {
    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
    ]
 
    const expectText = `***<store earning no money>Receipt ***
Name：Sprite，Quantity：5 bottles，Unit：3.00(yuan)，Subtotal：12.00(yuan)
----------------------
Total：12.00(yuan)
Discounted prices：3.00(yuan)
**********************`
 
    expect(printReceipt(tags)).toEqual(expectText)
  })
});


describe('getProcessedCart', () => {
  const items: Item[] = [
    { barcode: 'ITEM000001', name: 'Sprite', unit: 'bottle', price: 3.00 },
    { barcode: 'ITEM000003', name: 'Litchi', unit: 'pound', price: 15.00 },
    { barcode: 'ITEM000005', name: 'Instant Noodles', unit: 'bag', price: 4.50 }
  ];

  it('should process cart with single items correctly', () => {
    const tags = ['ITEM000001-2', 'ITEM000003-1'];
    const expected = ['ITEM000001-2', 'ITEM000003-1'];
    expect(getProcessedCart(tags)).toEqual(expected);
  });

  it('should process cart with multiple quantities correctly', () => {
    const tags = ['ITEM000001-2', 'ITEM000001-3'];
    const expected = ['ITEM000001-5'];
    expect(getProcessedCart(tags)).toEqual(expected);
  });

  it('should handle items without quantity specified', () => {
    const tags = ['ITEM000001', 'ITEM000003-2'];
    const expected = ['ITEM000001-1', 'ITEM000003-2'];
    expect(getProcessedCart(tags)).toEqual(expected);
  });

  it('should get cart', () => {
    const tags = ['ITEM000001','ITEM000001', 'ITEM000007'];
    const expected =['ITEM000001-2', 'ITEM000007-1'];
    expect(getProcessedCart(tags)).toEqual(expected);
  });

  it('should sum quantities for multiple entries of the same item', () => {
    const tags = ['ITEM000001-2', 'ITEM000001-3', 'ITEM000003-1', 'ITEM000003-2'];
    const expected = ['ITEM000001-5', 'ITEM000003-3'];
    expect(getProcessedCart(tags)).toEqual(expected);
  });
});