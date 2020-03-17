import React from 'react';
import './News.css';

function News(props) {
    return (
        <div className="News" style={{ height: '400px', overflow: 'auto' }}>
            <ul className="list-group">
                {
                    props.data && props.data.articles
                        ?
                        props.data.articles.map((item) => {
                            return (
                                <li className="list-group-item" key={item.url} onClick={() => { window.open(item.url) }}>
                                    <div className="news-list-item">
                                        <img src={item.urlToImage} />
                                        <span>&nbsp;&nbsp;</span>
                                        <div>
                                            <span>{item.title}</span>
                                            <br/>
                                            <span style={{fontSize: '11px', display: 'inline-block', float: 'right'}}>Source: <b>{item.source ? item.source.name : ''}</b></span>
                                        </div>
                                    </div>
                                </li>
                            );
                        })
                        :
                        null
                }
            </ul>
        </div>
    );
}

export default News;
