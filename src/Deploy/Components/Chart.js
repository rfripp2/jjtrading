
import React from 'react';
import axios from 'axios';
import { useEffect,useState,useRef} from 'react';
import { createChart } from 'lightweight-charts';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function getEqualStartingTime(fundingDataSet,priceDataSet){
 
  let shortestPeriod;
  let longuestPeriod;
  if (fundingDataSet[0].time >= priceDataSet[0].time){
    shortestPeriod = fundingDataSet
    longuestPeriod = priceDataSet
  }
  else{
    shortestPeriod = priceDataSet
    longuestPeriod = fundingDataSet
  }

  for (let i = 0; i < longuestPeriod.length -1; i++){
    for (let j = 0; j < shortestPeriod.length -1; j++){
      if (longuestPeriod[i].time == shortestPeriod[j].time){
        console.log("Equal!:",longuestPeriod[i].time,shortestPeriod[j].time)
        
        console.log("longuest period",longuestPeriod)
        console.log("shortest period:",shortestPeriod)
        console.log("resulkt:",longuestPeriod[i].time)
        return longuestPeriod[i].time
      }
    } 
  }

}

function filterFromStartingTime(dataset,startingTime){
  for (let i = 0; i < dataset.length -1; i++){
      if (dataset[i].time == startingTime){
        let newDataset = dataset.slice(i)
        return newDataset
      }
  }
}

function addTimeDataToFunding(fundingDataSet,historyDataSet,timeframe){
  let newFundingDataSet = [];
 
    for (let i = 0; i < fundingDataSet.length -1; i +=1){
      if (timeframe == "4h"){
        newFundingDataSet.push(fundingDataSet[i])
        for (let j = 0; j < 3;j+=i){
          newFundingDataSet.push({time : historyDataSet[j].time,value: fundingDataSet[i].value })
        }
      
      }
      if (timeframe == "1h"){
        newFundingDataSet.push(fundingDataSet[i],{time : fundingDataSet[i].time + 3600 ,value  : fundingDataSet[i].value})

      }
  }
  
  return newFundingDataSet
}



export function Chart (props) {

  async function drawCharts(timeframe){
    const fundingHistoryResponse = await axios.get('http://127.0.0.1:5000/api/fundinghistory')
    const priceHistory = await axios.get(`http://127.0.0.1:5000/api/historicalprice?interval=${timeframe}`)
  
    let startingTime = getEqualStartingTime(fundingHistoryResponse.data,priceHistory.data)
    setFundingHistory(fundingHistoryResponse.data)
    setBinancePrice(priceHistory.data)
    const fundingChart = createChart(fundingChartContainerRef.current, { width: 1200, height: 600, leftPriceScale: {
      visible: true,
      scaleMargins:{
        top: 0.85,
        bottom: 0.05
      }
    },
  });
  fundingChart.applyOptions({
    timeScale:{
      timeVisible: true
    }
  })
    let fundingLineSeries = fundingChart.addLineSeries({priceScaleId : 'left'});
    let priceHistoryCandleSeries = fundingChart.addCandlestickSeries({priceScaleId : "right"})
    let priceHistoryFiltered = filterFromStartingTime(priceHistory.data,startingTime)
    let fundingHistoryFiltered = filterFromStartingTime(fundingHistoryResponse.data,startingTime)
    console.log("price history length:",priceHistoryFiltered.length)
    console.log("funding history length:",fundingHistoryFiltered.length)

    let testData = addTimeDataToFunding(fundingHistoryFiltered,priceHistoryFiltered,"4h")
    console.log("test data",testData)


    priceHistoryCandleSeries.setData(priceHistoryFiltered)
    fundingLineSeries.setData(testData);
  

    
    setFundingHistory(fundingHistoryResponse.data)
    //let binancePriceSocket = new WebSocket(`wss://fstream.binancefuture.com/ws/btcusdt@kline_${timeframe}`)
    //let binanceFundingSocket = new WebSocket('wss://fstream.binance.com/ws/btcusdt@markPrice@1s')
    /*  binancePriceSocket.close()
    binanceFundingSocket.close() */
  
    let lastCandleTime;
  
  /*   binancePriceSocket.onmessage = function(event){
      let message = JSON.parse(event.data)
      let priceUpdated = message.k
      lastCandleTime = priceUpdated.t / 1000
      priceHistoryCandleSeries.update({
        close : priceUpdated.c,
        high: priceUpdated.h,
        low: priceUpdated.l,
        open: priceUpdated.o,
        time: priceUpdated.t / 1000
      })
    }
   */
  
  
  
  
    /* binanceFundingSocket.onmessage = function(event){
      let message = JSON.parse(event.data)
      let fundingRateUpdated = message.r
      fundingLineSeries.update({
          time : lastCandleTime,
          value : fundingRateUpdated * 100 * 3 * 365
      })
      console.log("last candle time",lastCandleTime)
    }  */


  }





  const [fundingHistory,setFundingHistory] = useState([])
  const [binancePrice,setBinancePrice] = useState([])
  const fundingChartContainerRef = useRef();
  const priceHistoryContainerRef = useRef()
  const [timeframe,setTimeFrame] = useState('')

  const handleChange = (event) => {
    drawCharts(event.target.value)
  };


  return(
    <div>
       <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth onSubmit = {()=> drawCharts(timeframe)}>
        <InputLabel id="demo-simple-select-label" >Time frame</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={timeframe}
          label="TimeFrame"
          onChange={handleChange}
          onSubmit = {()=> drawCharts(timeframe)}
         
        >
          <MenuItem value={"1m"}>1m</MenuItem>
          <MenuItem value={"1h"}>1h</MenuItem>
          <MenuItem value={"4h"}>4h</MenuItem>
          <MenuItem value={'8h'}>8h</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <div ref = {fundingChartContainerRef} className = "fundingChartContainerRef">
    </div>
    <div ref = {priceHistoryContainerRef} className  = "priceHistoryContainerRef"></div>
    </div>
  )
  }

  