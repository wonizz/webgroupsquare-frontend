import React from 'react';
import agent from '../../agent';

const Tags = ({ props, onLoad }) => {
  const clickHandler = ev => {
    ev.preventDefault();
    onLoad(agent.Articles.returnBook(window.booktitle, window.email, window.returndate));
    window.closeModal();
    window.completeModal();
  }
    return (
      <div id="returnModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form>
              <div className="modal-header">						
                <h4 className="modal-title">도서 반납</h4>
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              </div>
              <div className="modal-body">					
                <p>정말로 도서를 반납하시겠습니까?</p>
              </div>
              <div className="modal-footer">
                <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel"/>
                <input type="submit" className="btn btn-danger" value="Ok" onClick={clickHandler}/>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default Tags;
