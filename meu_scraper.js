const axios = require('axios');
const fs = require('fs');

async function searchPlaces(query) {
    const apiKey = 'AIzaSyBuAZQhw0Nw270Y18gHCkrcE4i0jLwEWZc';

    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
            params: {
                key: apiKey,
                query: query
            }
        });

        return response.data.results;
    } catch (error) {
        console.error('Erro ao buscar lugares:', error);
        return [];
    }
}

async function writeResultsToFile(query) {
    try {
        const results = await searchPlaces(query);
        const filename = 'resultados.txt';

        let content = 'Resultados para: ' + query + '\n\n';
        results.forEach(place => {
            content += 'Nome: ' + place.name + '\n';
            content += 'Endereço: ' + place.formatted_address + '\n';
            content += '---------------------------\n';
        });

        fs.writeFileSync(filename, content);
        console.log('Os resultados foram escritos em ' + filename);
    } catch (error) {
        console.error('Erro ao escrever resultados em arquivo:', error);
    }
}

writeResultsToFile('empresas alimenticias em são paulo');
