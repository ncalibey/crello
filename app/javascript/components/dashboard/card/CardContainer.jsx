import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../actions/CardActions';

import CardHeader from './CardHeader';
import CardMainContainer from './CardMainContainer';
import CardSidebarContainer from './CardSidebarContainer';
import PopOver from './PopOver';
import DueDate from './DueDate';
import Labels from './Labels';
import CopyCard from './CopyCard';

class CardContainer extends React.Component {
  static contextTypes = {
    store: PropTypes.object,
    history: PropTypes.object,
  };

  state = {
    popover: {
      type: '',
      pos: {},
      visible: false,
    },
  }

  componentDidMount() {
    const id = Number(this.props.match.params.id);
    const store = this.context.store;
    const card = store.getState().cards.find(card => card.id === id);

    if (!card) store.dispatch(actions.fetchCard(id));
  }

  getChild = (type) => {
    const store = this.context.store;
    const id = Number(this.props.match.params.id);
    const card = store.getState().cards.find(card => card.id === id);

    switch (type) {
      case 'due-date':
        return (
          <DueDate
            onCloseClick={this.handlePopOverCloseClick}
            cardId={card.id}
            dueDate={card.due_date}
            onDateSubmit={this.handleSubmit}
          />
        )
      case 'labels':
        return (
          <Labels
            onCloseClick={this.handlePopOverCloseClick}
            labels={card.labels}
            cardId={card.id}
            dueDate={card.due_date}
            onLabelsSubmit={this.handleSubmit}
          />
        )
      case 'copy-card':
        return (
          <CopyCard
            onCloseClick={this.handlePopOverCloseClick}
            card={card}
          />
        )
      default:
        return (null)
    }
  }

  handleCloseClick = (e) => {
    const { history: { push } } = this.props;
    const store = this.context.store;
    const id = Number(this.props.match.params.id);
    const card = store.getState().cards.find(card => card.id === id);

    push(`/boards/${card.board_id}`);
  }

  handleSubmit = (e, attr) => {
    e.preventDefault();

    const store = this.context.store;
    const id = Number(this.props.match.params.id);
    const card = store.getState().cards.find(card => card.id === id);
    const cardId = card.id;
    const listId = card.list_id;

    store.dispatch(actions.editCard(cardId, listId, attr));
  }

  handleActionClick = (obj) => {
    this.setState({popover: obj});
  }

  handlePopOverCloseClick = () => {
    const popover = Object.assign({}, this.state.popover, {visible: false});

    this.setState({ popover });
  }

  render() {
    const store = this.context.store;
    const id = Number(this.props.match.params.id);
    const card = store.getState().cards.find(card => card.id === id);
    const list = store.getState().lists.find(list => list.id === card.list_id);
    const type = this.state.popover.type;
    const pos = this.state.popover.pos;

    if (card && list) {
      return (
        <div>
          <div id="modal-container">
            <div
              className="screen"
              onClick={this.handleCloseClick}
            >
            </div>
            <div id="modal">
              <i
                className="x-icon icon close-modal"
                onClick={this.handleCloseClick}
              ></i>
              <CardHeader
                card={card}
                listTitle={list.title}
                onSubmit={this.handleSubmit}
              />
              <CardMainContainer
                card={card}
              />
              <CardSidebarContainer
                card={card}
                onActionClick={this.handleActionClick}
              />
            </div>
          </div>
          <PopOver
            {...this.state.popover}
          >
            {this.getChild(type)}
          </PopOver>
        </div>
      )
    } else {
      return (null)
    }
  }
}

export default withRouter(CardContainer);
