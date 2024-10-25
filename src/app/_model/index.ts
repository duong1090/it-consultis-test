export interface ListItem {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
}

export interface Type {
  id: number;
  name: string;
  pokemon: { pokemon: ListItem }[];
}
