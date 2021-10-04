const PORT = 'https://localhost:44387';

$(function () {

    $.validator.setDefaults({
        errorClass: 'help-block',
        highlight: function (element) {
            $(element)
                .closest('.form-group')
                .addClass('has-error');
        },
        unhighlight: function (element) {
            $(element)
                .closest('.form-group')
                .removeClass('has-error')
                .addClass('has-success');
        }
    });

    //  Import Course Standard From Bedo

    $("#apply-bedo-setting").validate({
        rules: {

            bedoBaseUrlTxt: {
                required: true
            },
            qorrectBaseUrlTxt: {
                required: true
            },
            mediaBaseUrlTxt: {
                required: true
            }
        },
        messages: {
            bedoBaseUrlTxt: {
                required: 'Enter Bedo Connection String'
            },
            qorrectBaseUrlTxt: {
                required: 'Enter Qorrect Base Url'
            },
            mediaBaseUrlTxt: {
                required: 'Enter Media Base Url'
            }
        },
        submitHandler: function () {

           
            var settings = {
                "url": `${PORT}/ControlPanel/ApplyBedoSetting`,
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                    "QorrectBaseUrl": $("#qorrectBaseUrlTxt").val(),
                    "MediaBaseUrl": $("#mediaBaseUrlTxt").val(),
                    "BedobaseUrl": $("#bedoBaseUrlTxt").val()
                }),
            };

            $.ajax(settings).done(function (response) {
                console.log(response)
                $("#qorrectBaseUrlTxt").val('')
                $("#mediaBaseUrlTxt").val('')
                $("#bedoBaseUrlTxt").val('')
            }).fail(function (xhr, status, error) {
                console.log(error)
            });

        }
    });


});