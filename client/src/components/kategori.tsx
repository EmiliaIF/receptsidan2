import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import styled from "styled-components";
import recept from "./recept";
import RecipeCard from "./receptkort"

const StyledWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 80%;
    margin: auto;

.input{
  border: 2px solid red;
  border-radius: 4px;
  background-color: #3CBC8D;
}
`


const RecipesByCategoryList = () => {
    const [recepten, setRecipes] = useState<any>([]);
    const { categoryId } = useParams()
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
      const search = async () => { // En request för varje gång searchterm uppdateras
          console.log(searchTerm)
          const data = await fetch(`http://localhost:3005/recept/search/${searchTerm}`) // Hämtar alla recept som innehåller searchtermen
          const recipes = await data.json()
  
          setRecipes(recipes) // Sätter alla recept till de recet som hämtats från GET requesten ovan
      }
  
      if(searchTerm !== '') search() // Om searchTerm är tom, hämta alla recept, annars sök med searchTerm
      else loadRecipes()
    }, [searchTerm])
    
    useEffect(() => {
        loadRecipes();
    }, [categoryId])

    const loadRecipes = async () => {
        const recepten = await fetch(`http://localhost:3005/kategori/${categoryId}`)
        .then(res => res.json())
        setRecipes(recepten);
    }

    return (
        <div>
            <input className="input"
        type="text"
        placeholder="Search for a drink!"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
            <StyledWrapper>
                {recepten.map((recept: any) => <RecipeCard key={recept._id} recept={recept} />)}
            </StyledWrapper>
        </div>
    )
}
export default RecipesByCategoryList;