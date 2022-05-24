import { useState, useEffect } from "react";
import RecipeCard from "./receptkort";
import { interfacerecept } from "../interfacerecept";
import styled from 'styled-components';

const StyledWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 80%;
    margin: auto;
`


const RecipeList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [allRecipes, setRecipes] = useState<interfacerecept[]>([]);

    useEffect (() => {
        const getSearchedRecipe = async (searchTerm: string) => {
            const recept = await fetch(`http://localhost:3005/recept/search/${searchTerm}`)
            .then(res => res.json());
            setRecipes(recept);
        }
        // getSearchedRecipe(searchTerm);
        
        const loadRecipes = async () => {
            const recept = await fetch ('http://localhost:3005/recept')
            // const recipes = await fetch (`${process.env.REACT_APP_API_BASE_URL}/recipes`)
            .then(data => data.json());
            setRecipes(recept)
        }
        loadRecipes();


        if(searchTerm) {
            getSearchedRecipe(searchTerm);
        }else{
            loadRecipes();
        }


    }, [])

    return (
        <div>
            <input type="text" placeholder="Search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
            <StyledWrapper>
                {allRecipes.map((recept: any) => <RecipeCard key={recept._id} recept={recept}></RecipeCard>)}
            </StyledWrapper>
        </div>
    )
}

export default RecipeList;