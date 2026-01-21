// Content Management - Load and display articles, publications, media
document.addEventListener('DOMContentLoaded', () => {
    loadContent();
});

async function loadContent() {
    try {
        const response = await fetch('assets/data/content.json');
        const data = await response.json();

        renderSkills(data.profile.skills);
        renderArticles(data.mediumArticles);
        renderPublications(data.publications);
        renderMedia(data.media);
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

// ================================
// SKILLS RENDERING
// ================================
function renderSkills(skills) {
    const skillsGrid = document.getElementById('skillsGrid');
    if (!skillsGrid) return;

    skillsGrid.innerHTML = skills.map(skill => `
        <div class="skill-item scroll-reveal">
            <div class="skill-name">${skill}</div>
        </div>
    `).join('');

    // Re-initialize scroll reveal for new elements
    initScrollRevealForNew();
}

// ================================
// ARTICLES RENDERING (CAROUSEL)
// ================================
function renderArticles(articles) {
    const articlesCarousel = document.getElementById('articlesCarousel');
    if (!articlesCarousel) return;

    articlesCarousel.innerHTML = articles.map(article => `
        <div class="carousel-slide">
            <article class="content-card">
                <div class="card-header">
                    <h3 class="card-title">${article.title}</h3>
                    <div class="card-meta">
                        <span>📅 ${article.date}</span>
                    </div>
                </div>
                <div class="card-body">
                    <p>${article.excerpt}</p>
                </div>
                <div class="card-footer">
                    <div class="tag-list">
                        ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="card-link">
                        Read More →
                    </a>
                </div>
            </article>
        </div>
    `).join('');

    // Initialize carousel after content is rendered
    if (window.Carousel) {
        window.articlesCarousel = new Carousel('articlesCarousel', {
            autoplay: true,
            autoplayDelay: 6000,
            loop: true,
            swipe: true,
            prevBtn: 'articlesPrev',
            nextBtn: 'articlesNext',
            indicators: 'articlesIndicators'
        });
    }
}

// ================================
// PUBLICATIONS RENDERING
// ================================
function renderPublications(publications) {
    const publicationsGrid = document.getElementById('publicationsGrid');
    if (!publicationsGrid) return;

    publicationsGrid.innerHTML = publications.map(pub => `
        <article class="content-card scroll-reveal">
            <div class="card-header">
                <h3 class="card-title">${pub.title}</h3>
                <div class="card-meta">
                    <span>📚 ${pub.venue}</span>
                    <span>📅 ${formatDateShort(pub.date)}</span>
                </div>
            </div>
            <div class="card-body">
                <p style="color: var(--color-text-tertiary); font-size: 0.875rem;">
                    ${pub.type} Publication
                </p>
            </div>
            <div class="card-footer">
                <a href="${pub.url}" target="_blank" rel="noopener noreferrer" class="card-link">
                    View Publication →
                </a>
            </div>
        </article>
    `).join('');

    initScrollRevealForNew();
}

// ================================
// MEDIA RENDERING
// ================================
function renderMedia(mediaItems) {
    const mediaGrid = document.getElementById('mediaGrid');
    if (!mediaGrid) return;

    mediaGrid.innerHTML = mediaItems.map(item => `
        <article class="content-card scroll-reveal">
            <div class="card-header">
                <h3 class="card-title">${item.title}</h3>
                <div class="card-meta">
                    <span>📰 ${item.outlet}</span>
                    <span>📅 ${formatDateShort(item.date)}</span>
                </div>
            </div>
            <div class="card-footer" style="margin-top: 1rem;">
                <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="card-link">
                    Read Article →
                </a>
            </div>
        </article>
    `).join('');

    initScrollRevealForNew();
}

// ================================
// UTILITY FUNCTIONS
// ================================
function formatDateShort(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

function initScrollRevealForNew() {
    // Wait for next frame to ensure elements are in DOM
    requestAnimationFrame(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-reveal:not(.revealed)').forEach(el => {
            observer.observe(el);
        });
    });
}
