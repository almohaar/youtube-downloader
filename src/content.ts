// fetch playlist videos url
const getVideosUrls = async (): Promise<string[]> => {
    // make sure it's a youtube page
    const playlistPanelRenderer = document.getElementsByTagName(
      'ytd-playlist-panel-video-renderer',
    );

    const videosUrls: string[] = []

    if (playlistPanelRenderer.length === 0) {
      console.error('Not a youtube page');
      return [];
    } else {
        console.log('Youtube page detected');

        for (let i = 0; i < playlistPanelRenderer.length; i++) {
            const videoUrl = playlistPanelRenderer[i].getElementsByTagName('a')[0].href;
            // console.log(videoUrl);
            videosUrls.push(videoUrl);
        }
    }
    console.log('Videos urls:', videosUrls.length);
    return videosUrls
};

// download videos..
// using a downloader (library)
const downloadVideos = async (): Promise<boolean> => {
    let completed: boolean = true

    // get os dir / allow selecting download dir
  const downloadDir = '';

  const urls = await getVideosUrls();

    // ensure urls are not empty
    if (!urls || urls.length === 0) {
        console.log("Unable to get video urls");
        return false
    }

    // send urls to background worker.
  for (let i = 0; i < urls.length; i++) {
    chrome.runtime.sendMessage({
        action: "download",
        url: urls[i],
        filename: `video-${i + 1}.mp4`,
    }, response => {
        if (chrome.runtime.lastError) {
             console.error('Error sending message:', chrome.runtime.lastError);
             completed = false;
        } else {
            console.error(`Error downloading video ${i + 1}: ${response.error}`);
        }
    })
  }

  return completed;
};
