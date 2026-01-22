import { Ceremony } from "./Ceremony";
import { TypeLocation } from "./TypeLocation";

export class FuneralLocation {
    idLoc!: number;
    nameLoc!: string;
    imgLoc!: string;
    priceLoc!: number;
    capacityLoc!: number;
    typeLocation!: TypeLocation;
    funeralAdress!: string;
    ceremonies!: Ceremony[];
  
}
