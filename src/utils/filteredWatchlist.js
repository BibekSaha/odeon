export const filterIndex = {
  0: 'A - Z',
  1: 'Date Added',
  2: 'Release Date',
  3: 'Ratings',
};

export default (wholeWatchList, filter = 0, type = 'all') => {
  let watchlist = { ...wholeWatchList };
  switch (filter) {
    case 0:
      watchlist = Object.values(watchlist).sort((a, b) =>
        a.props.title.localeCompare(b.props.title)
      );
      break;
    case 1:
      watchlist = Object.values(watchlist).sort(
        (a, b) => a.timestamp - b.timestamp
      );
      break;
    case 2:
      watchlist = Object.values(watchlist).sort((a, b) => {
        const aDate = a.props.release_date.split('-');
        const aTimestamp = new Date(
          Date.UTC(+aDate[0], +aDate[1] - 1, +aDate[2])
        ).getTime();

        const bDate = b.props.release_date.split('-');
        const bTimestamp = new Date(
          Date.UTC(+bDate[0], +bDate[1] - 1, +bDate[2])
        ).getTime();

        return aTimestamp - bTimestamp;
      });
      break;
    case 3:
      watchlist = Object.values(watchlist).sort((a, b) => a.props.vote_average - b.props.vote_average);
      break;
    default: break;
  }
  return watchlist;
};

export const sortByOrder = (watchlist, isAscending = false) => {
  if (!isAscending) watchlist.reverse();
  return watchlist;
}
