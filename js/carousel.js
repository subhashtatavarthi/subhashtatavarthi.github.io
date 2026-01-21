// Carousel functionality for articles section
class Carousel {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.track = this.container;
        this.slides = [];
        this.currentIndex = 0;
        this.autoplayInterval = null;

        // Options
        this.options = {
            autoplay: options.autoplay !== false,
            autoplayDelay: options.autoplayDelay || 5000,
            loop: options.loop !== false,
            swipe: options.swipe !== false,
            prevBtn: options.prevBtn,
            nextBtn: options.nextBtn,
            indicators: options.indicators
        };

        this.init();
    }

    init() {
        if (!this.track) return;

        // Wait for slides to be added
        setTimeout(() => {
            this.slides = Array.from(this.track.children);
            if (this.slides.length === 0) return;

            this.setupControls();
            this.setupIndicators();
            this.setupSwipe();

            if (this.options.autoplay) {
                this.startAutoplay();
            }

            this.updateCarousel();
        }, 100);
    }

    setupControls() {
        if (this.options.prevBtn && this.options.nextBtn) {
            this.prevBtn = document.getElementById(this.options.prevBtn);
            this.nextBtn = document.getElementById(this.options.nextBtn);

            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => this.prev());
            }
            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => this.next());
            }
        }
    }

    setupIndicators() {
        if (!this.options.indicators) return;

        const indicatorsContainer = document.getElementById(this.options.indicators);
        if (!indicatorsContainer) return;

        indicatorsContainer.innerHTML = '';

        this.slides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = 'carousel-indicator';
            indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);

            if (index === 0) {
                indicator.classList.add('active');
            }

            indicator.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetAutoplay();
            });

            indicatorsContainer.appendChild(indicator);
        });

        this.indicators = Array.from(indicatorsContainer.children);
    }

    setupSwipe() {
        if (!this.options.swipe || !this.track) return;

        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        let startTime = 0;

        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startTime = Date.now();
            isDragging = true;
            this.track.style.transition = 'none';
        });

        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
            const diff = currentX - startX;
            const offset = -this.currentIndex * 100 + (diff / this.track.offsetWidth) * 100;
            this.track.style.transform = `translateX(${offset}%)`;
        });

        this.track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;

            const diff = currentX - startX;
            const threshold = this.track.offsetWidth * 0.2;
            const timeDiff = Date.now() - startTime;

            this.track.style.transition = '';

            if (Math.abs(diff) > threshold || (Math.abs(diff) > 50 && timeDiff < 300)) {
                if (diff > 0) {
                    this.prev();
                } else {
                    this.next();
                }
            } else {
                this.updateCarousel();
            }

            this.resetAutoplay();
        });

        // Mouse drag for desktop
        this.track.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            startTime = Date.now();
            isDragging = true;
            this.track.style.cursor = 'grabbing';
            this.track.style.transition = 'none';
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            currentX = e.clientX;
            const diff = currentX - startX;
            const offset = -this.currentIndex * 100 + (diff / this.track.offsetWidth) * 100;
            this.track.style.transform = `translateX(${offset}%)`;
        });

        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;

            const diff = currentX - startX;
            const threshold = this.track.offsetWidth * 0.2;
            const timeDiff = Date.now() - startTime;

            this.track.style.cursor = '';
            this.track.style.transition = '';

            if (Math.abs(diff) > threshold || (Math.abs(diff) > 50 && timeDiff < 300)) {
                if (diff > 0) {
                    this.prev();
                } else {
                    this.next();
                }
            } else {
                this.updateCarousel();
            }

            this.resetAutoplay();
        });
    }

    next() {
        if (this.currentIndex < this.slides.length - 1) {
            this.currentIndex++;
        } else if (this.options.loop) {
            this.currentIndex = 0;
        }
        this.updateCarousel();
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else if (this.options.loop) {
            this.currentIndex = this.slides.length - 1;
        }
        this.updateCarousel();
    }

    goToSlide(index) {
        if (index >= 0 && index < this.slides.length) {
            this.currentIndex = index;
            this.updateCarousel();
        }
    }

    updateCarousel() {
        const offset = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${offset}%)`;

        // Update indicators
        if (this.indicators) {
            this.indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === this.currentIndex);
            });
        }

        // Update button states
        if (this.prevBtn && this.nextBtn && !this.options.loop) {
            this.prevBtn.disabled = this.currentIndex === 0;
            this.nextBtn.disabled = this.currentIndex === this.slides.length - 1;
        }
    }

    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.next();
        }, this.options.autoplayDelay);
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }

    resetAutoplay() {
        if (this.options.autoplay) {
            this.stopAutoplay();
            this.startAutoplay();
        }
    }

    destroy() {
        this.stopAutoplay();
    }
}

// Export for use in content.js
window.Carousel = Carousel;
