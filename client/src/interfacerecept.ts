export interface interfacerecept {
  _id?: String;
  title: String;
  description: String;
  imageUrl: String;
  timeInMins: Number;
  ratings: Array<number>;
  category: String;
  ingredients: [{ name: string; amount: number; unit: string }];
  instructions: [{ instruction: string; order: number }];
  comments: [{ comment: string;}];
}
