/**
 * Search Functionality
 * Indexes content from content.json and provides real-time search results.
 */

document.addEventListener('DOMContentLoaded', () => {
    initSearch();
});

let searchIndex = [];

async function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    if (!searchInput || !searchResults) return;

    // Load data for indexing
    try {
        const response = await fetch('assets/data/content.json');
        const data = await response.json();
        buildSearchIndex(data);
    } catch (error) {
        console.error('Error initializing search:', error);
    }

    // Event Listeners
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        handleSearch(query, searchResults);
    });

    // Close results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });

    // Show results again if input gets focus and has value
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim().length > 0) {
            searchResults.style.display = 'block';
        }
    });
}

function buildSearchIndex(data) {
    searchIndex = [];

    // Index Articles
    if (data.mediumArticles) {
        data.mediumArticles.forEach(article => {
            searchIndex.push({
                type: 'Article',
                title: article.title,
                description: article.excerpt,
                url: article.url,
                tags: article.tags ? article.tags.join(' ') : '',
                icon: '📝'
            });
        });
    }

    // Index Publications
    if (data.publications) {
        data.publications.forEach(pub => {
            searchIndex.push({
                type: 'Publication',
                title: pub.title,
                description: pub.venue,
                url: pub.url,
                tags: pub.type,
                icon: '📚'
            });
        });
    }

    // Index Media
    if (data.media) {
        data.media.forEach(item => {
            searchIndex.push({
                type: 'Media',
                title: item.title,
                description: item.outlet,
                url: item.url,
                tags: '',
                icon: '📰'
            });
        });
    }
}

function handleSearch(query, resultsContainer) {
    if (query.length === 0) {
        resultsContainer.style.display = 'none';
        resultsContainer.innerHTML = '';
        return;
    }

    const results = searchIndex.filter(item => {
        return (
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            item.tags.toLowerCase().includes(query)
        );
    });

    displayResults(results, resultsContainer);
}

function displayResults(results, container) {
    container.innerHTML = '';

    if (results.length === 0) {
        container.innerHTML = `
            <div class="search-result-empty">
                No results found
            </div>
        `;
    } else {
        results.forEach(result => {
            const div = document.createElement('div');
            div.className = 'search-result-item';
            div.onclick = () => window.open(result.url, '_blank');
            div.innerHTML = `
                <div class="search-result-icon">${result.icon}</div>
                <div class="search-result-content">
                    <div class="search-result-title">${result.title}</div>
                    <div class="search-result-meta">${result.type} • ${result.description}</div>
                </div>
            `;
            container.appendChild(div);
        });
    }

    container.style.display = 'block';
}
