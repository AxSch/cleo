import React from 'react'
import { shallow, mount } from 'enzyme'
import TabDetail from '../TabDetail'


const mockBillData = {
    bills: [
        {
            "categoryId": 3,
            "iconUrl": "https://pbs.twimg.com/profile_images/1026445460179955712/BWHmmzXt.jpg",
            "id": "5a5caad4fe33900100fd8ed7",
            "isBill": true,
            "name": "HSBC Mortgage",
            "transactions": [
                {
                    "amount": 1023,
                    "date": "2018-01-01",
                    "id": 1
                },
                {
                    "amount": 1023,
                    "date": "2018-02-01",
                    "id": 2
                },
                {
                    "amount": 1023,
                    "date": "2018-03-01",
                    "id": 3
                },
                {
                    "amount": 1023,
                    "date": "2018-04-01",
                    "id": 4
                },
                {
                    "amount": 1023,
                    "date": "2018-05-01",
                    "id": 5
                }
            ]
        },
    ],
    potentialBills: [
        {
            "categoryId": 2,
            "iconUrl": "https://pbs.twimg.com/profile_images/787957563463725056/duc0g4fp.jpg",
            "id": "5a5caa8efe33900100fd8ed6",
            "isBill": false,
            "name": "Sky TV",
            "transactions": [
                {
                    "amount": 82.17,
                    "date": "2018-01-01",
                    "id": 41
                },
                {
                    "amount": 82.17,
                    "date": "2018-02-01",
                    "id": 42
                },
                {
                    "amount": 82.17,
                    "date": "2018-03-01",
                    "id": 43
                },
                {
                    "amount": 82.17,
                    "date": "2018-04-01",
                    "id": 44
                },
                {
                    "amount": 82.17,
                    "date": "2018-05-01",
                    "id": 45
                }
            ]
        }
    ]
}

const icons = [
    {
      "iconUrl": "https://s3.eu-west-2.amazonaws.com/cleoassets/images/category_icons/income.png",
      "id": 1,
      "name": "Phone"
    },
    {
      "iconUrl": "https://s3.eu-west-2.amazonaws.com/cleoassets/images/category_icons/entertainment.png",
      "id": 2,
      "name": "TV"
    },
    {
      "iconUrl": "https://s3.eu-west-2.amazonaws.com/cleoassets/images/category_icons/bank_charges.png",
      "id": 3,
      "name": "Bank Charges"
    },
    {
      "iconUrl": "https://s3.eu-west-2.amazonaws.com/cleoassets/images/category_icons/transport.png",
      "id": 4,
      "name": "Transport"
    },
    {
      "iconUrl": "https://s3.eu-west-2.amazonaws.com/cleoassets/images/category_icons/groceries.png",
      "id": 5,
      "name": "Groceries"
    },
    {
      "iconUrl": "https://s3.eu-west-2.amazonaws.com/cleoassets/images/category_icons/eating_out.png",
      "id": 6,
      "name": "Eating Out"
    },
    {
      "iconUrl": "https://s3.eu-west-2.amazonaws.com/cleoassets/images/category_icons/shopping.png",
      "id": 7,
      "name": "Shopping"
    }
]

describe('TabDetail', () => {
    it('successfully renders', () => {
        const component = shallow(<TabDetail billData={mockBillData} icons={icons} addBill={() => {}} removeBill={() => {}}/>)
        expect(component).toHaveLength(1)
        expect(component).toMatchSnapshot()
    })

    describe('Bill Tab', () => {
        let component

        beforeEach(() => {
            component = shallow(<TabDetail billData={mockBillData} icons={icons} addBill={() => {}} removeBill={() => {}}/>)
        })

        it('successfully renders the default tab - Bills', () => {
            expect(component.find('#bills')).toHaveLength(1)
            expect(component.find('#bills').hasClass('font-semibold')).toEqual(true)
            expect(component.find('#potential-bills').hasClass('font-hairline')).toEqual(true) 
        })

        it('successfully renders bill correctly', () => {
            expect(component.find("#rendered-bill")).toHaveLength(1)
            expect(component.find("#bill-name").text()).toEqual("HSBC Mortgage")
            expect(component.find("#bill-total-amount").text()).toEqual('£5115.00')
            expect(component.find("#bill-cta")).toHaveLength(1)
        })

        it('successfully removes a bill', () => {
            const click = jest.fn()
            component = shallow(<TabDetail billData={mockBillData} icons={icons} addBill={() => {}} removeBill={click}/>)
            component.find('#bill-cta-remove').simulate('click', { preventDefault() {} })
            expect(click).toHaveBeenCalled()
        })

        xit('successfully renders bill transactions', () => {
            component.find("#rendered-bill").simulate('click', { preventDefault() {} })
            // expect(component.find("#bill-transaction-date")).toHaveLength(5)
            // expect(component.find("#bill-transaction-amount")).toHaveLength(5)
        })
    })
    

    describe('Potential Bills Tab', () => {
        let component

        beforeEach(() => {
            component = shallow(<TabDetail billData={mockBillData} icons={icons} addBill={() => {}} removeBill={() => {}}/>)
        })
        
        it('successfully changes the tab', () => {
            expect(component.find('#potential-bills')).toHaveLength(1)
            component.find('#potential-bills').simulate('click', { preventDefault() {} })
            expect(component.find('#potential-bills').hasClass('font-semibold')).toEqual(true) 
        })
    
        it('successfully renders bill correctly', () => {
            component.find('#potential-bills').simulate('click', { preventDefault() {} })
            expect(component.find("#rendered-bill")).toHaveLength(1)
            expect(component.find("#bill-name").text()).toEqual("Sky TV")
            expect(component.find("#bill-total-amount").text()).toEqual('£410.85')
            expect(component.find("#bill-cta")).toHaveLength(1)
        })

        xit('successfully renders bill transactions', () => {
            component.find('#potential-bills').simulate('click', { preventDefault() {} })
            component.find("#rendered-bill").simulate('click', { preventDefault() {} })
            // expect(component.find("#bill-transaction-date")).toHaveLength(5)
            // expect(component.find("#bill-transaction-amount")).toHaveLength(5)
        })

        it('successfully adds a potential bill', () => {
            const click = jest.fn()
            component = shallow(<TabDetail billData={mockBillData} icons={icons} addBill={click} removeBill={() => {}}/>)
            component.find('#potential-bills').simulate('click', { preventDefault() {} })
            component.find('#bill-cta-add').simulate('click', { preventDefault() {} })
            expect(click).toHaveBeenCalled()
        })
    })
    
})