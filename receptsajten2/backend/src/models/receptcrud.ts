import Recept from "./recept";


export const getRecipes = async () => {
    const recipes = await Recept.find()
    return recipes;
}


export const getReceptById = async (id: String) => {
  const recept = await Recept.findById({_id: id});
  return recept;
}

export const addStars = async (id: String, star: Number) => { // Trycker in den rating som användaren angett på sidan i arrayen av stjärnor
  return await Recept.findByIdAndUpdate({ _id: id }, { $push: { ratings: star } }) 
}

export const getReceptBysearch = async (searchterm: string) => { // // Söker och kollar om där finns något i databasen på antingen "title" eller "category" som matchar searchTerm
  const recipes = await Recept.find({$or: [
    { title: { $regex: '^' + searchterm, $options: 'i' }},
    { category: { $regex: '^' + searchterm, $options: 'i' }}
  ]})
  
  console.log(recipes)
  return recipes
}
  
  export const postReceptById = async (rating: number, id: string) => {
    await Recept.updateOne({ _id: id }, { $push: { ratings: rating } });
  };