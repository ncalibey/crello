import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import CardTile from './CardTile';

class CardsContainer extends React.Component {
  static contextTypes = {
    store: PropTypes.object,
  };

  render() {
    const id = this.props.listId;
    const cards = this.context.store.getState().cards.filter(card => card.list_id === id);
    const cardComponents = cards.map(card => (
      <Link
        to={`/cards/${card.id}`}
        key={card.id * id}
      >
        <CardTile
          key={card.id}
          id={card.id}
        />
      </Link>
    ));

    return(
      <div id="cards-container" data-id="list-2-cards">
        {cardComponents}
      </div>
    )
  }
}

export default CardsContainer;
