import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';

import * as actions from '../../../actions/CardActions';

import CardActions from './CardActions';


class CardSidebarContainer extends React.Component {
  static contextTypes = {
    store: PropTypes.object,
    history: PropTypes.object,
  };

  state = {
    popOverVisible: false,
  }

  handleClick = (e) => {
    const type = e.target.dataset.actionType;
    const $target = $(e.target);
    let pos = $target.offset();
    pos = Object.assign({}, pos, {
      top: pos.top + 33
    });

    this.setState({popOverVisible: true});
    this.props.onActionClick({type, pos, visible: this.state.popOverVisible});
  }

  handleSubmit = (e, id) => {
    const { history: { push } } = this.props;
    const store = this.context.store;
    const boardId = this.props.card.board_id;

    store.dispatch(actions.deleteCard(id));
    push(`/boards/${boardId}`);
  }

  render() {
    return (
      <aside className="modal-buttons">
        <h2>Add</h2>
        <ul>
          <li className="member-button"><i className="person-icon sm-icon"></i>Members</li>
          <li
            className="label-button"
            onClick={this.handleClick}
            data-action-type='labels'
          >
            <i className="label-icon sm-icon"></i>
            Labels
          </li>
          <li className="checklist-button"><i className="checklist-icon sm-icon"></i>Checklist</li>
          <li
            className="date-button"
            onClick={this.handleClick}
            data-action-type='due-date'
          >
            <i className="clock-icon sm-icon"></i>
            Due Date
          </li>
          <li className="attachment-button not-implemented"><i className="attachment-icon sm-icon"></i>Attachment</li>
        </ul>
        <CardActions
          cardId={this.props.card.id}
          onSubmit={this.handleSubmit}
          onCopyClick={this.handleClick}
        />
      </aside>
    )
  }
}

export default withRouter(CardSidebarContainer);
