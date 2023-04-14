function search() {
  const query = document.getElementById("query").value;
  const options = {
    method: 'GET',
    url: 'https://youtube-media-downloader.p.rapidapi.com/v2/search/videos',
    params: { keyword: query },
    headers: {
      'X-RapidAPI-Key': '4b6839db4dmsh172bc041674ef2dp1eced5jsnf1995682587b',
      'X-RapidAPI-Host': 'youtube-media-downloader.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = ""; // clear previous results
    
    response.data.items.forEach(item => {
      const videoDiv = document.createElement("div");
      videoDiv.classList.add("video");
      
      const thumbnailImg = document.createElement("img");
      thumbnailImg.src = item.thumbnails[0].url;
      thumbnailImg.classList.add("thumbnail");
      
      const titleLink = document.createElement("a"); // create hyperlink element
      titleLink.href = `https://www.youtube.com/watch?v=${item.id}`; // add href attribute to YouTube video link
      
      const titleP = document.createElement("p");
      titleP.textContent = "Title: " + item.title;
      titleP.classList.add("title");
      titleLink.appendChild(titleP); // add title element to hyperlink element
      
      const channelP = document.createElement("p");
      channelP.textContent = "Channel: " + item.channel.name;
      channelP.classList.add("channel");
      
      const lengthP = document.createElement("p");
      lengthP.textContent = "Length: " + item.lengthText;
      lengthP.classList.add("length");
      
      const viewsP = document.createElement("p");
      viewsP.textContent = "Views: " + item.viewCountText;
      viewsP.classList.add("views");
      
      const idP = document.createElement("p"); // create new p element for video id
      idP.textContent = "Video ID: " + item.id; // set text content to video id
      idP.classList.add("id");
      
      const categoryP = document.createElement("p"); // create new p element for category
      categoryP.classList.add("category");
      if (item.category) {
        categoryP.textContent = "Category: " + item.category.name; // set text content to category name
      } else {
        categoryP.textContent = "Category: N/A";
      }
      
      const copyButton = document.createElement("button"); // create copy-to-clipboard button
      copyButton.textContent = "Copy Video ID to Clipboard";
      copyButton.classList.add("copy-button");
      copyButton.addEventListener("click", () => {
        navigator.clipboard.writeText(item.id); // copy video ID to clipboard
        alert(`Copied ${item.id} to clipboard!`); // show alert confirming copy
      });
      
      idP.appendChild(document.createElement("br"));
      idP.appendChild(copyButton); // add copy button to video ID element
      
      videoDiv.appendChild(thumbnailImg);
      videoDiv.appendChild(titleLink); // add hyperlink element instead of title element
      videoDiv.appendChild(channelP);
      videoDiv.appendChild(lengthP);
      videoDiv.appendChild(viewsP);
      videoDiv.appendChild(idP); // add video id element to video div
      videoDiv.appendChild(categoryP); // add category element to video div
      
      resultsContainer.appendChild(videoDiv);
    });
  }).catch(function (error) {
    console.error(error);
  });
}


function scrollToContainer() {
  const container = document.getElementById("container");
  container.scrollIntoView({ behavior: "smooth" });
}

 const downloadBtn = document.getElementById("download-btn");

      downloadBtn.addEventListener("click", () => {
        const videoId = document.getElementById("video-id").value;
        const options = {
          method: "GET",
          url: "https://youtube-mp3-download1.p.rapidapi.com/dl",
          params: { id: videoId },
          headers: {
            "X-RapidAPI-Key": "4b6839db4dmsh172bc041674ef2dp1eced5jsnf1995682587b",
            "X-RapidAPI-Host": "youtube-mp3-download1.p.rapidapi.com",
          },
        };
        axios
          .request(options)
          .then(function (response) {
            console.log(response.data);
            const link = response.data.link;
            const linkText = document.createTextNode("Download Link");
            const a = document.createElement("a");
            a.appendChild(linkText);
            a.href = link;
            a.download = `youtube_${videoId}.mp3`;
            const container = document.getElementById("download-link-container");
            container.appendChild(a);
          })
          .catch(function (error) {
            console.error(error);
          });
       });


const downloadButton = document.querySelector("#download-button");
const videoIdInput = document.querySelector("#video-id");

downloadButton.addEventListener("click", async () => {
  const videoId = videoIdInput.value;

  const options = {
    method: 'GET',
    url: 'https://ytstream-download-youtube-videos.p.rapidapi.com/dl',
    params: {id: videoId},
    headers: {
      'X-RapidAPI-Key': 'd062b00024mshad81c0d4922c1f5p14a948jsn0d238793f190',
      'X-RapidAPI-Host': 'ytstream-download-youtube-videos.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    // download the file here
  } catch (error) {
    console.error(error);
  }
});

function convertVideo(event) {
	event.preventDefault();
	const url = document.getElementById("url").value;
	
	const options = {
	  method: 'GET',
	  url: 'https://t-one-youtube-converter.p.rapidapi.com/api/v1/createProcess',
	  params: {
	    url: url,
	    format: 'mp4',
	    responseFormat: 'json',
	    lang: 'en'
	  },
	  headers: {
	    'X-RapidAPI-Key': '4b6839db4dmsh172bc041674ef2dp1eced5jsnf1995682587b',
	    'X-RapidAPI-Host': 't-one-youtube-converter.p.rapidapi.com'
	  }
	};
	
	axios.request(options).then(function (response) {
		const videoUrl = response.data.YoutubeAPI.urlVideo;
		const convertedUrl = document.getElementById("converted-url");
		convertedUrl.textContent = ""; // Clear any previous content
		const downloadBtn = document.createElement("a");
		downloadBtn.setAttribute("href", videoUrl);
		downloadBtn.setAttribute("download", "");
		downloadBtn.innerHTML = "<button>Download</button>";
		convertedUrl.appendChild(downloadBtn);
	}).catch(function (error) {
		console.error(error);
		document.getElementById("converted-url").textContent = "Error: " + error.message;
	});
}

