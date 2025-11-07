// ===================================
// BLOG FUNCTIONALITY
// Search, filtering, and interactivity
// ===================================

// Blog data structure
const blogData = {
    articles: [
        // Infrastructure articles
        {
            id: 'building-homelab-foundation-proxmox',
            title: 'Building the Homelab Foundation: Proxmox VE Installation and Initial Configuration',
            excerpt: 'Complete guide to setting up Proxmox VE for virtualization, including network configuration, storage setup, and initial VM deployment.',
            category: 'infrastructure',
            date: '2025-10-22',
            tags: ['Proxmox', 'Virtualization', 'Homelab'],
            url: '../articles/infrastructure/building-homelab-foundation-proxmox.html'
        },
        {
            id: 'building-secure-lab-kali-pfsense',
            title: 'Building a Secure Lab: Kali Linux and pfSense Deployment',
            excerpt: 'Step-by-step guide to creating an isolated penetration testing environment with Kali Linux and pfSense firewall for security research.',
            category: 'infrastructure',
            date: '2025-10-22',
            tags: ['Kali Linux', 'pfSense', 'Security'],
            url: '../articles/infrastructure/building-secure-lab-kali-pfsense.html'
        },
        {
            id: 'growing-pains-extending-disk-ubuntu-vm',
            title: 'Growing Pains: Extending the Disk of My Ubuntu VM on Proxmox',
            excerpt: 'Learn how to extend disk space on Ubuntu VMs running in Proxmox, including both the VM configuration and Linux filesystem expansion.',
            category: 'infrastructure',
            date: '2025-10-20',
            tags: ['Proxmox', 'Ubuntu', 'Storage'],
            url: '../articles/infrastructure/growing-pains-extending-disk-ubuntu-vm.html'
        },
        {
            id: 'ai-kali-adventures-llm-testing-proxmox',
            title: 'My AI and Kali Adventures: LLM Testing and Proxmox Debugging',
            excerpt: 'Documenting my journey testing Large Language Models on local hardware while troubleshooting Proxmox virtualization issues.',
            category: 'infrastructure',
            date: '2025-10-18',
            tags: ['AI', 'LLM', 'Proxmox', 'Kali'],
            url: '../articles/infrastructure/ai-kali-adventures-llm-testing-proxmox.html'
        },
        {
            id: 'network-rescue-proxmox-pfsense-back-online',
            title: 'My Network Rescue: Getting Proxmox and pfSense Back Online',
            excerpt: 'Troubleshooting guide for recovering network infrastructure when Proxmox and pfSense lose connectivity, with step-by-step recovery procedures.',
            category: 'infrastructure',
            date: '2025-10-15',
            tags: ['Proxmox', 'pfSense', 'Troubleshooting'],
            url: '../articles/infrastructure/network-rescue-proxmox-pfsense-back-online.html'
        },
        
        // Network Security articles
        {
            id: 'securing-n8n-workflows-dns-tls',
            title: 'Securing My n8n Workflows: A Deep Dive into DNS and TLS',
            excerpt: 'Comprehensive guide to securing n8n automation workflows with proper DNS configuration and TLS certificates for encrypted communications.',
            category: 'network_security',
            date: '2025-10-25',
            tags: ['n8n', 'DNS', 'TLS', 'Security'],
            url: '../articles/network_security/securing-n8n-workflows-dns-tls.html'
        },
        {
            id: 'digital-guardian-reverse-proxy-https',
            title: 'The Digital Guardian of My Homelab: Setting Up a Secure Reverse Proxy with HTTPS',
            excerpt: 'Learn how to set up a secure reverse proxy with HTTPS termination to protect and manage access to your homelab services.',
            category: 'network_security',
            date: '2025-10-23',
            tags: ['Reverse Proxy', 'HTTPS', 'Security'],
            url: '../articles/network_security/digital-guardian-reverse-proxy-https.html'
        },
        {
            id: 'ssl-certificate-saga-local-dns-nginx',
            title: 'The SSL Certificate Saga: Local DNS, Nginx and My Homelab',
            excerpt: 'Complete walkthrough of setting up SSL certificates for local homelab services using local DNS and Nginx reverse proxy.',
            category: 'network_security',
            date: '2025-10-20',
            tags: ['SSL', 'DNS', 'Nginx', 'Homelab'],
            url: '../articles/network_security/ssl-certificate-saga-local-dns-nginx.html'
        },
        {
            id: 'troubleshooting-pfsense-web-interface',
            title: 'Troubleshooting pfSense Web Interface Access: A Troubleshooting Story',
            excerpt: 'Detailed troubleshooting guide for pfSense web interface access issues, including network configuration and firewall rule debugging.',
            category: 'network_security',
            date: '2025-10-18',
            tags: ['pfSense', 'Troubleshooting', 'Firewall'],
            url: '../articles/network_security/troubleshooting-pfsense-web-interface.html'
        },
        
        // Automation & AI articles
        {
            id: 'ai-powered-workflow-mcp-docker-n8n',
            title: 'My AI-Powered Workflow: Integration of MCP, Docker and N8N for Obsidian',
            excerpt: 'How I automated my documentation workflow using AI-powered tools, containerization, and workflow automation for enhanced productivity.',
            category: 'automation_ai',
            date: '2025-10-25',
            tags: ['MCP', 'N8N', 'AI', 'Docker'],
            url: '../articles/automation_ai/ai-powered-workflow-mcp-docker-n8n.html'
        },
        {
            id: 'mcp-configuration-guide-yaml-setup',
            title: 'MCP Configuration Guide: YAML Setup and Configuration',
            excerpt: 'Complete guide to configuring the Modular Copilot Platform using YAML files for AI-powered workflow automation.',
            category: 'automation_ai',
            date: '2025-10-23',
            tags: ['MCP', 'YAML', 'Configuration'],
            url: '../articles/automation_ai/mcp-configuration-guide-yaml-setup.html'
        },
        {
            id: 'deploying-mcp-server',
            title: 'My AI Companion: Deploying the Modular Copilot Platform (MCP) Server',
            excerpt: 'Step-by-step deployment guide for MCP server, including Docker setup, configuration, and integration with existing workflows.',
            category: 'automation_ai',
            date: '2025-10-20',
            tags: ['MCP', 'Docker', 'Deployment'],
            url: '../articles/automation_ai/deploying-mcp-server.html'
        },
        {
            id: 'obsidian-livesync-configuration',
            title: 'The Quest for Fluid Notes: My Obsidian LiveSync Configuration and Triumphs',
            excerpt: 'Complete guide to setting up Obsidian LiveSync for real-time note synchronization across multiple devices with conflict resolution.',
            category: 'automation_ai',
            date: '2025-10-18',
            tags: ['Obsidian', 'LiveSync', 'Synchronization'],
            url: '../articles/automation_ai/obsidian-livesync-configuration.html'
        },
        
        // Docker Services articles
        {
            id: 'docker-symphony-orchestrating-services',
            title: 'My Docker Symphony: Orchestrating Services in My Homelab',
            excerpt: 'Learn how to orchestrate multiple services using Docker Compose for efficient homelab management and service deployment.',
            category: 'docker_services',
            date: '2025-10-22',
            tags: ['Docker', 'Compose', 'Orchestration'],
            url: '../articles/docker_services/docker-symphony-orchestrating-services.html'
        },
        {
            id: 'docker-compose-image-download-challenges',
            title: 'Docker Compose Chronicles: Overcoming Image Download Challenges',
            excerpt: 'Troubleshooting guide for Docker Compose image download issues, including registry problems, network configuration, and alternative solutions.',
            category: 'docker_services',
            date: '2025-10-20',
            tags: ['Docker', 'Compose', 'Troubleshooting'],
            url: '../articles/docker_services/docker-compose-image-download-challenges.html'
        },
        {
            id: 'taming-docker-compose-volume-errors',
            title: 'Taming Docker Compose: Resolving Undefined Volume Errors',
            excerpt: 'Comprehensive guide to resolving Docker Compose volume errors, including volume declaration, permissions, and best practices.',
            category: 'docker_services',
            date: '2025-10-18',
            tags: ['Docker', 'Compose', 'Volumes'],
            url: '../articles/docker_services/taming-docker-compose-volume-errors.html'
        },
        
        // Reference articles
        {
            id: 'essential-urls-access-points',
            title: 'Navigating My Homelab: Essential URLs and Access Points',
            excerpt: 'Complete reference guide to all essential URLs and access points in a homelab environment, including services, dashboards, and management interfaces.',
            category: 'reference',
            date: '2025-10-25',
            tags: ['Reference', 'Homelab', 'URLs'],
            url: '../articles/reference/essential-urls-access-points.html'
        },
        {
            id: 'network-architecture-prompt',
            title: 'Network Architecture Prompt: DNS, TLS and Reverse Proxies',
            excerpt: 'Comprehensive prompt template for designing network architecture with proper DNS configuration, TLS setup, and reverse proxy implementation.',
            category: 'reference',
            date: '2025-10-23',
            tags: ['Network', 'DNS', 'TLS', 'Reference'],
            url: '../articles/reference/network-architecture-prompt.html'
        },
        {
            id: 'ssl-certificate-configuration-prompt',
            title: 'SSL Certificate Configuration Prompt: Securing Your Homelab',
            excerpt: 'Detailed prompt template for SSL certificate configuration in homelab environments, covering certificate generation, installation, and renewal.',
            category: 'reference',
            date: '2025-10-20',
            tags: ['SSL', 'Certificates', 'Security'],
            url: '../articles/reference/ssl-certificate-configuration-prompt.html'
        },
        {
            id: 'roadmap-self-hosted-services',
            title: 'Tracing My Homelab Journey: A Roadmap to Self-Hosted Services',
            excerpt: 'Complete roadmap for building and managing self-hosted services in a homelab environment, from basic setup to advanced automation.',
            category: 'reference',
            date: '2025-10-18',
            tags: ['Roadmap', 'Self-Hosted', 'Homelab'],
            url: '../articles/reference/roadmap-self-hosted-services.html'
        },
        
        // Remote Access articles
        {
            id: 'twingate-connection-mystery',
            title: 'The Twingate Connection Mystery: Untangling Authentication Failures',
            excerpt: 'Troubleshooting guide for Twingate VPN connection issues, including authentication failures, configuration problems, and network debugging.',
            category: 'remote_access',
            date: '2025-10-22',
            tags: ['Twingate', 'VPN', 'Authentication'],
            url: '../articles/remote_access/twingate-connection-mystery.html'
        },
        {
            id: 'cloudflare-tunnel-proxmox',
            title: 'Unlocking Remote Access: My Journey with Cloudflare Tunnel and Proxmox',
            excerpt: 'Complete guide to setting up Cloudflare Tunnel for secure remote access to Proxmox and homelab services without port forwarding.',
            category: 'remote_access',
            date: '2025-10-20',
            tags: ['Cloudflare', 'Tunnel', 'Proxmox'],
            url: '../articles/remote_access/cloudflare-tunnel-proxmox.html'
        }
    ],
    
    categories: {
        infrastructure: {
            name: 'Infrastructure',
            icon: 'fas fa-server',
            description: 'Proxmox VE, virtualization, system administration, and hardware setup guides.'
        },
        network_security: {
            name: 'Network Security',
            icon: 'fas fa-shield-alt',
            description: 'Firewall configuration, SSL/TLS, reverse proxies, and security best practices.'
        },
        automation_ai: {
            name: 'Automation & AI',
            icon: 'fas fa-robot',
            description: 'MCP deployment, workflow automation, AI integration, and productivity tools.'
        },
        docker_services: {
            name: 'Docker Services',
            icon: 'fab fa-docker',
            description: 'Container orchestration, Docker Compose, service deployment, and troubleshooting.'
        },
        reference: {
            name: 'Reference',
            icon: 'fas fa-book',
            description: 'Essential URLs, configuration prompts, roadmaps, and quick reference guides.'
        },
        remote_access: {
            name: 'Remote Access',
            icon: 'fas fa-network-wired',
            description: 'VPN solutions, tunneling, remote desktop, and secure access configurations.'
        }
    }
};

