import styled from 'styled-components';
import React from 'react';
import { Link } from 'react-router-dom';



const Header = styled.div`
   
   
width:100%;
height: 250px;
display:flex;
justify-content:center;
align-items:center;
text-align:center;
background-color: peachpuff;

h1{
    font-family:kaushan script;
    position:absolute;
    color: black;
    z-index:5;
    font-size:65px;
    margin-bottom: 30px;
}


}`
    


const MainHeader = () =>{

   return(
        <Header>
            {/* <Link to={`/`}> */}
           <h1>THE DRINK HUB</h1>
           {/* </Link>     */}
         </Header>
         
    );   
};

export default MainHeader; 