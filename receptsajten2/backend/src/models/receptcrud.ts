import Recept from "./recept";


export const getRecipes = async () => {
    const recipes = await Recept.find()
    return recipes;
}


export const getReceptById = async (id: String) => {
  const recept = await Recept.findById({_id: id});
  return recept;
}

// export const getReceptById = async (getReceptById: string) => {
//     const hittatRecept = await Recept.findById(  getReceptById );
    
//     return hittatRecept;
//   };

//   export const getRecipesByQuery = async (searchString: Object) => {
//     const key = Object.keys(searchString).find((key) => key === "search");
//     return await Recept.find({
//       title: { $regex: searchString[key], $options: "i" },
//     });
//   };
  
  export const postReceptById = async (rating: number, id: string) => {
    await Recept.updateOne({ _id: id }, { $push: { ratings: rating } });
  };