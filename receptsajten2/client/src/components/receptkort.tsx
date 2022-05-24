import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const StyledRecipeCard = styled.div`
    width: 200pxs;
     height: 25rem;
    background-color: #FFB879;
    
    margin: 1rem;
    border-radius: 5px;
    img {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    };
    a {
        text-decoration: none; 
        font-family: kaushan script;
        color: black;
    };   
`

const RecipeCard = ({recept}: any) => {
    // recept.filter((r:any) => r._id=== recept._id)
    console.log("hej")
  
    
    return(
   
        <div>
        <StyledRecipeCard>
    
            <Link to={`/recept/${recept._id}`}>
            <img 
            src={recept.imageUrl} 
            alt={recept.title}
            width="304"
            height="180" />
            <h2>{recept.title}</h2>
            <p>{recept.ratings} RATING</p>
            <p>{recept.ingredients.length} INGREDIENTS | {recept.timeInMins} MINUTES</p>
            </Link>
        </StyledRecipeCard>
        </div>
    )
}

export default RecipeCard;