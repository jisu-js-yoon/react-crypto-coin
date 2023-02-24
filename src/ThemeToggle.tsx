import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isLightAtom } from "./atoms";


const Toggle = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${props=> props.theme.bgColor};
    color:${props=>props.theme.accentColor};
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;
	align-items: center;
	justify-content: center;
`

function ThemeToggle(){
    const isLight = useRecoilValue(isLightAtom);
    const setIsLight = useSetRecoilState(isLightAtom);
	const toggleTheme = () => setIsLight((current) => !current);

    return(
        <Toggle onClick={toggleTheme}>
            <div className="material-icons-round" style={{ fontSize: "inherit" }}>
			    {isLight ? "dark_mode" : "light_mode"}
		    </div>
        </Toggle>
    )
}

export default ThemeToggle;