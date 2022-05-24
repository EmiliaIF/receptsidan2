import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactStars from "react-stars";

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
    .star{
        padding-left: 6.2rem;
    }
`

const RecipeCard = ({recept}: any) => {
    const [stars, setStars] = useState(0)

    useEffect(() => {
        if(recept.ratings === []) return setStars(0) // Kollar om ratings arrayen är tom

        let tempRating = 0
        for(let i = 0; i < recept.ratings.length; i++) { // Adderar antal rating till en total summa
            tempRating += recept.ratings[i]
        }

        setStars(tempRating / recept.ratings.length) // Sätter antalet ratings till den totala summan delat med längden av arrayen
        
    }, []) // Eftersom [] körs endast när komponenten skapas
  
    
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
                <p className="star"><ReactStars count={5} value={stars} size={24} color2={"#ffd700"} edit={false} /></p>
                <p>{recept.ingredients.length} INGREDIENTS | {recept.timeinmins} MINUTES</p>
                </Link>
            </StyledRecipeCard>
        </div>
    )
}

export default RecipeCard;
