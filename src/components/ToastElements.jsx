
import styled, {keyframes} from 'styled-components'
const fadeIn = keyframes`
0%{
    transform:translate(100%);
    opacity:0,
}
100%{
    transform:translate(0%);
    opacity:1,
}
`;
export const ToastContainer = styled.div`
position:fixed;
right:20px;
top:100px;
padding:10px 12px;
border-radius:10px;
background: ${(props)=>props.bg};
animation: ${fadeIn}.3s ease-in;
`;
 export const ToastText = styled.div`

color:white;
`;
