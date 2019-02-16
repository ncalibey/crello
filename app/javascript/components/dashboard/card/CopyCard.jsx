import React from 'react';
import PropTypes from 'prop-types';

class CopyCard extends React.Component {
  static contextTypes = {
    store: PropTypes.object,
  }

  state = {
    list: '',
    position: '',
    fields: {
      title: this.props.card.title
    }
  }

  componentDidMount() {
    const id = this.props.card.id;
    const store = this.context.store;
    const list = store.getState().lists.filter(list => list.id === this.props.card.list_id)[0];
    const cards = store.getState().cards.filter(card => card.list_id === this.props.card.list_id);
    let position;

    cards.forEach((card, i) => {
      if (card.id === this.props.card.id) position = i + 1;
    });

    this.setState({ list, position });
  }

  handleListChange = (e) => {
    const store = this.context.store;
    const list = store.getState().lists.filter(list => list.id === Number(e.target.value))[0];

    this.setState({ list });
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    const fields = Object.assign({}, fields, {
      title: e.target.value
    });

    this.setState({ fields });
  }

  render() {
    const store = this.context.store;
    const position = this.state.position;

    const card = this.props.card;
    const cards = store.getState().cards.filter(card => card.list_id === this.props.card.list_id);
    const cardOptions = cards.map((c, i) => (
      <option
        key={i}
        value={i + 1}
      >
        {i + 1}
      </option>
    ));



    const list = this.state.list;
    const listOptions = store.getState().lists.map((l, i) => {
      if (l.id === card.list_id) {
        return (
          <option
            key={i}
            value={l.id}
          >
            {l.title} (current)
          </option>
        )
      } else {
        return (
          <option
            key={i}
            value={l.id}
          >
            {l.title}
          </option>
        )
      }
    });

    return (
      <div>
        <header>
          <span>Copy Card</span>
          <a
            href="#"
            className="icon-sm icon-close"
            onClick={this.props.onCloseClick}
          >
          </a>
        </header>
        <div className="content">
          <label>Title</label>
          <textarea
            name="name"
            style={{marginBottom: '12px'}}
            value={this.state.fields.title}
            onChange={this.handleChange}
          >
          </textarea>
          {this.props.card.comments_count > 0 ?
            <div>
              <label>Keep…</label>
              <div className="check-div clearfix">
                <input id="keep-comments" type="checkbox" name="comments" checked="checked" onChange={''}/>
                <label htmlFor="keep-comments">
                  Comments <span className="quiet">(1)</span>
                </label>
              </div>
            </div>
            :
            ''
          }
          <br />
          <label>Copy to…</label>
          <div className="button-link setting board">
            <span className="label">Board</span>
            <span className="value js-board-value">First Board</span>
            <label>Board</label>
            <select>
              <option value="1" defaultValue>First Board (current)</option>
              <option value="2">Second Board</option>
              <option value="3">Third Board</option>
              <option value="4">Fourth Board</option>
              <option value="5">Fifth Board</option>
            </select>
          </div>
          <div>
            <div className="button-link setting list">
              <span className="label">List</span>
              <span className="value js-list-value">{list.title}</span>
              <label>List</label>
              <select
                name="list"
                value={list.id}
                onChange={this.handleListChange}
              >
                {listOptions}
              </select>
            </div>
            <div className="button-link setting position">
              <span className="label">Position</span>
              <span className="value">{position}</span>
              <label>Position</label>
              <select
                name="position"
                value={position}
              >
                {cardOptions}
              </select>
            </div>
          </div>

          <button className="button" type="submit">Create Card</button>
        </div>
      </div>
    )
  }
}

export default CopyCard;
