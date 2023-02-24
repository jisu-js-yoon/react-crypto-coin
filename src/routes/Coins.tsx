import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0px;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: ${props=> props.theme.cardBgColor};
    color: ${props=> props.theme.textColor};
    margin-bottom: 10px;
    border-radius:15px;
    a{
        align-items: center;
        padding: 20px;
        transition: color 0.2s ease-in;
        display: flex;
        
    }
    &:hover{
        a{
            color:${props=>props.theme.accentColor}

        }
    }

`;

const Title = styled.h1`
    font-size: 48px;
    color:${props=> props.theme.accentColor}
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`

interface Icoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string
}

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-left: 10px;
    margin-right: 30px;
`

function Coins(){
    const {isLoading, data} = useQuery<Icoin[]>("allCoins", fetchCoins);
    /* const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        (async () => {
            const response = await fetch("https://api.coinpaprika.com/v1/coins");
            const json = await response.json();
            setCoins(json.slice(0,100));
            setLoading(false);
        })();
    },[]) */

    return (
        <Container>
            <HelmetProvider>
                <Helmet>
                    <title>Coins</title>
                </Helmet>
            </HelmetProvider>
        
        <Header>
            <Title>Coins</Title>
        </Header>
        {isLoading? <Loader>Loading...</Loader>:<CoinsList>
            {data?.slice(0,100).map(coin=>
                <Coin key={coin.id}>
                <Link to={{
                    pathname:`${coin.id}`,
                    state:{
                        name: coin.name
                    }
                }}>
                <Img 
                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} 
                />
                {coin.name}  &rarr;
            </Link></Coin>)}
            
        </CoinsList>}
    </Container>
    )
}

export default Coins;