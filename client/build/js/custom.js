// Show the News Modal with embedded iframe
function showModal(url) {
    document.getElementById('newsContent').innerHTML = '<iframe sandbox src="' + url +'" style="overflow:hidden;height:80vh;width:100%" frameBorder="0">Something went wrong while fetching the news.</iframe>';
    document.getElementById("newsModalButton").click();
}
