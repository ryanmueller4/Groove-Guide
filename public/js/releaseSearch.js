var releaseSearchForm = document.getElementById("releaseSearchForm")

const releaseSearch = release => {
    var mbReleaseSearch = 'https://musicbrainz.org/ws/2/release?query=' + release + '&fmt=json';
    
    console.log(mbReleaseSearch);
    
    fetch(mbReleaseSearch).then(response => {
        console.log(response.json());
    })
};

releaseSearchForm.addEventListener("submit", event => {
    event.preventDefault();

    var input = document.getElementById("releaseSearchInput");

    if (input.value == "") {
        console.log("Please search for a release.");
    }
    else {
        releaseSearch(input.value);
        input.value = ""
    }
});