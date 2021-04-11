import axios from 'axios'
import { storageService } from './storage.service.js'
async function getRate() {
    const data = storageService.load('rate')
    if (!data) {
        console.log('Axiosin getRate');
        const res = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=1`)
        const rate = (res.data)
        storageService.store('rate', rate)
        return Promise.resolve(rate)
    }
    else return Promise.resolve(data)
}
async function getMarketPrice() {
    const data = storageService.load('marketPrice')
    if (!data) {
        console.log('Axiosin getMarketPrice');
        const res = await axios.get(`https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`)
        const values = res.data.values
        const newVals = values.map(val => val.y)
        storageService.store('marketPrice', newVals)
        return Promise.resolve(newVals)
    }
    else return Promise.resolve(data)
}
async function getConfirmedTransactions() {
    const data = storageService.load('confiremdTransactions')
    if (!data) {
        console.log('Axiosin ConfirmedTrans');
        const res = await axios.get(`https://api.blockchain.info/charts/n-transactions?format=json&cors=true`)
        const values = res.data.values
        const newVals = values.map(val => val.y)
        storageService.store('confiremdTransactions', newVals)
        return Promise.resolve(newVals)
    }
    else return Promise.resolve(data)
}

export const bitcoinService = {
    getRate,
    getMarketPrice,
    getConfirmedTransactions
}



