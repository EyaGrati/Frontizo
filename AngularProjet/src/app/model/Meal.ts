import { Ceremony } from "./Ceremony";

export class Meal {
    idMeal!: number;
    imgMeals!: string;
    nameMeal!: string;
    prixMeals!: number;
    description!: string;
    ceremonies!: Ceremony[];
}
