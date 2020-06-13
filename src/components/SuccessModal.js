import React from 'react';

const SuccessModal = ({ success }) => {
    if(success){
        window.openSuccessModal();
        window.closeSuccessModalEvent();
    }
    return (
      <div id="successModal" className="modal fade">
        <div className="modal-dialog modal-confirm">
          <div className="modal-content">
            <div className="modal-header">
              <div className="icon-box">
                <i className="material-icons">&#xE876;</i>
              </div>
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
            <div className="modal-body text-center">
              <h5>계정이 정상적으로 등록되었습니다.</h5>	
              <button className="btn btn-success" data-dismiss="modal"><span>확인</span> <i className="material-icons">&#xE5C8;</i></button>
            </div>
          </div>
        </div>
      </div>     
    );
};

export default SuccessModal;