import { useState, useEffect } from "react";
import RecipeCard from "./receptkort";
import { interfacerecept } from "../interfacerecept";
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin: auto;
`;

const RecipeList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allRecipes, setRecipes] = useState<interfacerecept[]>([]);

  useEffect(() => {
    const search = async () => { // En request för varje gång searchterm uppdateras
        console.log(searchTerm)
        const data = await fetch(`http://localhost:3005/recept/search/${searchTerm}`)
        const recipes = await data.json()

        setRecipes(recipes)
    }

    if(searchTerm !== '') search() // Om searchTerm är tom, hämta alla recept, annars sök med searchTerm
    else loadRecipes()
  }, [searchTerm])

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    const recept = await fetch("http://localhost:3005/recept")
      // const recipes = await fetch (`${process.env.REACT_APP_API_BASE_URL}/recipes`)
      .then((data) => data.json());
    setRecipes(recept);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a drink!"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <StyledWrapper>
        {allRecipes.map((recept: any) => (
          <RecipeCard key={recept._id} recept={recept}></RecipeCard>
        ))}
      </StyledWrapper>
    </div>
  );
};

export default RecipeList;
