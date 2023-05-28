$(document).ready(function () {

    $.validator.addMethod(
        "standartEuFormat",
        function (value, element) {
            return /^(?<!\s)[a-zA-Z0-9_@.-]*?(?!\s)$/.test(value);
        },
        "Неправильный формат"
    );
    $.validator.addMethod(
        "standartFormat",
        function (value, element) {
            return /^(?<!\s)[a-zA-Zа-яА-Я0-9_@.-]*?(?!\s)$/.test(value);
        },
        "Неправильный формат"
    );
    $.validator.addMethod(
        "spaceFormat",
        function (value, element) {
            return /^(?<!\s)[a-zA-Zа-яА-Я0-9_@.-]3.*?(?!\s)$/.test(value);
            // ^(?<!\s)[a-zA-Zа-яА-Я0-9_@.-](.*[a-zA-Zа-яА-Я0-9_@.-])*?(?!\s)
        },
        "Неправильный формат"
    );
    $.validator.addMethod(
        "emailFormat",
        function (value, element) {
            return /^(?!.*@.*@.*$)(?!.*@.*--.*\..*$)(?!.*@.*-\..*$)(?!.*@.*-$)((.*)?@.+(\..{1,11})?)$/.test(value);
        },
        "Неправильный формат"
    );
    $.validator.addMethod(
        "inn",
        function (value, element) {
            return /^[\d+]{10,12}$/.test(value);
        },
        "Только цифры. 10 или 12 значный"
    );
    $.validator.addMethod(
        "site",
        function (value, element) {
            return /(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/.test(value);
        },
        "Формат mysite.ru"
    );

    // auth form{
    $("#authForm").validate({
        rules: {
            login: {
                required: true,
            },
            password: {
                required: true,
            }
        },
        errorPlacement: function (error, element) {
            if (element.attr("name") === "login" || element.attr("name") === "password") {
                element.parent().parent().children().children()[0].classList.add("form__item--invalid");
            }
            return true;
        },
        errorClass: "input--red",


    });
    validationCheckAuth($('input[name="login"]'), $('input[name="password"]'));
    // }

    // register form{
    $("#registerForm").validate({
        rules: {
            lastName: {
                required: true,
                minlength: 4,
            },
            inn: {
                required: true,
                minlength: 4,
            },
            firstName: {
                required: true,
                minlength: 4,
            },
            registerLogin: {
                required: true,
                minlength: 4,
            },
            fatherName: {
                minlength: 4,
            },
            nameOrganization: {
                minlength: 4,
            },
            site: {
                minlength: 4,
            },
            country: {
                minlength: 4,
            },
            city: {
                minlength: 4,
            },
            jobTitle: {
                minlength: 4,
            },
            email: {
                required: true,
                minlength: 4,
            }
        },
        messages: {
            lastName: {
                required: "Это поле обязательное",
                minlength: jQuery.validator.format("Минимальное количество символов {0}"),
            },
            registerLogin: {
                required: "Это поле обязательное",
                minlength: jQuery.validator.format("Минимальное количество символов {0}"),
            },
            inn: {
                required: "Поле ИНН обязательное",
                minlength: jQuery.validator.format("Минимальное количество символов {0}"),
            },
            firstName: {
                required: "Это поле обязательное",
                minlength: jQuery.validator.format("Минимальное количество символов {0}"),
            },
            fatherName: {
                minlength: jQuery.validator.format("Минимальное количество символов {0}"),
            },
            site: {
                minlength: jQuery.validator.format("Минимальное количество символов {0}"),
            },
            country: {
                minlength: jQuery.validator.format("Минимальное количество символов {0}"),
            },
            city: {
                minlength: jQuery.validator.format("Минимальное количество символов {0}"),
            },
            nameOrganization: {
                minlength: jQuery.validator.format("Минимальное количество символов {0}"),
            },
            jobTitle: {
                minlength: jQuery.validator.format("Минимальное количество символов {0}"),
            },
            email: {
                emailFormat: "Формат - my@mail.ru",
                required: "Это поле обязательное",
                minlength: jQuery.validator.format("Минимальное количество символов {0}"),
            }

        },
        errorPlacement: function (error, element) {
            if (element.attr('name') !== "inn" && element.attr('name') !== "site" && element.attr('name') !== "country" && element.attr('name') !== "city") {
                element.parent().addClass("form__item--invalid");

                if (element.parent().siblings().children("span")[0].innerText !== error[0].innerText) {
                    element.parent().siblings().children("span")[0].innerText = error[0].innerText;
                    element.parent().siblings().children("span")[0].classList.remove("form__span");
                    element.parent().siblings().children("span")[0].offsetWidth;
                    element.parent().siblings().children("span")[0].classList.add("form__span");
                }
            } else {
                element.parent().parent().addClass("form__item--invalid");

                if (element.parent().parent().siblings().children("span")[0].innerText !== error[0].innerText) {
                    element.parent().parent().siblings().children("span")[0].innerText = error[0].innerText;
                    element.parent().parent().siblings().children("span")[0].classList.remove("form__span");
                    element.parent().parent().siblings().children("span")[0].offsetWidth;
                    element.parent().parent().siblings().children("span")[0].classList.add("form__span");
                }
            }


            return true;
        },
        errorClass: "input--red",
    });
    validationObligatoryCheck($('input[name="lastName"]'));
    validationObligatoryCheck($('input[name="firstName"]'));
    validationObligatoryCheck($('input[name="email"]'));
    validationCheck($('input[name="fatherName"]'));
    validationCheck($('input[name="nameOrganization"]'));
    validationCheck($('input[name="jobTitle"]'));
    validationDoubleElementsObligatoryCheck($('input[name="inn"]'));
    validationDoubleElementsCheck($('input[name="site"]'));
    validationDoubleElementsCheck($('input[name="country"]'));
    validationDoubleElementsCheck($('input[name="city"]'));
    // }

    // register continue form{
    $("#registerContinueForm").validate({
        rules: {
            registerLogin: {
                required: true,
                minlength: 4,
            },
            registerPassword: {
                required: true,
                minlength: 8,
            },
            confirmPassword: {
                required: true,
                minlength: 4,
                equalTo: 'input[name="registerPassword"]',
            },

        },
        messages: {
            registerLogin: {
                required: "Это поле обязательное",
                minlength: jQuery.validator.format("Минимальное количество символов {0}"),
            },
            registerPassword: {
                required: "Это поле обязательное",
                minlength: jQuery.validator.format("Минимальное количество символов {0}"),
                standartEu: "Разрешено 0-9, A-Z, символы _ @ . -",
            },
            confirmPassword: {
                required: "Это поле обязательное",
                minlength: jQuery.validator.format("Минимальное количество символов {0}"),
                equalTo: "Пароли не совпадают",
            },
        },
        errorPlacement: function (error, element) {
            element.parent().addClass("form__item--invalid");

            if (element.parent().siblings().children("span")[0].innerText !== error[0].innerText) {
                element.parent().siblings().children("span")[0].innerText = error[0].innerText;
                element.parent().siblings().children("span")[0].classList.remove("form__span");
                element.parent().siblings().children("span")[0].offsetWidth;
                element.parent().siblings().children("span")[0].classList.add("form__span");
            }

            return true;
        },
        errorClass: "input--red",
    })

    validationObligatoryCheck($('input[name="registerLogin"]'));
    validationObligatoryCheck($('input[name="confirmPassword"]'));
    validationObligatoryCheck($('input[name="registerPassword"]'));
    lineAnimation($('input[name="registerPassword"]'));

    // }


    //  Hiding and showing forms
    let registerForm = document.querySelector("#registerForm");
    let registerContinueForm = document.querySelector("#registerContinueForm");
    let registerBtn = document.querySelector("#registerBtn");
    let registerBackBtn = document.querySelector("#registerBackBtn");
    let registerContinueBtn = document.querySelector('#registerContinueBtn');
    let registerContinueBackBtn = document.querySelector('#registerContinueBackBtn');

    registerBtn.addEventListener("click", () => {
        registerForm.classList.toggle("register--active");
        authForm.classList.toggle("auth--hidden");
    });

    registerBackBtn.addEventListener("click", () => {
        registerForm.classList.toggle("register--active");
        authForm.classList.toggle("auth--hidden");
    });

    registerContinueBtn.addEventListener("click", () => {
        if ($("#registerForm").valid()) {
            registerForm.classList.toggle("register--active");
            registerContinueForm.classList.toggle("register-continue--active")
        }
    });

    registerContinueBackBtn.addEventListener("click", () => {
        registerForm.classList.toggle("register--active");
        registerContinueForm.classList.toggle("register-continue--active")
    });

    function validationObligatoryCheck(object) {
        object.on('keyup', function () {
            if (object.val().length >= 1) {
                if (object.valid()) {
                    object.parent().removeClass('form__item--invalid');
                }
            }
        });
    }

    function lineAnimation(object) {
        object.on('keyup', function () {
            if (object.val().length >= 8) {
                if (object.valid()) {
                    object.parent().siblings(".load-line").children('div').removeClass('load-line--low');
                    object.parent().siblings(".load-line").children('div').removeClass('load-line--strong');
                    object.parent().siblings(".load-line").children('div').addClass('load-line--medium');
                }
            }
            if (object.val().length < 8) {
                object.parent().siblings(".load-line").children('div').removeClass('load-line--medium');
                object.parent().siblings(".load-line").children('div').removeClass('load-line--strong');
                object.parent().siblings(".load-line").children('div').addClass('load-line--low');
            }
            if (object.val().length >= 16) {
                if (object.valid()) {
                    object.parent().siblings(".load-line").children('div').addClass('load-line--strong');
                }
            }
        });
    }

    function validationCheck(object) {
        object.on('keyup', function () {
            if (object.valid()) {
                object.parent().removeClass('form__item--invalid');
            }
        });
    }

    function validationDoubleElementsObligatoryCheck(object) {
        object.on('keyup', function () {
            if (object.val().length >= 1) {
                if (object.valid()) {
                    object.parent().parent().removeClass('form__item--invalid');
                }
            }
        });
    }

    function validationDoubleElementsCheck(object) {
        object.on('keyup', function () {
            if (object.valid()) {
                object.parent().parent().removeClass('form__item--invalid');
            }
        });
    }

    function validationCheckAuth(objectLogin, objectPassword) {
        objectLogin.on('keypress', function () {
            if (objectLogin.val().length >= 1 && objectPassword.val().length >= 1) {
                if (objectLogin.valid() && objectPassword.valid()) {
                    objectLogin.parent().parent().children().children().removeClass("form__item--invalid");
                }
            }
            if (objectLogin.hasClass("form__item--invalid")) {
                objectPassword.addClass("input--red");
            }
        });
        objectPassword.on('keypress', function () {
            if (objectLogin.val().length >= 1 && objectPassword.val().length >= 1) {
                if (objectLogin.valid() && objectPassword.valid()) {
                    objectLogin.parent().parent().children().children().removeClass("form__item--invalid");
                }
            }
        });
    }
});

function submitRegistrationForm() {
    let formPart1 = document.querySelector("#registerForm");
    let formPart2 = document.querySelector("#registerContinueForm");

    let formPart1Data = new FormData(formPart1);
    let formPart2Data = new FormData(formPart2);

    let data = {}

    for (const pair of formPart1Data.entries()) {
        data[pair[0]] = pair[1];
    }

    for (const pair of formPart2Data.entries()) {
        data[pair[0]] = pair[1];
    }

    $.post('/registration', data, function (response) {
        location.reload();
    });
}