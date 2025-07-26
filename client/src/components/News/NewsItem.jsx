import React, { Component } from 'react';

export class NewsItem extends Component {
  render() {
    const {
      title,
      description,
      imageUrl,
      newsUrl,
      publishedAt,
      author,
      source
    } = this.props;

    return (
      <div className="my-3">
        <div className="card">
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://www.whitehouse.gov/wp-content/uploads/2025/01/WH47-Social-Share-Card-Navy-1200x628-1.png"
            }
            className="card-img-top"
            alt="news"
          />

          {/* Source badge */}
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              right: '0',
              justifyContent: 'flex-end'
            }}
          >
            <span className="badge rounded-pill bg-danger">{source}</span>
          </div>

          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : 'Unknown'} on{' '}
                {publishedAt ? new Date(publishedAt).toGMTString() : 'Unknown'}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
