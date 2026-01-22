import { Ceremony } from "./Ceremony";

export class BurrialLocation {
    idBurrial!: number;
    burrialName!: string;
    burrialAdress!: string;
    burrialImg!: string;
    ceremonies!: Ceremony[];
}
