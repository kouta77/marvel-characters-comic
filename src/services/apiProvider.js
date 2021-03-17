import CryptoJS from 'crypto-js';

const apiKey = process.env.REACT_APP_API_KEY;
const url = process.env.REACT_APP_API_URL;
const timeStamp = "10000";
const hash = CryptoJS.MD5({timeStamp,apiKey}).toString();

const getCharacters = async () => {
    try {
    let response = await fetch(url + 'characters?apikey=' + apiKey , {
        method: 'GET',
        Params: {
            "ts": {timeStamp},
            "hash": {hash}
            },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            }
    });
    let characters = await response.json();
    return characters.data.results

    } catch (error){
        console.log(error);
    }
}


const getComics = async () => {
    try {
    let response = await fetch(url + 'comics?apikey=' + apiKey , {
        method: 'GET',
        Params: {
            "ts": {timeStamp},
            "hash": {hash}
            },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            }
    });
    let comics = await response.json();
    return comics.data.results

    } catch (error){
        console.log(error);
    }
}

export { getCharacters, getComics}