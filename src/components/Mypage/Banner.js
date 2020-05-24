import React from 'react';

const Banner = ({ appName, token }) => {
  if (token) {
    return null;
  }
  return (
    <div id="addEmployeeModal" className="modal fade">
		<div className="modal-dialog">
			<div className="modal-content">
				<form >
					<div className="modal-header">						
						<h4 className="modal-title">도서 예약</h4>
						<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div className="modal-body">					
						<div className="form-group">
							<label>도서명</label>
							<input type="text" className="form-control" required/>
						</div>
						<div className="form-group">
							<label>대출일자</label>
							<textarea className="form-control" required></textarea>
						</div>
						<div className="form-group">
							<label>반납예정일</label>
							<input type="text" className="form-control" required/>
						</div>					
					</div>
					<div className="modal-footer">
						<input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel"/>
						<input type="submit" className="btn btn-success" value="예약하기"/>
					</div>
				</form>
			</div>
		</div>
	</div>
  );
};

export default Banner;
