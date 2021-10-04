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

    $("#import-course-standard-from-bedo").validate({
        rules: {

            frmBearerToken: {
                required: true
            },
            frmCourseSubscription: {
                required: true
            }
        },
        messages: {
            frmBearerToken: {
                required: 'Please enter Bearer Token.'
            },
            frmCourseSubscription: {
                required: 'Please enter Course Subscription.'
            }
        },
        submitHandler: function () {


            var settings = {
                "url": "https://localhost:44387/Navy/ImportCourseStandardFromBedo",
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                    "CourseSubscriptionId": $("#frmCourseSubscription").val(),
                    "BearerToken": $("#frmBearerToken").val()
                }),
            };

            $.ajax(settings).done(function (response) {
                console.log(response);
                $("#frmCourseSubscription").val('')
                $("#frmBearerToken").val('')
            });

        }
    });

    // Import Course Standard From Bedo Leaf

    $("#import-course-standard-from-bedo-leaf").validate({
        rules: {

            frmBearerToken2: {
                required: true
            },
            frmCourseId: {
                required: true
            },
            frmlevelId: {
                required: true
            }
        },
        messages: {
            frmBearerToken2: {
                required: 'Please enter Bearer Token.'
            },
            frmCourseId: {
                required: 'Please enter Course Subscription.'
            },
            frmlevelId: {
                required: 'Please enter Level.'
            }
        },
        submitHandler: function () {

            var settings = {
                "url": "https://localhost:44387/Navy/ImportCourseStandardFromBedoLeaf",
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                    "CourseId": +$("#frmCourseId").val(),
                    "BearerToken": $("#frmBearerToken2").val(),
                    "ParentId": $("#frmlevelId").val()
                }),
            };

            $.ajax(settings).done(function (response) {
                console.log(response);
                $("#frmCourseId").val('')
                $("#frmBearerToken2").val('')
                $("#frmlevelId").val('')
            });

        }
    });

});