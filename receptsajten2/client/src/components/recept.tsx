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
  font-family: monospace;
  background-color: #FFACAC;
  img {
    border-radius: 15px;
    box-shadow: 5px 3px 2px;
  }

  .descriptionRecipe {
    margin-left: 3rem;
    margin-top: 2rem;
    padding-top: 2rem;
    margin-bottom: 30rem;
    width: 20rem;
    border-radius: 20px;
    background-color: #F06363;
    box-shadow: 5px 3px 2px;
  }
  .ingredientInstructionStyle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    
  }
  p,
  li {
    font-size: 20px;
    list-style-type: none;
    margin: 20px;
  }
  h1 {
    font-size: 30px;
  }

  .ingredientsRecipe,
  .instructionsRecipe {
    margin-left: 3rem;
    margin-top: 2rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    width: 20rem;
    border-radius: 20px;
    box-shadow: 5px 3px 2px;
    background-color: #F06363;
  }
  .comment {
    margin-left: 2rem;
    margin-top: 2rem;
    padding-bottom: 2rem;
    padding-top: 1rem;
    width: 20rem;
    border-radius: 10px;
    background-color: #C7C7C7;
    box-shadow: 5px 2px 2px;
  }
  .starrating{
    margin-top: 10rem;
    margin-left: 5rem;
    background-color: #C7C7C7;
    margin-bottom: 50rem;
    box-shadow: 5px 3px 2px;
    border-radius: 10px;
    
  }
  .starsinrecipe{
    margin-left: 7rem;
  }
  .ReactStars{
    margin-left: 3.5rem;
  }

  .imageAndTitle {
    margin: 3rem;
    width: 25rem;
    border-radius: 15px;
  }
`;

const SingleRecipe = () => {
  const [recept, setRecipe] = useState<any>({});
  const [rated, setRated] = useState(false);
  const { receptId } = useParams();
  const [ratings, setRatings] = useState(0);
  const [ingredients, setIngredients] = useState(0);

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
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating: newRating }),
    });
    setRated(true);
  };

  useEffect(() => {
    if (recept.ratings !== undefined) {
      // Kollar om det finns ratings
      if (recept.ratings === []) return setRatings(0); // Kollar så att arrayen av ratings inte är tom

      let tempRating = 0;
      for (let i = 0; i < recept.ratings.length; i++) {
        // Adderar antal rating till en total summa
        tempRating += recept.ratings[i];
      }

      setRatings(tempRating / recept.ratings.length); // Sätter antalet ratings till den totala summan delat med längden av arrayen
      setIngredients(recept.ingredients.length); // Sätter antalet ingredienser till längden av ingrediens arrayen
    }
  }, [recept]);

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
        <p className="starsinrecipe">
          <ReactStars
            count={5}
            value={ratings}
            size={24}
            color2={"#ffd700"}
            edit={false}
          />
        </p>
      </div>
      <div className="ingredientInstructionStyle">
        <div className="ingredientsRecipe">
          <h1>INGREDIENTS</h1>
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
          <h1>INSTRUCTIONS</h1>
          <div>
            {recept.instructions &&
              recept.instructions.map((instructions: any) => (
                <li key={instructions.order}>{instructions.instruction} </li>
              ))}
          </div>

          <div className="comment">
            <h1>Comments:</h1>
            {recept.comments &&
              recept.comments.map((comment: any) => {
                return <p>{comment.comment}</p>;
              })}
          </div>
        </div>
      </div>
      <div className="starrating">
        <p className="starreciperating">Rate this recipe!</p>
        <div className="ReactStars">
        {rated ? (
          <p>Thank you for rating!</p>
        ) : (
          <ReactStars
            count={5}
            size={24}
            color2={"#ffd700"}
            half={false}
            onChange={fetchStars}
          />
        )}
      </div>
      </div>
    </StyledWrapper>
  );
};

export default SingleRecipe;
