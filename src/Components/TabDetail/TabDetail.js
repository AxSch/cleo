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

const renderCTAbutton = (bill, removeBill, addBill) => {
    const buttonMap = {
        true: <button onClick={() => removeBill(bill.id)}>Remove bill icon</button>,
        false: <button onClick={() => addBill(bill.id)}>Add bill icon</button>
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
                <li key={key}>
                    <div className="flex flex-row items-center mb-1 justify-between">
                        <div onClick={() => handleTransactions(key)} className="mr-6">
                            <span className="pr-3">{bill.categoryId}</span>
                            <span>{bill.name}</span>
                        </div>
                        {calculateBillAmount(bill)}
                        {renderCTAbutton(bill, removeBill, addBill)}
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
