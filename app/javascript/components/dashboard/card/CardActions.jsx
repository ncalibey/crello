import React from 'react';
import $ from 'jquery';

class CardActions extends React.Component {
  handleClick = (e) => {
    e.preventDefault();

    this.props.onSubmit(e, this.props.cardId);
  }

  render() {
    const id = Number(this.props.cardId);

    return (
      <div>
        <h2>Actions</h2>
        <ul>
          <li className="move-button"><i className="forward-icon sm-icon"></i>Move</li>
          <li
            className="copy-button"
            onClick={this.props.onCopyClick}
            data-action-type='copy-card'
            data-offset={-70}
          >
            <i className="card-icon sm-icon"></i>Copy
          </li>
          <li className="subscribe-button"><i className="sub-icon sm-icon"></i>Subscribe<i className="check-icon sm-icon"></i>
          </li>
          <hr />
          <li
            className="archive-button"
            onClick={this.handleClick}
          >
            <i className="file-icon sm-icon "></i>Archive
          </li>
        </ul>
        <ul className="light-list">
          <li className="not-implemented">Share and more...</li>
        </ul>
      </div>
    )
  }
}

export default CardActions;
