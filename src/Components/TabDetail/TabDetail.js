import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

const renderTransactions = (bill) => {
    if (bill.showTransaction) {
        return bill.transactions.map((transaction, key) => {
            return (
                <div key={key} className="flex flex-row -mt-3 mb-3 justify-between">
                    <span>{transaction.date}</span>
                    <span>£{transaction.amount}</span>
                </div>
            )
        })
    }
    return null
}

const renderCTAbutton = (bill, removeBill, addBill) => {
    const buttonMap = {
        true: (
            <button className="ml-3 text-xl text-red-700" onClick={() => removeBill(bill.id)}>
                <FontAwesomeIcon icon={faMinusCircle} />
            </button>
        ),
        false: (
            <button className="ml-3 text-xl text-green-600" onClick={() => addBill(bill.id)}>
                <FontAwesomeIcon icon={faPlusCircle} />
            </button>
        )
    }
    return buttonMap[bill.isBill]

}

const calculateBillAmount = (bill) => {
    let amount = 0
    bill.transactions.forEach(transaction => {
        amount += transaction.amount
    });
    return (
        <>
            £{amount}
        </>
    )
}


const TabDetail = ({ billData, removeBill, addBill }) => {
    const [isBill, setIsBill] = useState(true)
    const [showTransaction, setShowTransaction] = useState(false)

    const renderBill = (data) => {
        return data.map((bill, key) => {
            return (
                <li key={key} onClick={() => handleTransactions(key)}>
                    <div className="flex flex-row items-center mb-1 justify-between">
                        <div className="mr-6">
                            <span className="pr-3">{bill.categoryId}</span>
                            <span>{bill.name}</span>
                            {renderCTAbutton(bill, removeBill, addBill)}
                        </div>
                        {calculateBillAmount(bill)}
                    </div>
                    <div className="flex flex-row items-center justify-between mb-3">
                        <span className="text-sm text-gray-600">{bill.transactions.length} Transactions</span>
                    </div>
                    {bill.showTransaction ? <div className="flex flex-row justify-between text-sm text-gray-600 mb-3">
                        <span>Date</span>
                        <span>Amount</span>
                    </div> : null}
                    {renderTransactions(bill)}
                </li>
            )
        })
    }

    const handleTransactions = (key) => {
        if (isBill) {
            setShowTransaction(!showTransaction)
            billData.bills[key]['showTransaction'] = !showTransaction
        } else {
            setShowTransaction(!showTransaction)
            billData.potentialBills[key]['showTransaction'] = !showTransaction
        }
    }

    const handleBillData = (billData) => {
        if (isBill) {
            return renderBill(billData.bills)
        } else {
            return renderBill(billData.potentialBills)
        }
    }

    return (
        <>
            <div className="flex flex-row justify-center">
                <div className="flex flex-row flex-wrap w-full justify-around max-w-md mb-4">
                    <div onClick={() => setIsBill(true)}>Bills</div>
                    <div onClick={() => setIsBill(false)}>Potential Bills</div>
                </div>
            </div>
            <div className="flex flex-row justify-center">
                <div className="flex flex-row flex-wrap w-full justify-around max-w-md">
                    <ul>
                        {billData !== null ? handleBillData(billData) : null}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default TabDetail
