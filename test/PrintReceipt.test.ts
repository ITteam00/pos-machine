import {printReceipt} from '../src/PrintReceipt'
import { calculateQuantity } from '../src/PrintReceipt'
import { calculateSubtotal } from '../src/PrintReceipt'

describe('printReceipt', () => {
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

    expect(printReceipt(tags)).toEqual(expectText)
  })

  
  it('should print empty receipt when print receipt', () => {
    const tags: string[] = []

    const expectText = `***<store earning no money>Receipt ***
----------------------
Total：0.00(yuan)
Discounted prices：0.00(yuan)
**********************`

    expect(printReceipt(tags)).toEqual(expectText)
  })


  it('should return item-quantity hashMap when use calculateQuantity', () => {
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

    const expectDict = new Map<string, number>();
    expectDict.set('ITEM000001', 5)
    expectDict.set('ITEM000003', 2.5)
    expectDict.set('ITEM000005', 3)

    expect(calculateQuantity(tags)).toEqual(expectDict)
  })
  


  it('should return item-subtotal hashMap when use calculateSubtotal', () => {
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

    const itemQuantity = new Map<string, number>();
    itemQuantity.set('ITEM000001', 5)
    itemQuantity.set('ITEM000003', 2.5)
    itemQuantity.set('ITEM000005', 3)


    const expectItemSubtotalDict = new Map<string, number>();
    expectItemSubtotalDict.set('ITEM000001', 12.00)
    expectItemSubtotalDict.set('ITEM000003', 37.5)
    expectItemSubtotalDict.set('ITEM000005', 9.00)

    const expectedRes = {itemSubtotal:expectItemSubtotalDict, totalDiscount:7.50}

    expect(calculateSubtotal(itemQuantity)).toEqual(expectedRes)
  })

})
