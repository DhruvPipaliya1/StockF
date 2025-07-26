import React, { Component } from 'react';
import { NewsItem } from './NewsItem.jsx';
import { Spinner } from './Spinner.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      nextPage: null,
    };
    document.title = 'Stock News - NewsData';
  }

  componentDidMount() {
    this.updateNews();
  }

  updateNews = async () => {
    this.setState({ loading: true });

    const baseUrl = `https://newsdata.io/api/1/news?apikey=pub_e057639276354948a5aaabb4729cc696&country=in&category=business&language=en`;
    const url = this.state.nextPage ? `${baseUrl}&page=${this.state.nextPage}` : baseUrl;

    try {
      let response = await fetch(url);
      let data = await response.json();

      if (data.status === 'success') {
        this.setState({
          articles: this.state.articles.concat(data.results || []),
          nextPage: data.nextPage, // NewsData.io returns null when no more pages
          loading: false,
        });
      } else {
        console.error('API Error:', data);
        this.setState({ loading: false });
      }
    } catch (error) {
      console.error('Fetch failed:', error);
      this.setState({ loading: false });
    }
  };

  fetchMoreData = () => {
    if (this.state.nextPage) {
      this.updateNews();
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: '35px 0' }}>
          Business News - India
        </h1>

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.nextPage !== null}
          loader={<Spinner />}
        >
          <div className="row">
            {this.state.articles.map((article, index) => (
              <div className="col-md-4" key={index}>
                <NewsItem
                  title={article.title}
                  description={article.description}
                  source={article.source_id}
                  author={article.creator ? article.creator[0] : 'Unknown'}
                  publishedAt={article.pubDate}
                  imageUrl={article.image_url}
                  newsUrl={article.link}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
