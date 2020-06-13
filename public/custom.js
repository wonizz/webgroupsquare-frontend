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
			 user_name: {
                validators: {
                    notEmpty: {
                        message: 'The username is required and cannot be empty'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: 'The username must be more than 6 and less than 30 characters long'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9]+$/,
                        message: 'The username can only consist of alphabetical and number'
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