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

const tabs = document.querySelector(".tabs");
const btns = document.querySelectorAll(".button");
const articles = document.querySelectorAll(".content");
tabs.addEventListener("click", function (e) {
    const id = e.target.dataset.id;
    if (id) {
        btns.forEach(function (btn) {
            btn.classList.remove("live");
        });
        e.target.classList.add("live");
        articles.forEach(function (article) {
            article.classList.remove("live");
        });
        const element = document.getElementById(id);
        element.classList.add("live");
    }
});

const icons = document.querySelector(".transactions_bar");
icons.addEventListener("click", function (e) {
    const id = e.target.dataset.id;
    if (id) {
        btns.forEach(function (btn) {
            btn.classList.remove("live");
        });
        const btn = document.querySelector(`.button[data-id="${id}"]`);
        btn.classList.add("live");
        articles.forEach(function (article) {
            article.classList.remove("live");
        });
        const element = document.getElementById(id);
        element.classList.add("live");
    }
});



