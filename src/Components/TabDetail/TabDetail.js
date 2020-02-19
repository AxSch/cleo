import React, { useState } from 'react'


const renderTransactions = (bill) => {
    if(bill.showTransaction) {
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



const TabDetail = ({ billData }) => {
    const [isBill, setIsBill] = useState(true)
    const [showTransaction, setShowTransaction] = useState(false)

    const renderBill = (data) => {
        return data.map((bill, key) => {
            return (
                <li key={key} onClick={() => handleTransactions(key)}>
                    <div className="flex flex-row items-center justify-between mb-1">
                        <span>{bill.name}</span>
                        <span>{bill.categoryId}</span>
                    </div>
                    <div className="flex flex-row items-center justify-between mb-3">
                            <span>No. of transactions {bill.transactions.length}</span> 
                    </div>
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

    return (
        <>
            <div className="flex flex-row justify-center">
                <div className="flex flex-row flex-wrap w-full justify-around max-w-md">
                    <div onClick={() => setIsBill(true)}>Bills</div>
                    <div onClick={() => setIsBill(false)}>Potential Bills</div>
                </div>
            </div>
            <div className="flex flex-row justify-center">
                <div className="flex flex-row flex-wrap w-full justify-around max-w-md">
                    <ul>
                        {isBill ? renderBill(billData.bills) : renderBill(billData.potentialBills)}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default TabDetail;
