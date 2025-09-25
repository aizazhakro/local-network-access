const resultList = document.getElementById("fetch-results-list");
  
function appendResult(url, result) {
    const text = `${url}: ${result}`;
    const item = document.createElement("li");
    item.appendChild(document.createTextNode(text));
    resultList.appendChild(item);
}

function testFetch() {
    let url = "http://localhost:8000";
    let options = {
            "method": "get",
            "mode": "no-cors"
        };
    return fetch(url, options)
        .then((response) => {
            appendResult(url, `response received`);
        })
        .catch((error) => {
            appendResult(url, `error = ${error}`);
        });
}