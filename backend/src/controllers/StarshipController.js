import fetch from 'node-fetch';

const starshipsUrl = 'https://swapi.py4e.com/api/starships/';


export default class StarshipController {
  async list(request, response) {
    const { name } = request.query;
    let page = 1;
    const starshipsList = [];
    const responseApi = await fetch(`${starshipsUrl}`);
    const {count} = await responseApi.json();
    const maxPage = Math.round(count / 10);

    while(page <= maxPage) {
      const starshipsResponse = await fetch(`${starshipsUrl}?page=${page}`);
      const {results} = await starshipsResponse.json();
      results.map(spaceship => starshipsList.push(spaceship));
      page++;
    }

    if (name) {
      const filteredStarships = starshipsList.filter(starships => starships.name.includes(name));
      return response.json(filteredStarships)
    }

    return response.json(starshipsList)
  }
}