
import { Component } from 'react'
import {Chart} from '../../cmps/Chart'
import { bitcoinService } from '../../services/bitcoin.service'
import './StatisticPage.scss'
export class StatisticPage extends Component {
    state={
        marketPriceData:null,
        transactionsData:null
    }
    componentWillMount() {
        this.getChartsData()
    }
    getChartsData = async () =>{
        const marketPriceData = await bitcoinService.getMarketPrice()
        this.setState({marketPriceData})
        const transactionsData = await bitcoinService.getConfirmedTransactions()
        this.setState({transactionsData})
    }
    
    
    
    render() {
        const {marketPriceData,transactionsData} = this.state
        return (
            <div className="statistic-page">
                <h2>Market Price (USD)</h2>
                <Chart data={marketPriceData}/>
                <h4>Avarage USD market price across major Bitcoin exchanges</h4>
                <hr/>
                <h2>Confirmed transactions per day</h2>
                <Chart data={transactionsData}/>
                <h4>The number of daily confirmed Bitcoin transactions</h4>
            </div>
        )
    }
}
