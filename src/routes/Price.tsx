import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";


const Container = styled.div`
    padding: 0px 20px 30px 20px;
    max-width: 480px;
    margin: 0px auto;
`
const UpdateInfo = styled.div`
    padding: 10px 20px;
    border-radius:10px;
    background-color: ${props=>props.theme.cardBgColor};
    align-items: center;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`
const PriceCardContainer = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: ${props=>props.theme.cardBgColor};
    padding: 15px 40px;
    border-radius:10px;
    margin: 15px 0px;
`
const PriceCard = styled.span`
   display: flex;
    flex-direction: column;
    align-items: center;
`
interface PriceProps{
    coinId:string;
}
interface IPrice{
    last_updated: string;
    quotes:IUsd;
}
interface IUsd{
    USD:IPriceHistory
}
interface IPriceHistory{
    price:number;
    percent_change_1h: number;
    percent_change_1y: number;
    percent_change_6h: number;
    percent_change_7d: number;
    percent_change_12h: number;
    percent_change_15m: number;
    percent_change_24h: number;
    percent_change_30d: number;
    percent_change_30m: number;
}

function Price({coinId}:PriceProps){
    const {isLoading, data} = useQuery<IPrice>(["price",coinId],()=>fetchCoinTickers(coinId))
    const DATA_QUOTES_USD =data?.quotes.USD;
    console.log(data)
    
    return <div>
        {isLoading?"Loading Price..." : <Container>
            
            <PriceCardContainer>
                <PriceCard>Price</PriceCard>
                <PriceCard>${DATA_QUOTES_USD?.price.toFixed(2)}</PriceCard>
            </PriceCardContainer>        
            <PriceCardContainer>
                <PriceCard>Last 15 Minutes Change</PriceCard>
                <PriceCard>{DATA_QUOTES_USD?.percent_change_15m}%</PriceCard>
            </PriceCardContainer>
            <PriceCardContainer>
                <PriceCard>Last 30 Minutes Change</PriceCard>
                <PriceCard>{DATA_QUOTES_USD?.percent_change_30m}%</PriceCard>
            </PriceCardContainer>
            <PriceCardContainer>
                <PriceCard>Last 1 Hour Change</PriceCard>
                <PriceCard>{DATA_QUOTES_USD?.percent_change_1h}%</PriceCard>
            </PriceCardContainer>
            <PriceCardContainer>
                <PriceCard>Last 24 Hours Change</PriceCard>
                <PriceCard>{DATA_QUOTES_USD?.percent_change_24h}%</PriceCard>
            </PriceCardContainer>
            <PriceCardContainer>    
                <PriceCard>Last 7 Days Change</PriceCard>
                <PriceCard>{DATA_QUOTES_USD?.percent_change_7d}%</PriceCard>
            </PriceCardContainer>            
            <PriceCardContainer>
                <PriceCard>Last 30 Days Change</PriceCard>
                <PriceCard>{DATA_QUOTES_USD?.percent_change_30d}%</PriceCard>
            </PriceCardContainer>
            <PriceCardContainer>    
                <PriceCard>Last 1 Year Change</PriceCard>
                <PriceCard>{DATA_QUOTES_USD?.percent_change_1y}%</PriceCard>
            </PriceCardContainer>
            <UpdateInfo>Last Updated {data?.last_updated.replace("T",",").replace("Z","")}</UpdateInfo>
            </Container>}
    </div>
}

export default Price;