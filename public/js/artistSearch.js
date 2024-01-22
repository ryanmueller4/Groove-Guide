var artistSearchForm = document.getElementById("artistSearchForm")

const artistSearch = artist => {
    var mbArtistSearch = 'https://musicbrainz.org/ws/2/artist?query=' + artist + '&fmt=json';
    
    console.log(mbArtistSearch);
    
    fetch(mbArtistSearch).then(response => {
        return (response.json());
    }).then(artist => {
        console.log(artist);
        console.log(artist.artists[0].name);
        artistLookup(artist.artists[0].id)
    })
};

const artistLookup = id => {
    var mbArtistLookup = 'https://musicbrainz.org/ws/2/artist/' + id + '?inc=recordings&fmt=json';

    console.log(mbArtistLookup);

    fetch(mbArtistLookup).then(response => {
        return (response.json());
    }).then(artist => {
        console.log(artist);
        console.log(artist.recordings);
        for (let index = 0; index < artist.recordings.length; index++) {
            const recording = artist.recordings[index].title;
            console.log(recording)
        }
    })
};

artistSearchForm.addEventListener("submit", event => {
    event.preventDefault();

    var input = document.getElementById("artistSearchInput");

    if (input.value == "") {
        console.log("Please search for an artist.");
    }
    else {
        artistSearch(input.value);
        input.value = ""
    }
});