const app_id = 12345

const prepareArtistQuery = (name) => {
    const url = `https://rest.bandsintown.com/artists/${name}?app_id=${app_id}`;
    return encodeURI(url);
}

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

const prepareArtistEventQuery = (name) => {
    const url = `https://rest.bandsintown.com/artists/${name}/events?app_id=${app_id}`;
    return encodeURI(url);
}

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

const prepareSearchQuery = (name) => {
    const url = `http://localhost:3005/search?name=${name}`;
    return encodeURI(url);
}

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

