import { Ceremony } from "./Ceremony";

export class Flower {
    idFlower!: number;
    nomFlower!: string;
    imgFlower!: string;
    prixFlower!: number;
    description!: string;
    ceremonies!: Ceremony[];
}
