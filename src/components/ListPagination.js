import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import { SET_PAGE } from '../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onSetPage: (page, payload) =>
    dispatch({ type: SET_PAGE, page, payload })
});

const ListPagination = props => {
  if (props.bookCount <= 2) {
    return null;
  }

  const range = [];
  for (let i = 0; i < Math.ceil(props.bookCount / 2); ++i) {
    range.push(i);
  }

  const setPage = page => {
    if(props.pager) {
      props.onSetPage(page, props.pager(page));
    }else {
      props.onSetPage(page, agent.Articles.all(page))
    }
  };

  return (
   
      <div className="clearfix">
                <ul className="pagination">
     
        {
          range.map(v => {
            const isCurrent = v === props.currentPage;
            const onClick = ev => {
              ev.preventDefault();
              setPage(v+1);
            };
            return (
              <li 
              className={ isCurrent ? 'page-item active' : 'page-item' } 
              onClick={onClick}  
              key={v.toString()}>
                <a to="#">{v + 1}</a>
              </li>
            );
          })
        }
        </ul>
      </div>
  );
};

export default connect(() => ({}), mapDispatchToProps)(ListPagination);
