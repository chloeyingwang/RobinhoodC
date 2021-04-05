import React, {useState, useEffect} from 'react';
import './Stats.css';
import axios from 'axios';
import StatsRow from './StatsRow';
import db from './firebase'

const BASE_URL='https://finnhub.io/api/v1/quote';
const TOKEN = 'bv634bn48v6phr4c6oe0'

function Stats() {
    const [stockData, setstockData] = useState([])
    const [myStocks, setmyStocks] = useState([])

    const getMyStocks = () =>{
        db.collection('myStocks').onSnapshot(snapshot => {
            // console.log(snapshot)
            // console.log(snapshot.docs)
            let promises = [];
            let tempData = [];
            snapshot.docs.map((doc)=>{
                console.log(doc.data())
                promises.push(getStockData(doc.data().ticker)
                .then(res => {
                    tempData.push({
                        id: doc.id,
                        data: doc.data(),
                        info: res.data
                    })
                }))
            })
Promise.all(promises).then(()=>{
    console.log(tempData);
    setmyStocks(tempData)
})


        })
    }





    const getStockData = (stock)=>{
        return axios
        .get(`${BASE_URL}?symbol=${stock}&token=${TOKEN}`)
        .catch((error)=>{
            console.error('Error', error.message)
        })

    }
    useEffect(()=>{
        let tempStocksData = []
const stocksList = ['AAPL', 'MSFT', 'TSLA', "FB", "BABA", "UBER", "DIS", "SBUX"]
let promises = [];
getMyStocks();
stocksList.map((stock)=>{
    promises.push(
        getStockData(stock)
        .then((res)=>{
            console.log(res);
            tempStocksData.push({
            name: stock,
            ...res.data
        })
    })
    )
})

Promise.all(promises).then(()=>{
    console.log(tempStocksData);
    setstockData(tempStocksData)
})


    },[])

    return (
        <div className='stats'>
            <div className="stats__container">
                <div className="stats__header">
                    <p>Stocks</p>
                    {/* firebase */}
                </div>
                <div className="stats__content">
                    <div className="stats__rows">
                        {/* for our current stocks */}
                        {myStocks.map((stock)=>(
                            <StatsRow
                                key={stock.data.ticker}
                                name={stock.data.ticker}
                                openPrice={stock.info.o}
                                shares={stock.data.shares}
                                price={stock.info.c}
                            />
                        ))}
                    </div>
                </div>
                <div className="stats__header stats__lists">
                    <p>Lists</p>
                </div>
                <div className="stats__content">
                    <div className="stats__rows">
                        {/* stocks we can buy */}
                        {stockData.map((stock)=>(
                            <StatsRow
                                key={stock.name}
                                name={stock.name}
                                openPrice={stock.o}
                                price={stock.c}
                            />
                        ))}
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Stats
