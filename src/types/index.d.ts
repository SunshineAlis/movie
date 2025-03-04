export type Movie ={
    id: number;
  title: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
  name: string;
  page:number;
  release_date?: string;
  poster_path?: string;
  index:string;
  genre_ids: number[];
}

export type Genre = {
        id: number;
        name: string;
        title: string;
        release_date?: string;
        poster_path?: string;
        page:number;

      };
      