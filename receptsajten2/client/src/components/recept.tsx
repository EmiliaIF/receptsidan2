import { useState, useEffect } from "react";
import { Params, useParams } from "react-router-dom";
import styled from "styled-components";
import ReactStars from "react-stars";

// const recipeprop {props:{
//     recipe: RecipeType;
//     children?: React.ReactNode | ReactChild[] | ReactChildren | ReactChildren[];
// Object.keys(myObj).length;
// }

// }

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  img {
    border-radius: 20px;
  }

  .descriptionRecipe {
    background-color: #ff6287;
  }

  .descriptionRecipe,
  .imageAndTitle {
    margin: 3rem;
    width: 25rem;
    border-radius: 20px;
  }
`;

const SingleRecipe = () => {
  const [recept, setRecipe] = useState<any>({});
  const [rated, setRated] = useState(false)
  const { receptId } = useParams();
  const [ratings, setRatings] = useState(0)
  const [ingredients, setIngredients] = useState(0)

  useEffect(() => {
    const fetchRecipe = async () => {
      const recept = await fetch(
        `http://localhost:3005/recept/${receptId}`
      ).then((res) => res.json());
      setRecipe(recept);
    };
    fetchRecipe();
  }, [receptId]);

  const fetchStars = async (newRating: Number) => {
    await fetch(`http://localhost:3005/recept/${receptId}/stars`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({rating: newRating})
    })
    setRated(true)
  
  }

  useEffect(() => {
    if(recept.ratings !== undefined) { // Kollar om där finns ratings
      if(recept.ratings === []) return setRatings(0) // Kollar så att arrayen av ratings inte är tom

      let tempRating = 0
      for(let i = 0; i < recept.ratings.length; i++) { // Adderar antal rating till en total summa
          tempRating += recept.ratings[i]
      }

      setRatings(tempRating / recept.ratings.length) // Sätter antalet ratings till den totala summan delat med längden av arrayen
      setIngredients(recept.ingredients.length) // Sätter antalet ingredienser till längden av ingrediens arrayen
    }
  }, [recept])

  return (
    <StyledWrapper>
      <div className="imageAndTitle">
        <img src={recept.imageUrl} alt={recept.title} width="454" />
      </div>
      <div className="descriptionRecipe">
        <h1>{recept.title}</h1>
        <p>{recept.description}</p>
        <p>{recept.timeinmins} Minuter</p>
        <p>{ingredients} Ingredienser</p>
        <p><ReactStars count={5} value={ratings} size={24} color2={"#ffd700"} edit={false} /></p>
      </div>
      <div className="ingredientsRecipe">
        <p>INGREDIENTS</p>
        <div>
          {recept.ingredients &&
            recept.ingredients.map((ingredients: any) => (
              <li key={ingredients.name}>
                {ingredients.name} {ingredients.amount} {ingredients.unit}{" "}
              </li>
            ))}
        </div>
      </div>

      <div className="instructionsRecipe">
        <p>INSTRUCTIONS</p>
        <div>
          {recept.instructions &&
            recept.instructions.map((instructions: any) => (
              <li key={instructions.order}>{instructions.instruction} </li>
            ))}
        </div>
      </div>
      <div>
        <h1>Comment</h1>
        {recept.comments &&
          recept.comments.map((comment: any) => {
            return <p>{comment.comment}</p>;
          })}
      </div>

      <div>
        {rated ? <p>Tack för ditt betyg</p> : <ReactStars count={5} size={24} color2={"#ffd700"} half={false} onChange={fetchStars} />}
      </div>
    </StyledWrapper>
  );
};

export default SingleRecipe;
