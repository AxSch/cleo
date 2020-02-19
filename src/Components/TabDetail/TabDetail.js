import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

const renderTransactionDate = (bill) => {
    if (bill.showTransaction) {
        return bill.transactions.map((transaction, key) => {
            return (
                <tr key={key} className="flex flex-row -mt-3 mb-3 justify-between">
                    <td>{transaction.date}</td>
                </tr>
            )
        })
    }
    return null
}

const renderTransactionAmount = (bill) => {
    if (bill.showTransaction) {
        return bill.transactions.map((transaction, key) => {
            return (
                <tr key={key} className="flex flex-row -mt-3 mb-3 justify-between">
                    <td>£{transaction.amount}</td>
                </tr>
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


const TabDetail = ({ billData, removeBill, addBill, icons }) => {
    const [isBill, setIsBill] = useState(true)
    const [showTransaction, setShowTransaction] = useState(false)

    const renderBill = (data) => {
        return data.map((bill, key) => {
            return (
                <tr key={key} className="" onClick={() => handleTransactions(key)}>
                    <td className="pr-12">
                        <div>
                            <span className="pr-3">{bill.categoryId}</span>
                            <span>{bill.name}</span>
                        </div>
                        <span className="text-sm text-gray-600">{bill.transactions.length} Transactions</span>
                        {bill.showTransaction ? <div className="flex flex-row justify-between text-sm text-gray-600 mt-2 mb-3 w-full">
                            <span>Date</span>
                        </div> : null}
                        {renderTransactionDate(bill)}
                    </td>
                    <td className="pr-2 align-top">
                        <div>
                            <span>{calculateBillAmount(bill)}</span>
                        </div>
                        {bill.showTransaction ? <span className="text-sm text-gray-600">close</span> : <span className="text-sm text-gray-600">more</span>}
                        {bill.showTransaction ? <div className="flex flex-row justify-between text-sm text-gray-600 mt-2 mb-3 w-full">
                            <span>Amount</span>
                        </div> : null}
                        {renderTransactionAmount(bill)}
                    </td>
                    <td className="pr-4 align-top">
                        <span>{renderCTAbutton(bill, removeBill, addBill)}</span>
                    </td>
                </tr>
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
                    <table>
                        <tbody>
                            {billData !== null ? handleBillData(billData) : null}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default TabDetail
