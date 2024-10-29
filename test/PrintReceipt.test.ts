import { printReceipt } from '../src/PrintReceipt'
import { getItemsCount } from '../src/PrintReceipt'
import { calculateExpense } from '../src/PrintReceipt'
import { calculateDiscount } from '../src/PrintReceipt'

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

  it('ITEM000001 count should be 5 and isProMotion is True', () => {
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
    const itemDictionary = getItemsCount(tags)
    expect(itemDictionary['ITEM000001'].quantity).toEqual(5)
    expect(itemDictionary['ITEM000001'].isProMotion).toEqual(true)
  })

  it('ITEM000001 totalExpense should be 12', () => {
    const itemDic =
    {
      ITEM000001: {
        barcode: 'ITEM000001',
        name: 'Sprite',
        unit: 'bottle',
        price: 3,
        isProMotion: true,
        quantity: 5,
        totalExpense: 0
      },
      ITEM000003: {
        barcode: 'ITEM000003',
        name: 'Litchi',
        unit: 'pound',
        price: 15,
        isProMotion: false,
        quantity: 2.5,
        totalExpense: 0
      },
      ITEM000005: {
        barcode: 'ITEM000005',
        name: 'Instant Noodles',
        unit: 'bag',
        price: 4.5,
        isProMotion: true,
        quantity: 3,
        totalExpense: 0
      }
    }
    calculateExpense(itemDic)
    expect(itemDic['ITEM000001'].totalExpense).toEqual(12)
  })

  
  it('Discount should be 7.5 and Totalshould be 58.5', () => {
    const itemDic =
    {
      ITEM000001: {
        barcode: 'ITEM000001',
        name: 'Sprite',
        unit: 'bottle',
        price: 3,
        isProMotion: true,
        quantity: 5,
        totalExpense: 12
      },
      ITEM000003: {
        barcode: 'ITEM000003',
        name: 'Litchi',
        unit: 'pound',
        price: 15,
        isProMotion: false,
        quantity: 2.5,
        totalExpense: 37.5
      },
      ITEM000005: {
        barcode: 'ITEM000005',
        name: 'Instant Noodles',
        unit: 'bag',
        price: 4.5,
        isProMotion: true,
        quantity: 3,
        totalExpense: 9
      }
    }
    expect(calculateDiscount(itemDic)[0]).toEqual(58.5)
    expect(calculateDiscount(itemDic)[1]).toEqual(7.5)
  })
})
