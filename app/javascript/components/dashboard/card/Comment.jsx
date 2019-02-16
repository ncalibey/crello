import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class Comment extends React.Component {
  formatTime(minutes) {
    if (minutes) {

    }
  }

  render() {
    const comment = this.props.comment;
    const time = moment(comment.updated_at).from(moment());

    return (
      <li>
        <div className="member-container">
          <div className="card-member">tT</div>
        </div>
        <h3>teamToo()</h3>
        <div className="comment static-comment"><span>{comment.text}</span>
        </div>
        <small>{time} - <span className="link">Edit</span> - <span className="link">Delete</span></small>
        <div className="comment">
          <label>
            <textarea
              required=""
              rows="1"
              defaultValue={comment.text}
            >
            </textarea>
            <div>
              <a className="light-button card-icon sm-icon"></a>
              <a className="light-button smiley-icon sm-icon"></a>
              <a className="light-button email-icon sm-icon"></a>
            </div>
            <div>
              <p>You haven't typed anything!</p>
              <input type="submit" className="button not-implemented" value="Save" /><i className="x-icon icon"></i>
            </div>
          </label>
        </div>
      </li>
    )
  }
}

export default Comment;
