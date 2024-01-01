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

    const links = document.querySelectorAll(".navigation a");

    document.addEventListener("click", function (event) {
        const clickedElement = event.target;

        if (!clickedElement.closest(".navigation")) {
            links.forEach(link => {
                link.classList.remove("active");
            });
        }
    });

    links.forEach(link => {
        link.addEventListener("click", function () {
            links.forEach(innerLink => {
                innerLink.classList.remove("active");
            });

            link.classList.add("active");
        });
    });

    showForm(event, 'transfer');
});


document.addEventListener('scroll', function () {
    var header = document.querySelector('header');
    var links = document.querySelectorAll('.navigation a');

    if (window.scrollY > 250) {
        header.classList.add('scrolled');
        links.forEach(function (link) {
            link.classList.add('scrolled');
        });
    } else {
        header.classList.remove('scrolled');
        links.forEach(function (link) {
            link.classList.remove('scrolled');
        });
    }
});

function showForm(evt, transactionType) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tab-links");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" selected", "");
    }

    document.getElementById(transactionType).style.display = "block";
    evt.currentTarget.className += " selected";
}
