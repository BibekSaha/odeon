import React from 'react';
import CheckIcon from '../icons/CheckIcon';
import style from './WatchlistSelector.module.css';

const WatchlistSelector = ({ show, setShow, setFilter }) => {
  const [selected, setSelected] = React.useState([style.selected, '', '', '']);

  React.useEffect(() => {
    const select = window.localStorage.getItem('watchlist-filter') || '0';
    handleSelected(parseInt(select));
  }, []);

  const filterRef = React.useRef(0);

  if (!show) return null;

  const handleSelected = index => {
    const newSelected = new Array(4).fill('');
    newSelected[index] = style.selected;
    setSelected(newSelected);
    window.localStorage.setItem('watchlist-filter', index);
    filterRef.current = index;
  };

  const handleClose = () => {
    setShow(false);
    setFilter(filterRef.current);
  }

  return (
    <div
      onClick={e => {
        e.stopPropagation();
        handleClose();
      }}
      className={style.wrapper}
    >
      <div onClick={e => e.stopPropagation()} className={style.container}>
        <div className={style.title}>Sort Watchlist By</div>
        <div className={style.list}>
          <div
            onClick={() => handleSelected(0)}
            className={style.listItem + ' ' + selected[0]}
          >
            A - B
            {selected[0] && (
              <CheckIcon
                height="1.2rem"
                width="1.2rem"
                strokeColor="var(--white)"
              />
            )}
          </div>
          <div
            onClick={() => handleSelected(1)}
            className={style.listItem + ' ' + selected[1]}
          >
            Date Added
            {selected[1] && (
              <CheckIcon
                height="1.2rem"
                width="1.2rem"
                strokeColor="var(--white)"
              />
            )}
          </div>
          <div
            onClick={() => handleSelected(2)}
            className={style.listItem + ' ' + selected[2]}
          >
            Release Date
            {selected[2] && (
              <CheckIcon
                height="1.2rem"
                width="1.2rem"
                strokeColor="var(--white)"
              />
            )}
          </div>
          <div
            onClick={() => handleSelected(3)}
            className={style.listItem + ' ' + selected[3]}
          >
            Ratings
            {selected[3] && (
              <CheckIcon
                height="1.2rem"
                width="1.2rem"
                strokeColor="var(--white)"
              />
            )}
          </div>
        </div>
        <div className={style.saveButton} onClick={handleClose}>
          Save
        </div>
      </div>
    </div>
  );
};

export default WatchlistSelector;
