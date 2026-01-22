
import { FuneralLocation } from './FuneralLocation';
import { BurrialLocation } from './BurrialLocation';
import { Flower } from './Flower';
import { Meal } from './Meal';
import {User} from './User';
import { TypeReligion } from './TypeReligion';
import { FArrangement } from './FArrangement';




export class Ceremony {
  idCer!: number;
  dateFuneral!: Date;
  nbrInvite!: number;
  nom!: string;
  prenom!: string;
  religion!: TypeReligion;
  funeralLocations!: FuneralLocation[] ;
  flowers!: Flower[];
  meals!: Meal[];
  burrialLocation!: BurrialLocation;
  farrangement!: FArrangement;

  
  user!: User;
}
