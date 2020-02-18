import React, { useState } from 'react'



const sortData = (billData) => {
    const sortedData = {
        bills: [],
        potentialBills: []
    }

    billData.map(bill => {
        if (bill.isBill) {
            sortedData.bills.push(bill)
        } else {
            sortedData.potentialBills.push(bill)
        }
    })
    return sortedData
}


const TabDetail = ({ billData }) => {
    const [isBill, setIsBill] = useState(true)
    const [showTransaction, setShowTransaction] = useState(false)

    const sortedData = sortData(billData)

    const renderBill = (data) => {
        return data.map((bill, key) => {
            return (
                <li key={key} onClick={() => handleTransactions(key)}>
                    <span>{bill.name}</span>
                    <span>{bill.categoryId}</span>
                    <span>{bill.transactions.length}</span>
                    {renderTransactions(bill)}
                </li>
            )
        })
    }

    const handleTransactions = (key) => {
        if (isBill) {
            setShowTransaction(!showTransaction)
            sortedData.bills[key]['showTransaction'] = !showTransaction
        } else {
            setShowTransaction(!showTransaction)
            sortedData.potentialBills[key]['showTransaction'] = !showTransaction
        }
    }

    const renderTransactions = (bill) => {
        if(bill.showTransaction) {
            return bill.transactions.map((transaction, key) => {
                return (
                    <div key={key}>
                        {transaction.date}
                        {transaction.amount}
                    </div>
                )
            })
        }
        return null
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
                        {isBill ? renderBill(sortedData.bills) : renderBill(sortedData.potentialBills)}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default TabDetail;
