import React from 'react';
import './StatsRow.css';
import StockSVG from './stock.svg';
import db from './firebase'

function StatsRow(props) {
    const percentage = ((props.price - props.openPrice)/props.openPrice) * 100;

    const buyStock = () => {
        console.log('buy',props.name)
        db.collection('myStocks').where('ticker', '==', props.name).get().then((querySnapshot)=>{
            if(!querySnapshot.empty){
                //update the record
                
                querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                db.collection('myStocks')
                .doc(doc.id)
                .update({
                    shares: doc.data().shares+=1
                })
                console.log(doc.id, " => ", doc.data());
            }); 
            } else {
                //add a new record
                db.collection('myStocks')
                .add({
                    ticker: props.name,
                    shares: 1
                })
                console.log('not available')
            }
            
           
        })
    }

    return (
        <div className='row' onClick={buyStock}>
            <div className="row__intro">
                <h1>{props?.name}</h1>
                <p>{props.shares && (props.shares + 'shares')}</p>            
                {/* <h1>AAPL</h1>
                <p>200 shares</p> */}
        </div>
        <div className="row__chat">
            <img src={StockSVG} height={16} />
        </div>
        <div className="row__numbers">
            <p className="row__price">{props.price}</p>
            <p className='row__percentage'>+{Number(percentage).toFixed(2)}%</p>
            {/* <p className="row__price">$200</p>
            <p className='row__percentage'>+200%</p> */}
        </div>
        </div>
    )
}

export default StatsRow
