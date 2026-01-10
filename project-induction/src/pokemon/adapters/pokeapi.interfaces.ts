export interface PokeApiListResponse {
  results: {
    name: string;
    url: string;
  }[];
}

export interface PokeApiStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokeApiDetailResponse {
  name: string;
  stats: PokeApiStat[];
  types: {
    type: {
      name: string;
    };
  }[];
}
