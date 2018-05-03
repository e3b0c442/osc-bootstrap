var emailRegexp = new RegExp(/^[A-Za-z0-9]+(.[A-Za-z0-9]+)*@[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])*(\.[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])*)*(\.[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])+)$/);
var phoneRegexp = new RegExp(/^1?[\s-]?\(?[2-9][0-9]{2}\)?[\s-]?[2-9][0-9]{2}[\s-]?[0-9]{4}$/);
function notOkField(node) {
    $(node).parent().removeClass('has-success');
    $(node).parent().addClass('has-error');
    $(node).parent().children('.help-block').show();
}

function okField(node) {
    $(node).parent().removeClass('has-error');
    $(node).parent().addClass('has-success');
    $(node).parent().children('.help-block').hide();
}

function validateNotEmpty(node) {
    if (node.value.length) {
        okField(node);
        return true;
    } else {
        notOkField(node);
        return false;
    }
}

function validateEmail(node, emptyOK) {
    if (emptyOK === true && node.value.length === 0) {
        okField(node);
        return true;
    }
    if (emailRegexp.test(node.value)) {
        okField(node);
        return true;
    } else {
        notOkField(node);
        return false;
    }
}

function validatePhone(node, emptyOK) {
    if (emptyOK === true && node.value.length === 0) {
        okField(node);
        return true;
    }
    if(phoneRegexp.test(node.value)) {
        okField(node)
        return true;
    } else {
        notOkField(node);
        return false;
    }
}

$(document).ready(function() {
    $('form .form-group input, form .form-group textarea').change(function(e) {
        var status;
        var validationType = $(e.target).data('validation-type');
        var emptyOK;
        if (validationType.endsWith("!")) {
            emptyOK = false;
            validationType = $(e.target).data('validation-type').substring(0, validationType.length - 1);
        } else {
            emptyOK = true;
        }
        
        switch(validationType) {
            case "non-empty":
                status = validateNotEmpty(e.target);
                break;
            case "email":
                status = validateEmail(e.target, emptyOK);
                break;
            case "phone":
                status = validatePhone(e.target, emptyOK);
                break;
            default:
                status = true;
                break;
        }
        $(e.target).data('invalid',  status ? 0 : 1);

        // enable/disable the submit button

        var disabler = $($(e.target).parents('form')[0]).find('input, textarea').map(function() {
            return $(this).data('invalid');
        }).get().reduce(function(a, v, i) {
            vv = Number.parseInt(v);
            if (vv !== NaN) {
                return a + v; 
            }
        }, 0);

        if(disabler > 0) {
            $(e.target).parents('form').find('input[type=submit]').prop('disabled', true);
        } else {
            $(e.target).parents('form').find('input[type=submit]').prop('disabled', false);
        }
    })
});
