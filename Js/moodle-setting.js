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

    $("#apply-moodle-setting").validate({
        rules: {

            moodleBaseUrlTxt: {
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
            moodleBaseUrlTxt: {
                required: 'Enter Moodle Base Url'
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
                "url": `${PORT}/ControlPanel/ApplyMoodleSetting`,
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                    "QorrectBaseUrl": $("#qorrectBaseUrlTxt").val(),
                    "MediaBaseUrl": $("#mediaBaseUrlTxt").val(),
                    "MoodlebaseUrl": $("#moodleBaseUrlTxt").val()
                }),
            };

            $.ajax(settings).done(function (response) {
                console.log(response)
                $("#qorrectBaseUrlTxt").val('')
                $("#mediaBaseUrlTxt").val('')
                $("#moodleBaseUrlTxt").val('')
            }).fail(function (xhr, status, error) {
                console.log(error)
            });

        }
    });


});