import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

const renderTransactionDate = (bill) => {
    if (bill.showTransaction) {
        return bill.transactions.map((transaction, key) => {
            return (
                <div id="bill-transaction-date" key={key} className="flex flex-row -mt-3 mb-3 justify-between">
                    <div>{transaction.date}</div>
                </div>
            )
        })
    }
    return null
}

const renderTransactionAmount = (bill) => {
    if (bill.showTransaction) {
        return bill.transactions.map((transaction, key) => {
            return (
                <div id="bill-transaction-amount" key={key} className="flex flex-row -mt-3 mb-3 justify-between">
                    <div>£{Number(transaction.amount).toFixed(2)}</div>
                </div>
            )
        })
    }
    return null
}

const renderCTAbutton = (bill, removeBill, addBill) => {
    const buttonMap = {
        true: (
            <button id="bill-cta-remove" className="ml-3 text-xl text-red-700" onClick={() => removeBill(bill.id)}>
                <FontAwesomeIcon icon={faMinusCircle} />
            </button>
        ),
        false: (
            <button id="bill-cta-add" className="ml-3 text-xl text-green-600" onClick={() => addBill(bill.id)}>
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
            £{Number(amount).toFixed(2)}
        </>
    )
}

const renderIcon = (billCategoryId, icons) => {
    if (icons.length < 1) return null
    const iconObj = icons.filter(icon => icon.id === billCategoryId)[0]
    return <img width="24" height="24" src={iconObj.iconUrl} alt="Bill icon" />

}


const TabDetail = ({ billData, removeBill, addBill, icons }) => {
    const [isBill, setIsBill] = useState(true)
    const [showTransaction, setShowTransaction] = useState(false)

    const renderBill = (data) => {
        return data.map((bill, key) => {
            return (
                <tr id="rendered-bill" key={key} className={bill.showTransaction ?
                    "cursor-pointer bg-gray-200" :
                    "cursor-pointer hover:bg-gray-200"}
                    onClick={() => handleTransactions(key)}>
                    <td className="pr-12 py-4 px-4">
                        <div className="flex flex-row">
                            <span className="pr-3">{renderIcon(bill.categoryId, icons)}</span>
                            <span id="bill-name">{bill.name}</span>
                        </div>
                        <span className="text-sm text-gray-600">{bill.transactions.length} Transactions</span>
                        {bill.showTransaction ? <div className="flex flex-row justify-between text-sm text-gray-600 mt-2 mb-3 w-full">
                            <span>Date</span>
                        </div> : null}
                        {renderTransactionDate(bill)}
                    </td>
                    <td className="pr-2 align-top py-4 pl-6">
                        <div>
                            <span id="bill-total-amount">{calculateBillAmount(bill)}</span>
                        </div>
                        {bill.showTransaction ? <span className="text-sm text-gray-600">close</span> : <span className="text-sm text-gray-600">more</span>}
                        {bill.showTransaction ? <div className="flex flex-row justify-between text-sm text-gray-600 mt-2 mb-3 w-full">
                            <span>Amount</span>
                        </div> : null}
                        {renderTransactionAmount(bill)}
                    </td>
                    <td className="pr-4 align-top py-4">
                        <span id="bill-cta">{renderCTAbutton(bill, removeBill, addBill)}</span>
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
                <div className="flex flex-row flex-wrap w-full justify-around max-w-md bg-gray-100 rounded-md">
                    <table>
                        <thead>
                            <tr className="pb-12">
                                <th id="bills" className={isBill ? 
                                    "text-left px-4 py-4 border-gray-400 border-b cursor-pointer font-semibold": 
                                    "text-left px-4 py-4 border-gray-400 border-b cursor-pointer font-hairline"} 
                                    onClick={() => setIsBill(true)}>
                                        Bills
                                </th>
                                <th id="potential-bills" className={!isBill ? 
                                    "text-left py-4 border-gray-400 border-b cursor-pointer font-semibold": 
                                    "text-left py-4 border-gray-400 border-b cursor-pointer font-hairline"} 
                                    onClick={() => setIsBill(false)}>
                                        Potential Bills
                                </th>
                                <th className="py-4 border-gray-400 border-b"></th>
                            </tr>
                        </thead>
                        <tbody id="bill-list">
                            {billData !== null ? handleBillData(billData) : null}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default TabDetail
