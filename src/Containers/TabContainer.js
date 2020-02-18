import React, { Component } from 'react'
import axios from 'axios'
import { APIConstants } from '../shared/constants'
import TabDetail from '../Components/TabDetail/TabDetail'

class TabContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            billData: []
        }
    }

    async fetchData() {
        const req = await axios.get(APIConstants.base + 'bills/')
        this.setState({billData: req.data})

    }
    
    componentDidMount() {
        this.fetchData()
    }

    render() {
        const { billData } = this.state
        console.log(billData)
        return (
            <>
                HI
                <TabDetail billData={billData} />
            </>
        )
    }
}

export default TabContainer
