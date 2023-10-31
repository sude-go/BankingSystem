function openTransferDialog() {
    document.getElementById("transfer-dialog").open = true;
}


function closeTransferDialog() {
    document.getElementById("transfer-dialog").close = false;
}

function openDepositDialog() {
    document.getElementById("deposit-dialog").open = true;
}

function closeDepositDialog() {
    document.getElementById("deposit-dialog").close = false;
}

document.addEventListener('DOMContentLoaded', function () {
    var mobileMenu = document.getElementById('mobile-menu');
    var navigation = document.querySelector('.navigation');

    mobileMenu.addEventListener('click', function () {
        navigation.classList.toggle('active');
    });

    //close menu when click on link
    var navigationLinks = document.querySelectorAll('.navigation a');
    navigationLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            navigation.classList.remove('active');
        });
    });
});

document.addEventListener('scroll', function() {
    var header = document.querySelector('header');
    var links = document.querySelectorAll('.navigation a');

    if (window.scrollY > 600) {
        header.classList.add('scrolled');
        links.forEach(function(link) {
            link.classList.add('scrolled');
        });
    } else {
        header.classList.remove('scrolled');
        links.forEach(function(link) {
            link.classList.remove('scrolled');
        });
    }
});




