import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { isLightAtom } from "../atoms";
import { useRecoilValue } from "recoil";

interface ChartProps{
    coinId: string;
}
interface IHistorical{
    time_open: number;
    time_close: number;
    open:string
    high:string
    low:string
    close:string
    volume:string
    market_cap:number
}

function Chart({coinId}:ChartProps){
    const {isLoading, data}= useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId))
    const isLight = useRecoilValue(isLightAtom);

    const exceptData = data ?? []
    const chartData =exceptData?.map((i)=>{
        return {
            x:i.time_close,
            y:[i.open,i.high, i.low, i.close]
        }
    })

    return(<div>
        {isLoading? "Loading chart...":
    <ApexChart
    type="candlestick"
    series={[
        {
            name: "Price",
            data: chartData,
        },
    ]}
    width="100%"
    height="300"
    options={{
        noData: {
            text: "",
        },
        plotOptions: {
            candlestick: {
                colors: {
                    upward: '#3C90EB',
                    downward: '#DF7D46'
                  },
                wick: {
                    useFillColor: true,
                },
            },
        },
        fill: {
            opacity: 1,
        },
        theme: {
            mode: isLight ? "light" : "dark",
        },
        chart: {
            toolbar: {
                show: false,
            },
            background: "transparent",
            fontFamily: '"Pretendard", sans-serif',
            width: 500,
            height: 300,
        },
        grid: {
            show: true,
        },
        xaxis: {
            labels: {
                show: true,
            },
            type: "datetime",
            categories: exceptData.map((price) => price.time_close * 1000),
            axisTicks: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        yaxis: {
            labels: {
                show: true,
            },
        },
        stroke: {
            width: 1.5,
        },
    }}
/>
    }

    </div>)
    
//     return <div>{isLoading? "Loading chart...": 
//     <ApexChart 
//         type="line" 
        // series={[
        //     {name:"Price",
        //     data: data?.map((price) => parseFloat(price.close)) ?? []
        // }
//         ]}
//         options={{
//             theme:{
//                 mode: "dark"
//             },
//             chart:{
//                 background: "transparent",
//                 height:300,
//                 width:500,
//                 toolbar:{
//                     show:false
//             }
//             },
//             grid:{
//                 show:false
//             },
//             stroke:{
//                 curve:"smooth",
//                 width:4,
//             },
//             yaxis:{
//                 show:false
//             },
//             xaxis:{ 
//                 labels:{
//                     show:false
//                 },
//                 axisTicks:{
//                     show: false
//                 },
//                 type:"datetime",
//                 categories: data?.map((price) =>
//                 new Date(price.time_close * 1000).toISOString()
//                 ),
//             },
//             fill:{
//                 type: "gradient",
//                 gradient:{ 
//                     gradientToColors:["#0be881"], stops:[0,100]}
//             },
//             colors:["#0fbcf9"],
//             tooltip:{
//                 y:{
//                     formatter: (value)=> `$ ${value.toFixed(2)}`
//                 }
//             }

// }}/>}</div>
}

export default Chart;