// Initialize blog functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    loadRecentArticles();
    initializeCopyButtons();
    initializeSmoothScrolling();
});

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('blogSearch');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Real-time search suggestions
        searchInput.addEventListener('input', debounce(function() {
            if (searchInput.value.length > 2) {
                showSearchSuggestions(searchInput.value);
            } else {
                hideSearchSuggestions();
            }
        }, 300));
    }
}

function performSearch() {
    const searchInput = document.getElementById('blogSearch');
    const query = searchInput.value.trim().toLowerCase();
    
    if (query.length < 2) {
        showNotification('Please enter at least 2 characters to search');
        return;
    }
    
    const results = blogData.articles.filter(article => 
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
    );
    
    displaySearchResults(results, query);
}

function displaySearchResults(results, query) {
    const recentGrid = document.querySelector('.recent-grid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (results.length === 0) {
        recentGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No results found for "${query}"</h3>
                <p>Try searching with different keywords or browse by category.</p>
            </div>
        `;
        loadMoreBtn.style.display = 'none';
        return;
    }
    
    recentGrid.innerHTML = results.map(article => createArticleCard(article)).join('');
    loadMoreBtn.style.display = 'none';
    
    // Scroll to results
    document.querySelector('.recent-articles').scrollIntoView({ behavior: 'smooth' });
}

function showSearchSuggestions(query) {
    // Implementation for search suggestions
    // This could show a dropdown with matching article titles
}

function hideSearchSuggestions() {
    // Hide search suggestions dropdown
}

// Load recent articles
function loadRecentArticles() {
    const recentGrid = document.querySelector('.recent-grid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (!recentGrid) return;
    
    // Sort articles by date (newest first)
    const sortedArticles = [...blogData.articles].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
    );
    
    // Show first 6 articles
    const initialArticles = sortedArticles.slice(0, 6);
    recentGrid.innerHTML = initialArticles.map(article => createArticleCard(article)).join('');
    
    // Load more functionality
    let currentIndex = 6;
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            const nextArticles = sortedArticles.slice(currentIndex, currentIndex + 6);
            
            if (nextArticles.length === 0) {
                loadMoreBtn.textContent = 'All Articles Loaded';
                loadMoreBtn.disabled = true;
                return;
            }
            
            nextArticles.forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.innerHTML = createArticleCard(article);
                recentGrid.appendChild(articleElement.firstElementChild);
            });
            
            currentIndex += 6;
            
            if (currentIndex >= sortedArticles.length) {
                loadMoreBtn.textContent = 'All Articles Loaded';
                loadMoreBtn.disabled = true;
            }
        });
    }
}

function createArticleCard(article) {
    const categoryInfo = blogData.categories[article.category];
    const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    return `
        <article class="blog-card" data-category="${article.category}">
            <div class="blog-meta">
                <span class="blog-date"><i class="far fa-calendar"></i> ${formattedDate}</span>
                <span class="blog-category">${categoryInfo.name}</span>
            </div>
            <h3>${article.title}</h3>
            <p>${article.excerpt}</p>
            <div class="blog-tags">
                ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <a href="${article.url}" class="blog-link">Read More <i class="fas fa-arrow-right"></i></a>
        </article>
    `;
}

// Copy button functionality for code blocks
function initializeCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        const pre = block.parentElement;
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-button';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
        copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
        
        pre.style.position = 'relative';
        pre.appendChild(copyBtn);
        
        copyBtn.addEventListener('click', function() {
            const text = block.textContent;
            
            navigator.clipboard.writeText(text).then(() => {
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                copyBtn.classList.add('copied');
                
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
                    copyBtn.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                showNotification('Failed to copy code to clipboard');
            });
        });
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close" aria-label="Close notification">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
}

// Category filtering for category pages
function filterByCategory(category) {
    const filteredArticles = blogData.articles.filter(article => 
        article.category === category
    );
    
    return filteredArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Get articles by tag
function getArticlesByTag(tag) {
    return blogData.articles.filter(article => 
        article.tags.some(articleTag => 
            articleTag.toLowerCase() === tag.toLowerCase()
        )
    );
}

// ===================================
// LANGUAGE FILTERING FUNCTIONALITY
// ===================================

// Initialize language filters
function initLanguageFilters() {
    const filterButtons = document.querySelectorAll('.language-filter-btn');
    const articles = document.querySelectorAll('.article-excerpt');

    if (filterButtons.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter articles
            articles.forEach(article => {
                if (filter === 'all') {
                    article.style.display = 'block';
                } else {
                    const lang = article.getAttribute('data-lang');
                    article.style.display = (lang === filter) ? 'block' : 'none';
                }
            });

            // Show notification
            const count = document.querySelectorAll('.article-excerpt:not([style*="display: none"])').length;
            const filterText = filter === 'all' ? 'all articles' : filter === 'en' ? 'English articles' : 'French articles';
            showNotification(`Showing ${count} ${filterText}`, 'info');
        });
    });
}

// Language toggle for individual articles
function addLanguageToggle() {
    // This function can be used to add language toggle to individual article pages
    const articleLang = document.documentElement.lang || 'en';
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'language-toggle-btn';
    toggleBtn.innerHTML = articleLang === 'fr' ? '🇬🇧 EN' : '🇫🇷 FR';
    toggleBtn.setAttribute('aria-label', 'Switch language');
    
    // Find corresponding article in other language
    const currentPath = window.location.pathname;
    const articleName = currentPath.split('/').pop();
    
    // This would need to be implemented based on your article naming convention
    toggleBtn.addEventListener('click', function() {
        // Logic to switch to same article in other language
        showNotification('Language switch feature coming soon!', 'info');
    });
    
    // Add to page header or navigation
    const header = document.querySelector('.header .container');
    if (header) {
        header.appendChild(toggleBtn);
    }
}

// Initialize language features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initLanguageFilters();
    
    // Add language toggle to individual article pages
    if (window.location.pathname.includes('/articles/')) {
        addLanguageToggle();
    }
});

// Export functions for use in other scripts
window.BlogUtils = {
    blogData,
    filterByCategory,
    getArticlesByTag,
    showNotification,
    createArticleCard,
    initLanguageFilters,
    addLanguageToggle
};