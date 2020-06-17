function getTimeStamp() {

    var d = new Date();
    var s =
        leadingZeros(d.getFullYear(), 4) + '-' +
        leadingZeros(d.getMonth() + 1, 2) + '-' +
        leadingZeros(d.getDate(), 2);

    return s;
}


function getTimeStamp2weeksLater() {

    var d = new Date(Date.now() + 12096e5);
    var s =
        leadingZeros(d.getFullYear(), 4) + '-' +
        leadingZeros(d.getMonth() + 1, 2) + '-' +
        leadingZeros(d.getDate(), 2);

    return s;
}

function leadingZeros(n, digits) {

    var zero = '';
    n = n.toString();

    if (n.length < digits) {
        for (i = 0; i < digits - n.length; i++)
            zero += '0';
    }
    return zero + n;
}

/**
 * Modal 창 관련 
 */
function completeModal(){
    $('#myModal').modal({ show: true});
}

function openSuccessModal(){
    $('#successModal').modal({ show: true});
}

function closeSuccessModalEvent(){
    $('#successModal').on('hidden.bs.modal', function (e) {
        window.location.href = '/login';
    })
}

function closeModal(){
    $('#reservationModal').modal('hide');
    $('#returnModal').modal('hide');
    
}

//유저등록 validation
function validateForm(){
    $("#contact_form").submit(function(ev){
        ev.preventDefault();
    });
    $('#contact_form').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            user_name:{
                validators:{
                        notEmpty: {
                            message: '이름을 입력하세요.'
                        },
                        stringLength: {
                            min: 3,
                            max: 10,
                            message: '이름은 3자 이상 10자 이하로 입력하세요.'
                        },
                        regexp: {
                            regexp: /^[\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3\s/g]+$/,
                            message: '한글로 입력하세요.'
                        }   
                    }
             },
			 user_password: {
                validators: {
                    notEmpty: {
                        message: '패스워드를 입력해주세요.'
                    },
                    stringLength: {
                        min: 8,
                        message: '패스워드를 최소 8자이상 입력해주세요.'
                    }
                }
            },
            confirm_password: {
                validators: {
                    notEmpty: {
                        message: '패스워드 확인을 입력해주세요.'
                    },
                    identical: {
                        field: 'user_password',
                        message: '패스워드와 일치하지 않습니다.'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: '이메일 주소를 입력해주세요.'
                    },
                    emailAddress: {
                        message: '이메일 주소의 형식이 맞지 않습니다.'
                    },
                    regexp: {
                        regexp: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@samsung.com$/,
                        message: '이메일은 samsung.com만 허용됩니다.'
                    }   
                }
            }
            }
        }).on('error.field.bv', function(e, data) {
            if (data.bv.getSubmitButton()) {
                data.bv.disableSubmitButtons(false);
            }
        })
        .on('success.field.bv', function(e, data) {
            if (data.bv.getSubmitButton()) {
                data.bv.disableSubmitButtons(false);
            }
        });
        
}

//유저등록시 form체크 이상유무.
function isSubmitOk(){
    var disabledYN = true;
    $('.input-group > i').each(function(){
        var className = $(this).attr('class')
        if(className.indexOf('glyphicon-ok') ==-1){
            disabledYN = false;
        }
    })
    return disabledYN;
}

//data table 작성
function makeGrid(){
    setTimeout(function() { 
        $('#booklist').DataTable(); 
        $('#booklist_length').hide();
    }, 200);
        
}