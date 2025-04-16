// Create Listeners to handle incoming messages

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "download") {
        console.log("Download request received, url:", request.url);

        // download video
        chrome.downloads.download({
            url: request.url,
            filename: request.filename,
            conflictAction: 'uniquify',
        })
    }
})

