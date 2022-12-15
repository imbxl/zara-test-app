function filterPodcasts(data, filter, podcastId, success) {
  // Filter products by title & author
  let filteredData = data.filter(function (el) {
    if(podcastId !== null) return el.id.attributes['im:id'] === podcastId;
    return el.title.label.toLowerCase().includes(filter.toLowerCase()) || 
      el['im:artist'].label.toLowerCase().includes(filter.toLowerCase());
  });
  success(filteredData.length, filteredData);
}

export function getPodcasts(filter, success, podcastId) {
  let lastPodcastsSync = localStorage.getItem("lastPodcastsSync");
  let currentTime = (new Date()).getTime();
  if(lastPodcastsSync == null || currentTime-lastPodcastsSync > 24*60*60){
    fetch('https://cors-anywhere.herokuapp.com/https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
    .then(data => data.json())
    .then(data => {
      console.log(data);
      let list = data.feed.entry;
      localStorage.setItem("lastPodcastsSync",currentTime);
      localStorage.setItem("listPodcasts",JSON.stringify(list));
      filterPodcasts(list, filter, podcastId, success);
    });
  }else{
    let lastPodcasts = JSON.parse(localStorage.getItem("listPodcasts"));
    filterPodcasts(lastPodcasts, filter, podcastId, success);
  }
}

export function getPodcast(podcastId, success) {
  getPodcasts("", (count, data)=>{
    success(data[0]);
  }, podcastId);
}

export function getEpisodes(podcastId, success) {
  let lastPodcastsSync = localStorage.getItem("lastSync_"+podcastId);
  let currentTime = (new Date()).getTime();

  // Fetch podcasts first time loaded or 24 hours of diference between last sync date and current date
  if(lastPodcastsSync == null || currentTime-lastPodcastsSync > 24*60*60){
    fetch('https://cors-anywhere.herokuapp.com/https://itunes.apple.com/lookup?id='+podcastId)
    .then(data => data.json())
    .then(data => {
      let details = data.results;
      localStorage.setItem("lastSync_"+podcastId,currentTime);
      localStorage.setItem("dataPodcasts_"+podcastId,JSON.stringify(details));
      success(details);
    });
  }else{
    let details = JSON.parse(localStorage.getItem("dataPodcasts_"+podcastId));
    success(details);
  }
}