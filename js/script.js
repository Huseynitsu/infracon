$(document).ready(function () {
    // Initialize Swiper
    var mySwiper = new Swiper('.swiper', {
        loop: true,
        effect: "fade",
        slidesPerView: 1,
        delayBetweenSlides: 700,
        delay: 5000,
        spaceBetween: 30,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // Cache the header elements
    const header = $("header");
    const headerNotMain = $("header.not-main");

    // Store a flag to track whether the header is sticky
    let isHeaderSticky = false;

    $(window).scroll(function () {
        // Calculate the scroll position once
        const scrollTop = $(this).scrollTop();

        // Check if the scroll position is greater than 80
        const shouldBeSticky = scrollTop > 80;

        // Only update the classes if there's a change in the sticky state
        if (shouldBeSticky !== isHeaderSticky) {
            header.toggleClass("sticky", shouldBeSticky);
            headerNotMain.toggleClass("not-main", !shouldBeSticky);
            headerNotMain.toggleClass("fixed", shouldBeSticky);
            isHeaderSticky = shouldBeSticky;
        }
    });

    let $advantage_numbers = $('.adv-infos h4');
    let durations = [3000, 2800, 2600, 2000];
    let counters = [0, 0, 0, 0];
    let advantagesVisible = false;

    function startCounting() {
        $advantage_numbers.each(function (index, element) {
            let targetValue = parseInt($(element).text());

            let interval = setInterval(function () {
                if (counters[index] < targetValue) {
                    counters[index]++;
                    $(element).text(counters[index] + "+");
                } else {
                    clearInterval(interval);
                }
            }, durations[index] / (targetValue - counters[index]) || 1);
        });
    }

    $(window).on('scroll', function () {
        let advantagesOffset = $('.advantages-cards').offset().top;
        let windowHeight = $(window).height();
        let scrollTop = $(this).scrollTop();

        if (scrollTop + windowHeight > advantagesOffset && !advantagesVisible) {
            startCounting();
            advantagesVisible = true;
        }
    });
});
