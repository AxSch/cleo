import React, { Component } from 'react'
import axios from 'axios'
import { APIConstants } from '../shared/constants'
import TabDetail from '../Components/TabDetail/TabDetail'

class TabContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            billData: [],
            sortedBillData: null,
            icons: []
        }
        this.removeBill = this.removeBill.bind(this)
        this.addBill = this.addBill.bind(this)
    }

    sortData(billData) {
        const sortedData = {
            bills: [],
            potentialBills: []
        }
    
        billData.forEach(bill => {
            if (bill.isBill) {
                sortedData.bills.push(bill)
            } else {
                sortedData.potentialBills.push(bill)
            }
        })
        this.setState({sortedBillData: sortedData})
    }

    async fetchBillData() {
        const req = await axios.get(APIConstants.base + 'bills/')
        this.setState({billData: req.data})
    }

    async removeBill(id) {
        await axios.patch(APIConstants.base + 'bills/' + id, { isBill: false})
        this.fetchBillData()
    }

    async addBill(id) {
        await axios.patch(APIConstants.base + 'bills/' + id, { isBill: true})
        this.fetchBillData()
    }

    async fetchIcons() {
        const req = await axios.get(APIConstants.base + 'categories/')
        this.setState({icons: req.data})
    }
    
    componentDidMount() {
        this.fetchBillData()
        this.fetchIcons()
    }

    componentDidUpdate(prevProps, prevState) {
        const { billData } = this.state
        if (billData !== prevState.billData) {
            this.sortData(billData)
        }
    }
    
    render() {
        const { sortedBillData, icons } = this.state
        return (
            <>
                <TabDetail billData={sortedBillData} removeBill={this.removeBill}  addBill={this.addBill} icons={icons} />
            </>
        )
    }
}

export default TabContainer
