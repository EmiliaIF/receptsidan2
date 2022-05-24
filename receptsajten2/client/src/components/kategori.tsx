import { useState, useEffect } from "react";
import RecipeCard from "./receptkort";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import recept from "./recept";


const StyledWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 80%;
    margin: auto;
`

const RecipesByCategoryList = () => {
    const [recept, setRecipes] = useState<any>([]);
    const { categoryId } = useParams()
    useEffect(() => {
        const fetchRecipes = async () => {
            const recipes = await fetch(`http://localhost:3003/kategori/${categoryId}/recept`)
            // const recipes = await fetch(`${process.env.REACT_APP_API_BASE_URL}/categories/${categoryId}/recipes`)
            .then(res => res.json())
            setRecipes(recept);
        }
        fetchRecipes();
    }, [categoryId])
    return (
        <div>
            <StyledWrapper>
                {recept.map((recept: any) => <RecipeCard key={recept._id} recipe={recept}></RecipeCard>)}
                <p>Testar category route</p>
            </StyledWrapper>
        </div>
    )
}
export default RecipesByCategoryList;