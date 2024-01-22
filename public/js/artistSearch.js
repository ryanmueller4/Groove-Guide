var artistSearchForm = document.getElementById("artistSearchForm")

const artistSearch = artist => {
    var mbArtistSearch = 'https://musicbrainz.org/ws/2/artist?query=' + artist + '&fmt=json';
    
    console.log(mbArtistSearch);
    
    fetch(mbArtistSearch).then(response => {
        return (response.json());
    }).then(artist => {
        console.log(artist.artists[0].id);
        console.log(artist.artists[0].name);
        artistBrowse(artist.artists[0].id);
        artistBrowseOffset25(artist.artists[0].id);
        artistBrowseOffset50(artist.artists[0].id);
    })
};

const artistBrowse = id => {
    var mbArtistBrowse = 'https://musicbrainz.org/ws/2/release-group?artist=' + id + '&type=album|single|ep&fmt=json';

    console.log(mbArtistBrowse);

    fetch(mbArtistBrowse).then(response => {
        return (response.json());
    }).then(artist => {
        for (let index = 0; index < artist["release-groups"].length; index++) {
            const release = artist["release-groups"][index].title;
            console.log(release)
        }
    })
};

const artistBrowseOffset25 = id => {
    var mbArtistBrowse = 'https://musicbrainz.org/ws/2/release-group?artist=' + id + '&type=album|single|ep&offset=25&fmt=json';

    console.log(mbArtistBrowse);

    fetch(mbArtistBrowse).then(response => {
        return (response.json());
    }).then(artist => {
        for (let index = 0; index < artist["release-groups"].length; index++) {
            const release = artist["release-groups"][index].title;
            console.log(release)
        }
    })
};

const artistBrowseOffset50 = id => {
    var mbArtistBrowse = 'https://musicbrainz.org/ws/2/release-group?artist=' + id + '&type=album|single|ep&offset=50&fmt=json';

    console.log(mbArtistBrowse);

    fetch(mbArtistBrowse).then(response => {
        return (response.json());
    }).then(artist => {
        for (let index = 0; index < artist["release-groups"].length; index++) {
            const release = artist["release-groups"][index].title;
            console.log(release)
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