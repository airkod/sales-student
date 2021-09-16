import {ITariff} from "./tariff";

export interface IUser {
  id: string,
  name: string,
  phone?: string,
  email: string,
  bonus: number,
  token?: string,
  tariff?: ITariff | null
}
