document.addEventListener('DOMContentLoaded', () => {
    // Current Year for Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100; // Trigger point offset

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
                
                // Trigger counter animation if inside the revealed element
                if (element.classList.contains('active')) {
                    const counters = element.querySelectorAll('.counter');
                    runCounters(counters);
                }
            }
        });
    };

    // Run once on load
    revealOnScroll();

    // Run on scroll
    window.addEventListener('scroll', revealOnScroll);

    // Number Counter Animation
    let countersRun = false;
    
    function runCounters(counters) {
        if (countersRun || counters.length === 0) return;
        countersRun = true;
        
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const speed = 200; // lower is slower
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(6, 9, 14, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(6, 9, 14, 0.85)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
});
