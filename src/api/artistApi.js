const app_id = 12345

//Prepares the query by encoding.
const prepareArtistQuery = (name) => {
    const url = `https://rest.bandsintown.com/artists/${name}?app_id=${app_id}`;
    return encodeURI(url);
}

//Endpoint for getting the artist's data.
export const getArtist = (name) => {
    const URL = prepareArtistQuery(name);
    try {
        return fetch(URL).then(
            (response) => {
                return response.json().then(
                    (data) => {
                        return data;
                    }
                )
            }
        )
    } catch (error) {
        console.log(error);
    }
}

//Prepares the query by encoding.
const prepareArtistEventQuery = (name) => {
    const url = `https://rest.bandsintown.com/artists/${name}/events?app_id=${app_id}`;
    return encodeURI(url);
}

//Endpoint for getting the events of given artist.
export const getArtistEvent = (name) => {
    const URL = prepareArtistEventQuery(name);
    try {
        return fetch(URL).then(
            (response) => {
                return response.json().then(
                    (data) => {
                        return data;
                    }
                )
            }
        )
    } catch (error) {
        console.log(error);
    }
}

//Prepares the query by encoding.
const prepareSearchQuery = (name) => {
    const url = `http://localhost:3005/search?name=${name}`;
    return encodeURI(url);
}

//Endpoint for getting search results from test node server.
export const getArtistSearchResults = (name) => {
    const URL = prepareSearchQuery(name);
    try {
        return fetch(URL).then(
            (response) => {
                return response.json().then(
                    (data) => {
                        return data
                    }
                )
            }
        )
    } catch (error) {
        console.log(error);
    }
}

