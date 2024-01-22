var artistSearchForm = document.getElementById("artistSearchForm");

var releaseResults = []

const artistSearch = async artist => {
    var mbArtistSearch = 'https://musicbrainz.org/ws/2/artist?query=' + artist + '&fmt=json';
    
    console.log(mbArtistSearch);
    releaseResults = []
    
    fetch(mbArtistSearch).then(response => {
        return (response.json());
    }).then(artist => {
        console.log(artist.artists[0].id);
        console.log(artist.artists[0].name);
        artistBrowse(artist.artists[0].id);
    })
};

const artistBrowse = async id => {
    var mbArtistBrowse = 'https://musicbrainz.org/ws/2/release-group?artist=' + id + '&type=album|single|ep&fmt=json';
    var mbArtistBrowseOffset25 = 'https://musicbrainz.org/ws/2/release-group?artist=' + id + '&type=album|single|ep&offset=25&fmt=json';
    var mbArtistBrowseOffset50 = 'https://musicbrainz.org/ws/2/release-group?artist=' + id + '&type=album|single|ep&offset=50&fmt=json';

    console.log(mbArtistBrowse);
    console.log(mbArtistBrowseOffset25);
    console.log(mbArtistBrowseOffset50);

    fetch(mbArtistBrowse).then(response => {
        return (response.json());
    }).then(artist => {
        for (let index = 0; index < artist["release-groups"].length; index++) {
            const release = artist["release-groups"][index].title;
            console.log(release)
            releaseResults.push(release);
        }
    })
    fetch(mbArtistBrowseOffset25).then(response => {
        return (response.json());
    }).then(artist => {
        for (let index = 0; index < artist["release-groups"].length; index++) {
            const release = artist["release-groups"][index].title;
            console.log(release)
            releaseResults.push(release);
        }
    })
    fetch(mbArtistBrowseOffset50).then(response => {
        return (response.json());
    }).then(artist => {
        for (let index = 0; index < artist["release-groups"].length; index++) {
            const release = artist["release-groups"][index].title;
            console.log(release)
            releaseResults.push(release);
        }
        displayReleaseResults(releaseResults);
    })
    console.log(releaseResults);
};

const displayReleaseResults = (releases) => {
    document.getElementById("resultCol1").innerHTML = "";
    document.getElementById("resultCol2").innerHTML = "";
    for (let index = 0; index < releases.length; index++) {
        const release = releases[index];
        if (index % 2 == 0) {
            var onerelease = document.createElement("p");
            onerelease.textContent = release;
            document.getElementById("resultCol1").append(onerelease);
        } else {
            var tworelease = document.createElement("p");
            tworelease.textContent = release;
            document.getElementById("resultCol2").append(tworelease);
        }
    }
}

artistSearchForm.addEventListener("submit", event => {
    event.preventDefault();

    var input = document.getElementById("artistSearchInput");

    if (input.value == "") {
        console.log("Please search for an artist.");
    } else {
        artistSearch(input.value);
        input.value = ""
    }
});