const API_KEY = '913a83d7f0a440058284a495642abd1c';
const BASE_URL = `https://newsapi.org/v2/top-headlines?country=br&apiKey=${API_KEY}`;

async function getNews(category) {
  const url = category ? `${BASE_URL}&category=${category}` : BASE_URL;
  const response = await fetch(url);
  const data = await response.json();
  return data.articles;
}

function displayNews(articles) {
  const newsSection = document.querySelector('#news');
  newsSection.innerHTML = ''; // limpa as notícias anteriores
  articles.forEach(article => {
    const newsItem = document.createElement('div');
    newsItem.classList.add('news-item');
    const newsImage = document.createElement('img');
    newsImage.src = article.urlToImage;
    const newsTitle = document.createElement('h2');
    const newsLink = document.createElement('a');
    newsLink.href = article.url;
    newsLink.textContent = article.title;
    newsLink.target = '_blank';
    newsLink.rel = 'noopener noreferrer';
    newsTitle.appendChild(newsLink);
    const newsDescription = document.createElement('p');
    newsDescription.textContent = article.description;
    //newsItem.appendChild(newsImage);
    newsItem.appendChild(newsTitle);
    newsItem.appendChild(newsDescription);
    newsSection.appendChild(newsItem);
  });
}

async function displayCategoryNews(category) {
  const news = await getNews(category);
  displayNews(news);
}


async function main() {
  const news = await getNews();
  displayNews(news);
}

main();

displayCategoryNews('general');
