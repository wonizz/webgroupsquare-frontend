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
                        message: 'The password is required and cannot be empty'
                    },
                    stringLength: {
                        min: 8,
                        message: 'The password must have at least 8 characters'
                    }
                }
            },
            confirm_password: {
                validators: {
                    identical: {
                        field: 'user_password',
                        message: 'The password and its confirm are not the same'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'The email address is required and cannot be empty'
                    },
                    emailAddress: {
                        message: 'The email address is not a valid'
                    },
                    regexp: {
                        regexp: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@samsung.com$/,
                        message: 'The e-mail must be end with samsung.com'
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

function makeGrid(){
    setTimeout(function() { 
        $('#example').DataTable(); 
        $('#example_length').hide();
    }, 200);
        
}