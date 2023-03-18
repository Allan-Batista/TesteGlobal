interface HeroesDTO {
  Id: number;
  Name: string;
  CategoryId: number;
  Active: boolean;
  Category: any;
}

interface GetHeroesDTO extends HeroesDTO {}
