const PORT = 'https://localhost:44387';

function CheckAllFn(bx) {
    var cbs = document.getElementsByClassName('checker');
    for (var i = 0; i < cbs.length; i++) {
        if (cbs[i].type == 'checkbox') {
            cbs[i].checked = bx.checked;
        }
    }
}

$(function () {


    const TBLBODYAPI = document.getElementById('tblBodyApi');
    const TBLBODYAPI2 = document.getElementById('tblBodyApi2');
    let coursesGrid = [];

    function HTMLGrid(item) {
        let checkBox = `<input type="checkbox" class="checker" id="${item.id}"/>`;

        return `
    <tr>
        <th scope="row">${checkBox}</th>
        <td>${item.courseName}</td>
        <td>${item.courseCode}</td>
        <td>${item.totalMarks}</td>
    </tr>
    `;
    };

    function HTMLGrid2(item) {
        let xmlUploader = `<input type="file" id="xml_${item.idnumber}"/>`;

        return `
    <tr>
        <td>${item.fullname}</td>
        <td>${item.shortname}</td>
        <td>${xmlUploader}</td>
        <td><button type="button" data-item='${JSON.stringify(item.idnumber)}' class="btn btn-success" onclick="DISPLAYROW(this)">Run</button></td>
    </tr>
    `;
    };


    // load bedo courses list
    function GetCoursesDDL() {

        var settings = {
            "url": `${PORT}/Navy/BedoCousresList`,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            }
        };

        $.ajax(settings).done(function (response) {
            coursesGrid = response;
            TBLBODYAPI.innerHTML = '';
            for (let item of response) {
                TBLBODYAPI.innerHTML += `${HTMLGrid(item)}`;
            };


        }).fail(function (xhr, status, error) {
            console.log(error)
        });

    };

    GetCoursesDDL();



    // load modle courses list
    function GetCoursesDDL2(bearerToken) {

        $('#divLoading').addClass('loading');

        var settings = {
            "url": `${PORT}/modle/CourseList?wstoken=${bearerToken}`,
            "method": "GET",
            "timeout": 0,
        };


        $.ajax(settings).done(function (response) {
            coursesGrid = response.courses;
            TBLBODYAPI2.innerHTML = '';
            for (let item of coursesGrid) {
                TBLBODYAPI2.innerHTML += `${HTMLGrid2(item)}`;
            };
            $('#divLoading').removeClass('loading');

        }).fail(function (xhr, status, error) {
            console.log(error)
        });

    };


    $('#refreshBtn').on('click', function () {
        let bearerToken = $('#frmBearerToken').val();
        GetQorrectModules(bearerToken)
    })

    $('#refreshBtn2').on('click', function () {
        let bearerToken = $('#frmBearerToken2').val();
        GetQorrectModules2(bearerToken)
    });

    // Load Qorrect Module
    function GetQorrectModules2(bearerToken) {

        var settings = {
            "url": `${PORT}/Navy/QorrectModules/${bearerToken}`,
            "method": "GET",
            "timeout": 0,
        };


        $.ajax(settings).done(function (response) {
            const { list, totalCountWithoutFilter } = response;
            $("#frmCourseSubscription2").html('')
            $.each(list, function (data, value) {

                $("#frmCourseSubscription2").append($("<option></option>").val(value.id).html(value.fullName));
            })

        }).fail(function (xhr, status, error) {
            console.log(error)
        });

    };

    // Load Qorrect Module
    function GetQorrectModules(bearerToken) {

        var settings = {
            "url": `${PORT}/Navy/QorrectModules/${bearerToken}`,
            "method": "GET",
            "timeout": 0,
        };


        $.ajax(settings).done(function (response) {
            const { list, totalCountWithoutFilter } = response;
            $("#frmCourseSubscription").html('')
            $.each(list, function (data, value) {

                $("#frmCourseSubscription").append($("<option></option>").val(value.id).html(value.fullName));
            })

        }).fail(function (xhr, status, error) {
            console.log(error)
        });

    };

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

            var ids = [];
            var checkboxes = document.querySelectorAll('input.checker[type="checkbox"]:checked');
            for (var checkbox of checkboxes) {
                ids.push(+checkbox.id);
            }

            var coursesReq = [];
            // get all courses by ids

            for (let crs of coursesGrid) {

                for (let id of ids) {

                    if (crs.id == id) {
                        coursesReq.push(crs);
                    }

                };
            };

            var settings = {
                "url": `${PORT}/Navy/ImportAllFromBedo`,
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                    "CourseSubscriptionId": $("#frmCourseSubscription").val(),
                    "BearerToken": $("#frmBearerToken").val(),
                    "Courses": coursesReq
                }),
            };

            $.ajax(settings).done(function (response) {
                console.log(response)
                $("#frmCourseSubscription").val('')
                $("#frmBearerToken").val('')
                TBLBODYAPI.innerHTML = '';
                GetCoursesDDL();
            }).fail(function (xhr, status, error) {
                console.log(error)
            });

        }
    });


    // Login Modle

    $("#login-modle").validate({
        rules: {

            frmUsername: {
                required: true
            },
            frmPassword: {
                required: true
            }
        },
        messages: {
            frmUsername: {
                required: 'Please enter username.'
            },
            frmPassword: {
                required: 'Please enter password.'
            }
        },
        submitHandler: function () {


            var settings = {
                "url": `${PORT}/Modle/GenerateToken`,
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                    "username": $('#frmUsername').val(),
                    "password": $('#frmPassword').val()
                }),
            };

            $.ajax(settings).done(function (response) {
                $('#tokenDiv').html('');
                const { token } = response;
                if (token == null) {
                    $('#tokenDiv').html('Please check creds');
                    return;
                }

                $('#tokenDiv').html(token);
                GetCoursesDDL2(token);
            });

        }
    });


});

function DISPLAYROW(e) {

    let row = JSON.parse(e.getAttribute('data-item'));

    let Course = e.getAttribute('data-item');
    let ModleToken = $('#tokenDiv').html();
    let BearerToken = $('#frmBearerToken2').val();
    let CourseSubscriptionId = $('#frmCourseSubscription2').val();
    let XMLFile = document.getElementById(`xml_${row.idnumber}`).files[0];

    var form = new FormData();
    form.append("BearerToken", BearerToken);
    form.append("CourseSubscriptionId", CourseSubscriptionId);
    form.append("ModleToken", ModleToken);
    form.append("Course", Course);
    form.append("XMLFile", XMLFile);

    var settings = {
        "url": `${PORT}/Modle/ImportAllFromModle`,
        "method": "POST",
        "timeout": 0,
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}