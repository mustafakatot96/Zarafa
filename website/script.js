/**
 * Zirafah Factory Company - Website Scripts
 * Role: Senior Creative Developer
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 0. Preloader Logic
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 800);
            }, 500); // Small delay for visual polish
        }
    });

    // 1. Navbar Scroll Effect & Progress Bar
    const header = document.getElementById('main-header');
    const progressBar = document.getElementById('scroll-progress');
    const scrollThreshold = 50;

    const handleScroll = () => {
        const scrollY = window.scrollY;
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollY / windowHeight) * 100;

        // Header effect
        if (scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Progress bar
        if (progressBar) {
            progressBar.style.height = `${scrollPercent}%`;
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // 1.1 Giraffe Neck Scroll Animation
    const giraffeNeck = document.getElementById('giraffe-neck');
    const giraffeNeckContainer = document.querySelector('.giraffe-neck-container');
    
    const animateGiraffeNeck = () => {
        const scrollY = window.scrollY;
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollY / windowHeight);
        
        if (giraffeNeckContainer) {
            // Gradually show neck from left as user scrolls
            // Starts at -150px, ends at -20px
            const leftPos = -150 + (scrollPercent * 130);
            giraffeNeckContainer.style.left = `${leftPos}px`;
        }
    };

    window.addEventListener('scroll', animateGiraffeNeck);
    animateGiraffeNeck();

    // 2. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const mainNav = document.getElementById('main-nav');
    const body = document.body;

    const toggleMenu = (show) => {
        if (show) {
            mainNav.classList.add('active');
            body.style.overflow = 'hidden';
        } else {
            mainNav.classList.remove('active');
            body.style.overflow = '';
        }
    };

    menuToggle.addEventListener('click', () => toggleMenu(true));
    if (menuClose) {
        menuClose.addEventListener('click', () => toggleMenu(false));
    }

    // Close menu when clicking a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // 2.1 Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinksList = document.querySelectorAll('.nav-links a');

    const highlightNav = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightNav);
    highlightNav();

    // 3. Scroll Reveal Animation (IntersectionObserver)
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                // Remove active class when element leaves viewport to allow re-animation
                entry.target.classList.remove('active');
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Parallax Effects (Refined)
    const heroBg = document.querySelector('.hero-parallax-bg');
    const heroJar = document.querySelector('.hero-jar-img');
    const aboutBg = document.querySelector('.about-parallax-bg');

    const updateParallax = () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Hero Parallax
        if (heroBg && scrollY < windowHeight) {
            heroBg.style.transform = `translateY(${scrollY * 0.4}px)`;
        }

        if (heroJar && scrollY < windowHeight) {
            // Slower movement for the jar to create depth
            heroJar.style.transform = `translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.02}deg)`;
        }

        // About Parallax
        if (aboutBg) {
            const aboutSection = document.getElementById('about');
            const rect = aboutSection.getBoundingClientRect();
            if (rect.top < windowHeight && rect.bottom > 0) {
                const relativeScroll = (windowHeight - rect.top) / (windowHeight + rect.height);
                const offset = (relativeScroll - 0.5) * 150; // Move +/- 75px
                aboutBg.style.transform = `translateY(${offset}px)`;
            }
        }
        
        requestAnimationFrame(updateParallax);
    };

    requestAnimationFrame(updateParallax);

    // 5. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 6. Form Submission (Demo)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('شكراً لتواصلكم معنا! سنقوم بالرد عليكم في أقرب وقت ممكن.');
            contactForm.reset();
        });
    }

    // 7. Dynamic Year in Footer
    const yearSpan = document.querySelector('.footer-bottom p');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.innerHTML = yearSpan.innerHTML.replace('2026', currentYear);
    }

    // 7.1 Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'dark') {
                theme = 'light';
            } else {
                theme = 'dark';
            }
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        });
    }

    // 8. Product Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || filter === category) {
                    card.style.display = 'flex';
                    // Re-trigger reveal animation
                    setTimeout(() => card.classList.add('active'), 50);
                } else {
                    card.style.display = 'none';
                    card.classList.remove('active');
                }
            });
        });
    });

    // 11. Social Sharing Logic
    const shareBtns = document.querySelectorAll('.share-btn');
    shareBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.product-card');
            const title = card.querySelector('h3').textContent;
            const url = window.location.href;
            const text = `اكتشف ${title} من مصنع الزرافة: ${url}`;

            let shareUrl = '';
            if (btn.classList.contains('fb')) {
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            } else if (btn.classList.contains('tw')) {
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
            } else if (btn.classList.contains('wa')) {
                shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
            }

            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });

    // 12. Tahini Scroll Sequence Hero Logic
    const initTahiniScrollHero = () => {
        const canvas = document.getElementById('tahini-canvas');
        if (!canvas) return;
        
        const context = canvas.getContext('2d');
        const loader = document.getElementById('hero-loader');
        const loaderBar = document.getElementById('hero-loader-bar');
        const loaderPercent = document.getElementById('hero-loader-percent');
        const skipBtn = document.getElementById('hero-skip-btn');
        const overlay = document.querySelector('#tahini-scroll-hero .hero-overlay');
        
        const images = [];
        const imageLinks = [
            "https://i.postimg.cc/Y0RDbrhT/ezgif-frame-001.png",
            "https://i.postimg.cc/J472tkFX/ezgif-frame-002.png",
            "https://i.postimg.cc/cLrkBN01/ezgif-frame-003.png",
            "https://i.postimg.cc/mr9dKNPX/ezgif-frame-004.png",
            "https://i.postimg.cc/SRkt62N1/ezgif-frame-006.png",
            "https://i.postimg.cc/7PnRxVKk/ezgif-frame-007.png",
            "https://i.postimg.cc/t4YvNHym/ezgif-frame-008.png",
            "https://i.postimg.cc/qvSbmZvK/ezgif-frame-009.png",
            "https://i.postimg.cc/nztdxj7t/ezgif-frame-010.png",
            "https://i.postimg.cc/3N1fn8ky/ezgif-frame-012.png",
            "https://i.postimg.cc/yYfrRNqL/ezgif-frame-013.png",
            "https://i.postimg.cc/cL29D5Ls/ezgif-frame-014.png",
            "https://i.postimg.cc/HLMSF4J1/ezgif-frame-015.png",
            "https://i.postimg.cc/C57rmhRM/ezgif-frame-017.png",
            "https://i.postimg.cc/7YBQzLvJ/ezgif-frame-018.png",
            "https://i.postimg.cc/Mpv3m8qw/ezgif-frame-019.png",
            "https://i.postimg.cc/GpDM6J4K/ezgif-frame-020.png",
            "https://i.postimg.cc/HndPwcs2/ezgif-frame-022.png",
            "https://i.postimg.cc/zDFQJjxY/ezgif-frame-023.png",
            "https://i.postimg.cc/htfZ1qgC/ezgif-frame-024.png",
            "https://i.postimg.cc/rw3nhYwr/ezgif-frame-025.png",
            "https://i.postimg.cc/7hHmCFm9/ezgif-frame-027.png",
            "https://i.postimg.cc/rsjZQVDR/ezgif-frame-028.png",
            "https://i.postimg.cc/GhMSDp0F/ezgif-frame-029.png",
            "https://i.postimg.cc/2SMcHXSr/ezgif-frame-030.png",
            "https://i.postimg.cc/wvcwjqcy/ezgif-frame-032.png",
            "https://i.postimg.cc/prR1fhLt/ezgif-frame-033.png",
            "https://i.postimg.cc/vH8NDVKx/ezgif-frame-034.png",
            "https://i.postimg.cc/GmHgx1db/ezgif-frame-035.png",
            "https://i.postimg.cc/mDGd4zM2/ezgif-frame-037.png",
            "https://i.postimg.cc/j2tkHwd7/ezgif-frame-038.png",
            "https://i.postimg.cc/05048fVg/ezgif-frame-039.png",
            "https://i.postimg.cc/K8RpDyFH/ezgif-frame-040.png",
            "https://i.postimg.cc/JnWT8DXf/ezgif-frame-042.png",
            "https://i.postimg.cc/NFspy3p1/ezgif-frame-043.png",
            "https://i.postimg.cc/c1BzsmXX/ezgif-frame-044.png",
            "https://i.postimg.cc/VL7HtNyG/ezgif-frame-045.png",
            "https://i.postimg.cc/JhXTScsf/ezgif-frame-047.png",
            "https://i.postimg.cc/9MtLQmtw/ezgif-frame-048.png",
            "https://i.postimg.cc/SRd1DSnK/ezgif-frame-049.png",
            "https://i.postimg.cc/rFyPzrHD/ezgif-frame-050.png",
            "https://i.postimg.cc/ZqNfXFWP/ezgif-frame-052.png",
            "https://i.postimg.cc/gJPMpXRc/ezgif-frame-053.png",
            "https://i.postimg.cc/9MGnwtVp/ezgif-frame-054.png",
            "https://i.postimg.cc/PrfRNw7k/ezgif-frame-055.png",
            "https://i.postimg.cc/x1hxsF1N/ezgif-frame-057.png",
            "https://i.postimg.cc/76yB4GzR/ezgif-frame-058.png",
            "https://i.postimg.cc/C5hmZ3mG/ezgif-frame-059.png",
            "https://i.postimg.cc/7h9tmH5f/ezgif-frame-060.png",
            "https://i.postimg.cc/T3F7kH3x/ezgif-frame-062.png",
            "https://i.postimg.cc/0NSthdzL/ezgif-frame-063.png",
            "https://i.postimg.cc/Kzr08Gr4/ezgif-frame-064.png",
            "https://i.postimg.cc/L5DQN9JR/ezgif-frame-065.png",
            "https://i.postimg.cc/W1hYwPTP/ezgif-frame-067.png",
            "https://i.postimg.cc/mr9dKNPY/ezgif-frame-068.png",
            "https://i.postimg.cc/0QqtvMmk/ezgif-frame-069.png",
            "https://i.postimg.cc/VvmHqrLq/ezgif-frame-070.png",
            "https://i.postimg.cc/VL7HtNyp/ezgif-frame-072.png",
            "https://i.postimg.cc/zG6tdPG3/ezgif-frame-073.png",
            "https://i.postimg.cc/bJj6PDnF/ezgif-frame-074.png",
            "https://i.postimg.cc/G3xfcQqX/ezgif-frame-076.png",
            "https://i.postimg.cc/MKsrBGkm/ezgif-frame-077.png",
            "https://i.postimg.cc/RZysPbZB/ezgif-frame-078.png",
            "https://i.postimg.cc/N0XNZ7KZ/ezgif-frame-079.png",
            "https://i.postimg.cc/wMgbXyTS/ezgif-frame-081.png",
            "https://i.postimg.cc/15Rj4qd4/ezgif-frame-082.png",
            "https://i.postimg.cc/7Zftnyw8/ezgif-frame-083.png",
            "https://i.postimg.cc/Xv52tcrw/ezgif-frame-084.png",
            "https://i.postimg.cc/Xq4DfG7F/ezgif-frame-086.png",
            "https://i.postimg.cc/RCLYMRXk/ezgif-frame-087.png",
            "https://i.postimg.cc/8zjXmVDx/ezgif-frame-088.png",
            "https://i.postimg.cc/XYmH2DYq/ezgif-frame-089.png",
            "https://i.postimg.cc/cHNDWg3k/ezgif-frame-090.png",
            "https://i.postimg.cc/ZYxQTcVf/ezgif-frame-092.png",
            "https://i.postimg.cc/dtWSC0M4/ezgif-frame-093.png",
            "https://i.postimg.cc/Nj5CkwBL/ezgif-frame-094.png",
            "https://i.postimg.cc/YSFXTfvV/ezgif-frame-095.png",
            "https://i.postimg.cc/PJTFWprR/ezgif-frame-097.png",
            "https://i.postimg.cc/8Pk0s6Yk/ezgif-frame-098.png",
            "https://i.postimg.cc/Nj5CkwBh/ezgif-frame-099.png",
            "https://i.postimg.cc/K8wq9s8f/ezgif-frame-100.png",
            "https://i.postimg.cc/gjmBVXkh/ezgif-frame-102.png",
            "https://i.postimg.cc/FFV69ZDq/ezgif-frame-103.png",
            "https://i.postimg.cc/YChDzwk8/ezgif-frame-104.png",
            "https://i.postimg.cc/W1CW9f13/ezgif-frame-105.png",
            "https://i.postimg.cc/hjb2tDbL/ezgif-frame-107.png",
            "https://i.postimg.cc/mkjp8LPz/ezgif-frame-108.png",
            "https://i.postimg.cc/YqXyFScD/ezgif-frame-109.png",
            "https://i.postimg.cc/kgBYvdqG/ezgif-frame-110.png",
            "https://i.postimg.cc/j5QMSxQq/ezgif-frame-112.png",
            "https://i.postimg.cc/0jPHYM2G/ezgif-frame-113.png",
            "https://i.postimg.cc/7YPWb2Rx/ezgif-frame-114.png",
            "https://i.postimg.cc/nhCSGtZy/ezgif-frame-115.png",
            "https://i.postimg.cc/Qtr6D95h/ezgif-frame-117.png",
            "https://i.postimg.cc/gjzNwCNS/ezgif-frame-118.png",
            "https://i.postimg.cc/FsFB1L64/ezgif-frame-119.png",
            "https://i.postimg.cc/65H1ZQsF/ezgif-frame-120.png",
            "https://i.postimg.cc/pdj03Y9H/ezgif-frame-122.png",
            "https://i.postimg.cc/3RCtx8Cg/ezgif-frame-123.png",
            "https://i.postimg.cc/yxjpv1DC/ezgif-frame-124.png",
            "https://i.postimg.cc/8PynvC8v/ezgif-frame-125.png",
            "https://i.postimg.cc/q7KmWXN5/ezgif-frame-127.png",
            "https://i.postimg.cc/rmLhT0WR/ezgif-frame-128.png",
            "https://i.postimg.cc/kGqhQ6Xy/ezgif-frame-129.png",
            "https://i.postimg.cc/bNYBdt5G/ezgif-frame-130.png",
            "https://i.postimg.cc/Qdw46ndg/ezgif-frame-132.png",
            "https://i.postimg.cc/ydzfKg9B/ezgif-frame-133.png",
            "https://i.postimg.cc/BbSM8rMh/ezgif-frame-134.png",
            "https://i.postimg.cc/Y2zPp3bz/ezgif-frame-135.png",
            "https://i.postimg.cc/ht6yC3tD/ezgif-frame-137.png",
            "https://i.postimg.cc/bvn64HGj/ezgif-frame-138.png",
            "https://i.postimg.cc/j5QMSxQy/ezgif-frame-139.png",
            "https://i.postimg.cc/SRd1DSJT/ezgif-frame-140.png",
            "https://i.postimg.cc/6pybfNtp/ezgif-frame-142.png",
            "https://i.postimg.cc/CK8v9HR6/ezgif-frame-143.png",
            "https://i.postimg.cc/mDGd4zMc/ezgif-frame-144.png",
            "https://i.postimg.cc/x8nFvJTM/ezgif-frame-145.png",
            "https://i.postimg.cc/XYp1k03P/ezgif-frame-147.png",
            "https://i.postimg.cc/mgJXd6gN/ezgif-frame-148.png"
        ];
        const frameCount = imageLinks.length;

        let imagesLoaded = 0;
        let isSkipped = false;

        // Set canvas size
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (images[0]) renderFrame(0);
        };

        window.addEventListener('resize', setCanvasSize);
        setCanvasSize();

        // Optimized Preload with Batching
        const preloadImages = async () => {
            const batchSize = 3; // Even smaller batch size for stability
            
            // Show skip button after 4 seconds
            setTimeout(() => {
                if (imagesLoaded < frameCount && !isSkipped) {
                    skipBtn.classList.remove('hidden');
                }
            }, 4000);

            skipBtn.addEventListener('click', () => {
                isSkipped = true;
                finishLoading();
            });

            // Load first frame immediately
            const loadFirstFrame = () => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.onload = () => {
                        images[0] = img;
                        renderFrame(0);
                        imagesLoaded++;
                        updateProgress();
                        resolve();
                    };
                    img.src = imageLinks[0];
                });
            };

            await loadFirstFrame();

            // Load the rest in batches
            for (let i = 1; i < frameCount; i += batchSize) {
                if (isSkipped) break;
                const batch = [];
                for (let j = i; j < i + batchSize && j < frameCount; j++) {
                    batch.push(loadSingleImage(j));
                }
                await Promise.all(batch);
                // Small delay between batches to let the browser breathe
                await new Promise(r => setTimeout(r, 50));
            }
        };

        const loadSingleImage = (index) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    images[index] = img;
                    imagesLoaded++;
                    updateProgress();
                    resolve();
                };
                img.onerror = () => {
                    imagesLoaded++;
                    updateProgress();
                    resolve();
                };
                img.src = imageLinks[index];
            });
        };

        const updateProgress = () => {
            const percent = Math.floor((imagesLoaded / frameCount) * 100);
            if (loaderBar) loaderBar.style.width = `${percent}%`;
            if (loaderPercent) loaderPercent.textContent = `${percent}%`;

            if (imagesLoaded === frameCount && !isSkipped) {
                finishLoading();
            }
        };

        const finishLoading = () => {
            loader.classList.add('hidden');
            overlay.classList.add('visible');
            // The listener is already active, we just hide the loader
        };

        const renderFrame = (index) => {
            // Find the nearest loaded frame if the requested one isn't ready
            let targetImg = images[index];
            
            if (!targetImg || targetImg.naturalWidth === 0) {
                // Search backwards for the nearest loaded frame
                for (let i = index - 1; i >= 0; i--) {
                    if (images[i] && images[i].naturalWidth > 0) {
                        targetImg = images[i];
                        break;
                    }
                }
            }

            // If still no image, fallback to the first frame
            if (!targetImg || targetImg.naturalWidth === 0) {
                targetImg = images[0];
            }

            // Final safety check
            if (!targetImg || targetImg.naturalWidth === 0) {
                return;
            }
            
            const canvasAspect = canvas.width / canvas.height;
            const imgWidth = targetImg.naturalWidth || targetImg.width;
            const imgHeight = targetImg.naturalHeight || targetImg.height;
            const imgAspect = imgWidth / imgHeight;
            
            let drawWidth, drawHeight, drawX, drawY;
            
            if (canvasAspect > imgAspect) {
                drawWidth = canvas.width;
                drawHeight = canvas.width / imgAspect;
                drawX = 0;
                drawY = (canvas.height - drawHeight) / 2;
            } else {
                drawWidth = canvas.height * imgAspect;
                drawHeight = canvas.height;
                drawX = (canvas.width - drawWidth) / 2;
                drawY = 0;
            }
            
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(targetImg, drawX, drawY, drawWidth, drawHeight);
        };

        const initScrollAnimation = () => {
            const section = document.getElementById('tahini-scroll-hero');
            let isRendering = false;
            
            const handleScrollAnimation = () => {
                if (isRendering) return;
                
                const rect = section.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                if (rect.top <= 10 && rect.bottom >= -10) {
                    isRendering = true;
                    
                    const relativeScroll = Math.max(0, -rect.top);
                    const scrollableDistance = rect.height - windowHeight;
                    const scrollPercent = Math.max(0, Math.min(1, relativeScroll / scrollableDistance));
                    
                    const frameIndex = Math.min(
                        frameCount - 1,
                        Math.floor(scrollPercent * (frameCount - 1))
                    );
                    
                    requestAnimationFrame(() => {
                        renderFrame(frameIndex);
                        isRendering = false;
                    });
                }
            };

            window.addEventListener('scroll', handleScrollAnimation, { passive: true });
            // Initial render attempt
            renderFrame(0);
        };

        // Initialize animation listener immediately so it works during loading
        initScrollAnimation();
        preloadImages();
    };

    initTahiniScrollHero();
});
