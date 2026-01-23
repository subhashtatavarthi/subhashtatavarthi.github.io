// Content Management - Load and display articles, publications, media
document.addEventListener('DOMContentLoaded', () => {
    loadContent();
});

async function loadContent() {
    try {
        const response = await fetch('assets/data/content.json');
        const data = await response.json();

        renderSkills(data.profile.skills);

        // Render Profile Avatar (if defined in content.json and not overridden by local storage)
        if (data.profile.avatar && !localStorage.getItem('profilePicture')) {
            const profileAvatar = document.getElementById('profileAvatar');
            if (profileAvatar) {
                profileAvatar.src = data.profile.avatar;
            }
        }
        renderJourney(data.journey);
        renderArticles(data.mediumArticles);
        renderPublications(data.publications); // Added missing call
        renderMedia(data.media); // Added missing call
        renderStats(data.socialStats);
        renderFollowers(data.followers);

    } catch (error) {
        console.error('Error loading content:', error);
    }
}

// ================================
// SKILLS RENDERING (BENTO GRID)
// ================================
function renderSkills(skillsData) {
    const skillsContainer = document.getElementById('skillsContainer');
    if (!skillsContainer || !Array.isArray(skillsData)) return;

    skillsContainer.innerHTML = `
        <div class="bento-grid">
            ${skillsData.map(category => `
                <div class="bento-card scroll-reveal">
                    <div class="bento-header">
                        <i class="${category.icon} bento-icon"></i>
                        <div class="bento-title-group">
                            <h3 class="bento-title">${category.category}</h3>
                            <p class="bento-desc">${category.description}</p>
                        </div>
                    </div>
                    <div class="bento-content">
                        ${category.items.map(item => `
                            <div class="skill-chip">
                                <i class="${item.icon}"></i>
                                <span>${item.name}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;

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
    const publicationsCarousel = document.getElementById('publicationsCarousel');
    if (!publicationsCarousel) return;

    publicationsCarousel.innerHTML = publications.map(pub => `
        <div class="carousel-slide">
            <article class="content-card">
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
        </div>
    `).join('');

    // Initialize carousel
    if (window.Carousel) {
        window.publicationsCarousel = new Carousel('publicationsCarousel', {
            autoplay: true,
            autoplayDelay: 7000,
            loop: true,
            swipe: true,
            prevBtn: 'publicationsPrev',
            nextBtn: 'publicationsNext',
            indicators: 'publicationsIndicators'
        });
    }
}

// ================================
// MEDIA RENDERING
// ================================
function renderMedia(mediaItems) {
    const mediaCarousel = document.getElementById('mediaCarousel');
    if (!mediaCarousel) return;

    mediaCarousel.innerHTML = mediaItems.map(item => `
        <div class="carousel-slide">
            <article class="content-card">
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
        </div>
    `).join('');

    // Initialize carousel
    if (window.Carousel) {
        window.mediaCarousel = new Carousel('mediaCarousel', {
            autoplay: true,
            autoplayDelay: 8000,
            loop: true,
            swipe: true,
            prevBtn: 'mediaPrev',
            nextBtn: 'mediaNext',
            indicators: 'mediaIndicators'
        });
    }
}

// ================================
// STATS RENDERING
// ================================
function renderStats(stats) {
    const statsGrid = document.getElementById('statsGrid');
    if (!statsGrid || !stats) return;

    statsGrid.innerHTML = stats.map(stat => `
        <a href="${stat.url}" target="_blank" class="stat-card scroll-reveal">
            <span class="stat-icon">${stat.icon}</span>
            <span class="stat-count">${stat.count}</span>
            <span class="stat-platform">${stat.platform}</span>
        </a>
    `).join('');

    initScrollRevealForNew();
}

// ================================
// FOLLOWERS RENDERING
// ================================
function renderFollowers(followersData) {
    const container = document.getElementById('followersWidget');
    if (!container || !followersData) return;

    const { count, list } = followersData;

    container.innerHTML = `
        <h3 class="followers-count" style="margin-top: 0;">Followers</h3>
        <span class="followers-label">Followers (${count})</span>
        <div class="follower-avatars">
            ${list.map(f => `<img src="${f.avatar}" alt="${f.name}" class="follower-avatar">`).join('')}
        </div>
        <button class="btn-follow" onclick="alert('Thanks for following!')">Follow</button>
    `;
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

// ================================
// JOURNEY / TIMELINE RENDERING
// ================================
// ================================
// JOURNEY / TIMELINE RENDERING
// ================================
function renderJourney(journeyItems) {
    if (!journeyItems || journeyItems.length === 0) return;

    const experienceContainer = document.getElementById('experienceTimeline');
    const educationContainer = document.getElementById('educationTimeline');

    // If we have separate containers (journey.html), render split
    if (experienceContainer && educationContainer) {
        const experienceItems = journeyItems.filter(item => item.type === 'experience');
        const educationItems = journeyItems.filter(item => item.type === 'education');

        renderTimelineItems(experienceContainer, experienceItems);
        renderTimelineItems(educationContainer, educationItems);
    }
    // Fallback if we have a single container (legacy or other usage)
    else {
        const journeyContainer = document.getElementById('journeyTimeline');
        if (journeyContainer) {
            renderTimelineItems(journeyContainer, journeyItems);
        }
    }
}

function renderTimelineItems(container, items) {
    container.innerHTML = items.map(item => `
        <div class="timeline-item scroll-reveal">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <div class="timeline-header">
                    <h3 class="timeline-role">${item.role}</h3>
                    <span class="timeline-period">${item.period}</span>
                </div>
                <div class="timeline-org">
                    <span>${item.type === 'education' ? '🎓' : '💼'}</span>
                    <span>${item.organization}</span>
                    <span style="color: var(--color-text-tertiary);">• ${item.location}</span>
                </div>
                <div class="timeline-desc">
                    ${item.description}
                </div>
            </div>
        </div>
    `).join('');

    initScrollRevealForNew();
}
