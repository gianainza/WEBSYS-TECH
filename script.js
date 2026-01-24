
        // Floating hearts background
        const heartsBg = document.getElementById('heartsBg');
        const hearts = ['💕', '💖', '💗', '💘', '💝', '🎀', '✨', '🌸', '🦋', '🌺'];
        
        function createHeart() {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
            heart.style.animationDelay = Math.random() * 5 + 's';
            heartsBg.appendChild(heart);
            
            setTimeout(() => heart.remove(), 20000);
        }
        
        setInterval(createHeart, 800);
        for (let i = 0; i < 15; i++) {
            createHeart();
        }

        // Cursor trail hearts
        let lastTrail = 0;
        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            if (now - lastTrail > 100) {
                const heart = document.createElement('div');
                heart.className = 'cursor-heart';
                heart.textContent = ['♡', '💕', '✨'][Math.floor(Math.random() * 3)];
                heart.style.left = e.clientX + 'px';
                heart.style.top = e.clientY + 'px';
                document.body.appendChild(heart);
                
                setTimeout(() => heart.remove(), 1500);
                lastTrail = now;
            }
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Typing animation
        const heroTitle = document.querySelector('.hero h1');
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        let charIndex = 0;

        function typeWriter() {
            if (charIndex < originalText.length) {
                heroTitle.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            }
        }

        window.addEventListener('load', () => {
            setTimeout(typeWriter, 500);
        });

        // Animated stats counter
        const animateValue = (element, start, end, duration) => {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                element.textContent = Math.floor(progress * (end - start) + start);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        };

        const observeStats = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = document.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-target'));
                        animateValue(stat, 0, target, 2000);
                    });
                    observeStats.disconnect();
                }
            });
        }, { threshold: 0.5 });

        const statsContainer = document.querySelector('.stats-container');
        if (statsContainer) {
            observeStats.observe(statsContainer);
        }

        // Fade-in animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.project-card, .skill-category, .timeline-item, .stat-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Active navigation
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-links a');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollY >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.style.color = '#9d6b83';
                if (link.getAttribute('href').slice(1) === current) {
                    link.style.color = '#ff69b4';
                }
            });

            // Scroll to top button
            const scrollTop = document.getElementById('scrollTop');
            if (window.scrollY > 300) {
                scrollTop.classList.add('visible');
            } else {
                scrollTop.classList.remove('visible');
            }
        });

        // Scroll to top functionality
        document.getElementById('scrollTop').addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Easter egg - click logo for confetti
        let clickCount = 0;
        document.querySelector('.logo').addEventListener('click', () => {
            clickCount++;
            if (clickCount === 5) {
                // Create confetti effect
                for (let i = 0; i < 50; i++) {
                    const confetti = document.createElement('div');
                    confetti.textContent = ['💕', '✨', '🎀', '💖', '🌸'][Math.floor(Math.random() * 5)];
                    confetti.style.cssText = `
                        position: fixed;
                        left: ${Math.random() * 100}%;
                        top: -20px;
                        font-size: ${Math.random() * 20 + 20}px;
                        animation: confettiFall ${Math.random() * 3 + 2}s ease-in forwards;
                        z-index: 9999;
                        pointer-events: none;
                    `;
                    document.body.appendChild(confetti);
                    setTimeout(() => confetti.remove(), 5000);
                }
                clickCount = 0;
            }
        });

        // Confetti animation
        const confettiStyle = document.createElement('style');
        confettiStyle.textContent = `
            @keyframes confettiFall {
                to {
                    top: 100%;
                    transform: rotate(720deg);
                }
            }
        `;
        document.head.appendChild(confettiStyle);

        // Auto year update
        const footer = document.querySelector('footer p');
        const currentYear = new Date().getFullYear();
        footer.textContent = footer.textContent.replace('2026', currentYear);
    