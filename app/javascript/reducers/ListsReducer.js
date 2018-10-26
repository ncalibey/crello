export default function listsReducer(state = [], action) {
  switch (action.type) {
    case 'FETCH_BOARD_SUCCESS':
      const excludedLists = state.filter(list => list.board_id !== action.board.id);
      const newListWithoutCards = action.board.lists.map( list => {
        const { cards, ...noCards } = list;
        return noCards;
      })

      return excludedLists.concat(newListWithoutCards);
    case 'CREATE_LIST_SUCCESS':
      const newList = action.list;
      newList.id = Number(newList.id);

      return state.concat(newList)
    case 'EDIT_LIST_SUCCESS':
      const list = state.find(list => list.id === action.list.id);
      const updatedList = Object.assign({}, list, {title: action.list.title});

      return state.map(list => {
        if (list.id === updatedList.id) {
          return updatedList;
        } else {
          return list;
        }
      });
    default:
      return state;
  }
}
