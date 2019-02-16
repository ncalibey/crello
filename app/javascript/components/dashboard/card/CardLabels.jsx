import React from 'react';
import PropTypes from 'prop-types';

class CardLabels extends React.Component {
  render() {
    const card = this.props.card;
    const labels = card.labels.map((label, i) => (
      <div className="member-container" key={i}>
        <div className={`${label} label colorblindable`}></div>
      </div>
    ));

    if (labels.length > 0) {
      return (
        <li className="labels-section">
          <h3>Labels</h3>
          {labels}
          <div className="member-container"><i className="plus-icon sm-icon"></i>
          </div>
        </li>
      )
    } else {
      return (null);
    }
  }
}

export default CardLabels;
