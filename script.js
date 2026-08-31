// 鼠标跟随彩色星星动画
class StarTrail {
    constructor() {
        this.starsContainer = document.getElementById('stars-container');
        this.stars = [];
        this.maxStars = 50;
        this.colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
        this.init();
    }

    init() {
        // 监听鼠标移动
        document.addEventListener('mousemove', (e) => {
            this.createStar(e.clientX, e.clientY);
        });

        // 定期清理星星
        setInterval(() => {
            this.cleanupStars();
        }, 100);
    }

    createStar(x, y) {
        // 限制星星数量
        if (this.stars.length >= this.maxStars) {
            return;
        }

        const star = document.createElement('div');
        star.className = 'star';
        
        // 随机颜色
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        
        // 随机大小
        const size = Math.random() * 8 + 4;
        
        // 设置样式
        star.style.position = 'fixed';
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.backgroundColor = color;
        star.style.borderRadius = '50%';
        star.style.pointerEvents = 'none';
        star.style.zIndex = '9999';
        star.style.boxShadow = `0 0 ${size * 2}px ${color}`;
        
        // 添加动画
        star.style.animation = 'starFade 1.5s ease-out forwards';
        
        // 添加到容器
        this.starsContainer.appendChild(star);
        this.stars.push(star);

        // 设置清理定时器
        setTimeout(() => {
            if (star.parentNode) {
                star.parentNode.removeChild(star);
            }
            const index = this.stars.indexOf(star);
            if (index > -1) {
                this.stars.splice(index, 1);
            }
        }, 1500);
    }

    cleanupStars() {
        // 清理超出屏幕的星星
        this.stars = this.stars.filter(star => {
            if (!star.parentNode) {
                return false;
            }
            const rect = star.getBoundingClientRect();
            return rect.top < window.innerHeight && rect.left < window.innerWidth;
        });
    }
}

// 平滑滚动到顶部
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // 为所有内部链接添加平滑滚动
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        
        internalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// 滚动动画
class ScrollAnimation {
    constructor() {
        this.init();
    }

    init() {
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

        // 观察需要动画的元素
        const animatedElements = document.querySelectorAll('.social-card, .education-item, .skill-category, .stat-item');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

// 添加CSS动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes starFade {
        0% {
            opacity: 1;
            transform: scale(0);
        }
        50% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0.5);
        }
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;
document.head.appendChild(style);

// 页面加载完成后初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    new StarTrail();
    new SmoothScroll();
    new ScrollAnimation();
});

// 添加一些交互效果
document.addEventListener('DOMContentLoaded', () => {
    // 社交媒体卡片现在通过CSS处理悬停效果，无需JavaScript

    // 教育经历项目悬停效果
    const educationItems = document.querySelectorAll('.education-item');
    educationItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-3px) scale(1.01)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 技能分类悬停效果
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', () => {
            category.style.transform = 'translateY(-3px) scale(1.01)';
        });
        
        category.addEventListener('mouseleave', () => {
            category.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 统计项目悬停效果
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// 项目模态框功能
const projectData = {
    'china-mobile': {
        title: 'China Mobile Analytics',
        subtitle: 'National Travel Pattern Analysis',
        description: 'Developed interactive dashboards using Python and Power BI to transform base station data into actionable insights about national travel patterns, directly informing regional marketing strategies.',
        technologies: ['Python', 'Power BI', 'SQL', 'Data Visualization'],
        impact: 'Helped shape targeted marketing strategies for data and voice plans during National Holiday periods.',
        duration: '3 months',
        role: 'Data Analyst'
    },
    'icbc-internship': {
        title: 'ICBC Data Analysis',
        subtitle: 'Product-Focused Analytics',
        description: 'Conducted comprehensive product-focused data analysis including writing SQL queries to extract user behavior data, designing and analyzing A/B tests to evaluate feature performance, and translating user insights into actionable product recommendations.',
        technologies: ['SQL', 'A/B Testing', 'Python', 'Product Analytics'],
        impact: 'Provided data-driven recommendations that influenced product development decisions.',
        duration: '3 months',
        role: 'Data Science Intern'
    },
    'news-recommendation': {
        title: 'News Recommendation System',
        subtitle: 'Intelligent Content System',
        description: 'Architected an intelligent news recommendation system leveraging large language models and the Flask framework, implementing machine learning models to deliver personalized content to users.',
        technologies: ['LLMs', 'Flask', 'Machine Learning', 'Python', 'NLP'],
        impact: 'Created a personalized content delivery system that improved user engagement.',
        duration: '2 months',
        role: 'ML Engineer'
    },
    'duke-projects': {
        title: 'Duke Research Projects',
        subtitle: 'Statistical Science Projects',
        description: 'Currently working on various statistical science research projects at Duke University, focusing on advanced statistical methods and their applications in real-world data analysis.',
        technologies: ['R', 'Statistics', 'Research', 'Statistical Modeling'],
        impact: 'Contributing to academic research in statistical science field.',
        duration: 'Ongoing',
        role: 'Graduate Research Assistant'
    }
};

let lifeGalleries = {};

function resolveAssetPath(path) {
    if (typeof window.assetUrl === 'function') {
        return window.assetUrl(path);
    }
    return path;
}

function resolveAssetPaths(paths) {
    return (paths || []).map(resolveAssetPath);
}

async function loadSiteContent() {
    if (window.SITE_CONTENT) {
        initContentFromManifest(window.SITE_CONTENT);
        return;
    }

    try {
        const response = await fetch(resolveAssetPath('site-data.json'));
        if (!response.ok) throw new Error('Failed to load site-data.json');
        initContentFromManifest(await response.json());
    } catch (err) {
        console.error('Could not load site content:', err);
    }
}

function initContentFromManifest(content) {
    lifeGalleries = {
        kitty: {
            title: '😼 Not a normal cat',
            images: resolveAssetPaths(content.cat && content.cat.images)
        },
        myworld: {
            title: '🌟 Welcome to My World',
            images: resolveAssetPaths(content.life && content.life.images)
        }
    };

    const catCover = document.getElementById('cat-cover');
    const lifeCover = document.getElementById('life-cover');
    const profileAvatar = document.getElementById('profile-avatar');
    if (catCover && content.cat && content.cat.cover) catCover.src = resolveAssetPath(content.cat.cover);
    if (lifeCover && content.life && content.life.cover) lifeCover.src = resolveAssetPath(content.life.cover);
    if (profileAvatar && content.profile) profileAvatar.src = resolveAssetPath(content.profile);

    document.querySelectorAll('.project-card-cover img, .project-card img').forEach((img) => {
        const src = img.getAttribute('src');
        if (src && !/^https?:\/\//i.test(src)) {
            img.src = resolveAssetPath(src);
        }
    });

    renderResumeLinks(content.resumes || []);
}

function renderResumeLinks(resumes) {
    const sidebar = document.getElementById('resume-list');
    const modal = document.getElementById('resume-modal-list');

    if (sidebar) {
        sidebar.innerHTML = resumes.map((resume, index) => `
            <a href="${resolveAssetPath(resume.path)}" class="resume-link" target="_blank"${index > 0 ? ' style="margin-top: 0.8rem;"' : ''}>
                <i class="fas fa-file-pdf"></i>
                <span>${resume.name}</span>
            </a>
        `).join('');
    }

    if (modal) {
        modal.innerHTML = resumes.map(resume => `
            <a href="${resolveAssetPath(resume.path)}" target="_blank" class="resume-modal-link" onclick="closeResumeModal()">
                <div style="display: flex; align-items: center; gap: 1rem; padding: 1.5rem; background: linear-gradient(135deg, #4dd0e1, #0277bd); border-radius: 12px; text-decoration: none; color: white; transition: all 0.3s ease;">
                    <i class="fas fa-file-pdf" style="font-size: 2rem;"></i>
                    <div style="flex: 1;">
                        <h3 style="margin: 0; font-size: 1.3rem;">${resume.name}</h3>
                    </div>
                    <i class="fas fa-external-link-alt" style="font-size: 1.2rem;"></i>
                </div>
            </a>
        `).join('');
    }
}

function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    const project = projectData[projectId];
    
    if (project) {
        modalContent.innerHTML = `
            <div class="project-modal-header">
                <h2 style="color: #0277bd; margin-bottom: 0.5rem;">${project.title}</h2>
                <p style="color: #4dd0e1; font-size: 1.1rem; margin-bottom: 1.5rem;">${project.subtitle}</p>
            </div>
            <div class="project-modal-body">
                <div class="project-detail">
                    <h4 style="color: #2c3e50; margin-bottom: 0.5rem;">Description</h4>
                    <p style="margin-bottom: 1.5rem; line-height: 1.6;">${project.description}</p>
                </div>
                <div class="project-detail">
                    <h4 style="color: #2c3e50; margin-bottom: 0.5rem;">Technologies Used</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
                        ${project.technologies.map(tech => `<span style="background: #4dd0e1; color: white; padding: 0.3rem 0.8rem; border-radius: 12px; font-size: 0.9rem;">${tech}</span>`).join('')}
                    </div>
                </div>
                <div class="project-detail">
                    <h4 style="color: #2c3e50; margin-bottom: 0.5rem;">Impact</h4>
                    <p style="margin-bottom: 1.5rem; line-height: 1.6;">${project.impact}</p>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.5rem;">
                    <div>
                        <h4 style="color: #2c3e50; margin-bottom: 0.5rem;">Duration</h4>
                        <p style="color: #4dd0e1; font-weight: 500;">${project.duration}</p>
                    </div>
                    <div>
                        <h4 style="color: #2c3e50; margin-bottom: 0.5rem;">Role</h4>
                        <p style="color: #4dd0e1; font-weight: 500;">${project.role}</p>
                    </div>
                </div>
            </div>
        `;
        modal.style.display = 'block';
    }
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
}

// 点击模态框外部关闭
window.onclick = function(event) {
    const projectModal = document.getElementById('projectModal');
    const lifeGalleryModal = document.getElementById('lifeGalleryModal');

    if (event.target === projectModal) {
        projectModal.style.display = 'none';
    }

    if (event.target === lifeGalleryModal) {
        lifeGalleryModal.style.display = 'none';
    }
}

// 项目详情面板功能
const projectDetails = {
    'mobile-behavior': {
        title: '📊 Mobile User Behavior Data Analysis and Visualization Project',
        subtitle: 'Company: China Mobile<br>Time: June 2024 - Aug 2024',
        coverImage: 'mobileuser/Mobile User Behavior Deep Insights.png',
        overview: 'An enterprise-level big data project completed at China Mobile Information Technology Center, building a comprehensive mobile user behavior data analysis platform. The two-week project processed massive user behavior data, achieving complete transformation from raw data to business insights through an end-to-end data pipeline.',
        technologies: ['Big Data', 'Python', 'SQL', 'Data Visualization', 'Hadoop', 'Spark'],
        techStack: {
            'Data Collection Layer': ['Kafka', 'Maxwell', 'Flume', 'Redis'],
            'Data Storage Layer': ['Hadoop HDFS', 'Hive', 'MySQL'],
            'Data Processing Layer': ['Spark', 'Custom UDF Functions', 'DataX'],
            'Data Visualization': ['PowerBI'],
            'Infrastructure': ['Virtual Machine Cluster', 'Linux Environment']
        },
        dataArchitecture: {
            'ODS': {
                name: 'ODS Layer',
                function: 'Raw data storage from logs',
                content: '<strong>Tables:</strong> user_activities_ods, user_travels_ods, aoi_ods<br><strong>Purpose:</strong> Maintains original structure, supports traceability'
            },
            'DWD': {
                name: 'DWD Layer',
                function: 'Data cleaning & quality assurance',
                content: '<strong>Processing:</strong> Remove outliers • Standardize formats • Parse JSON<br><strong>Output:</strong> Cleaned, structured data for analysis'
            },
            'DWS': {
                name: 'DWS Layer',
                function: 'Data aggregation & wide tables',
                content: '<strong>Dimensions:</strong> User/Time/Business levels<br><strong>Metrics:</strong> DAU/MAU, session duration, click-through rates'
            },
            'DIM': {
                name: 'DIM Layer',
                function: 'Centralized dimension tables',
                content: '<strong>Tables:</strong> dim_user (demographics) • dim_aoi (spot info) • dim_time (date/holiday) • dim_device (equipment)'
            },
            'ADS': {
                name: 'ADS Layer',
                function: 'Business application data',
                content: '<strong>Output:</strong> ads_user_behavior_profile • ads_travel_pattern_daily • ads_scenic_spot_ranking • ads_transportation_analysis'
            }
        },
        dataVisualization: {
            title: '📊 Data Visualization-PowerBI Dashboard',
            scenarios: [
                {
                    title: 'Scenario 1: National Day Holiday Travel Analysis',
                    goal: 'Gain insights into user holiday travel patterns, optimize tourism resource allocation',
                    metrics: [
                        'Usage proportion of various transportation modes (train, car, bus, airplane)',
                        'Popular scenic spot rankings and geographic distribution',
                        'Travel time concentration analysis'
                    ],
                    image: 'mobileuser/National Day Holiday Travel Analysis.png',
                    results: ''
                },
                {
                    title: 'Scenario 2: Mobile User Behavior Deep Insights',
                    goal: 'Build 360-degree user profiles, support precision marketing and product optimization',
                    dimensions: [
                        'User Engagement Analysis: DAU/MAU, session duration, feature usage frequency',
                        'Business Preference Analysis: Service plan usage, feature popularity ranking',
                        'Value Segmentation: RFM model user segmentation, lifecycle stage identification'
                    ],
                    image: 'mobileuser/Mobile User Behavior Deep Insights.png',
                    results: ''
                }
            ]
        },
        dataModel: {
            'users': {
                description: 'User Dimension Table',
                fields: ['id: Unique user identifier', 'age: Age segmentation', 'mobile: Mobile number (desensitized)'],
                purpose: 'User basic attribute management, supporting user segmentation analysis'
            },
            'aoi': {
                description: 'Scenic Spot Information Table',
                fields: ['id: Scenic spot ID', 'Spot Name: Attraction name', 'Region: Province/City location', 'Spot Level: A-level scenic spot classification', 'Longitude/Latitude: Geographic coordinates'],
                purpose: 'Geographic location analysis, scenic spot popularity ranking'
            },
            'user_activities_0': {
                description: 'User Behavior Table',
                fields: ['user_id: User ID', 'aoi_id: Scenic spot ID', 'activity_time: Activity timestamp', 'activity_duration: Activity duration', 'activity_time_date: Activity date'],
                purpose: 'User engagement analysis, behavior pattern mining'
            },
            'user_travels_0': {
                description: 'Travel Records Table',
                fields: ['user_id: User ID', 'travel_mode: Transportation mode', 'travel_time: Travel timestamp', 'travel_time_date: Travel date'],
                purpose: 'Travel preference analysis, transportation mode statistics'
            }
        },
        impact: `✅ End-to-End Data Pipeline: Mastered complete big data workflow from Kafka/Flume to PowerBI visualization
✅ Data Warehouse Architecture: Built optimized five-layer data warehouse (ODS→DWD→DWS→DIM→ADS)
✅ Large-Scale Processing: Handled 10M+ daily records with performance tuning and optimization
✅ BI Dashboard Development: Created interactive PowerBI dashboards with MySQL integration`,
    },
    'neural-news': {
        title: '🧠 Neural News Recommendation System with LLM Explanation',
        subtitle: 'Time: Aug 2024 - May 2025',
        coverImage: 'LLM/NAML.png',
        overview: 'This project aims to build a transparent, interpretable, and personalized news recommendation system based on the <strong>MIND dataset</strong>, integrating the strengths of traditional recommendation algorithms with <strong>large language models (LLMs)</strong> to address the "black box" problem in conventional recommendation systems. The <strong>news recommendation system</strong> not only accurately recommends news content aligned with user interests but also provides <strong>natural language explanation</strong> for each recommendation, significantly enhancing user experience and system trustworthiness.',
        technologies: ['LLM', 'Machine Learning', 'Python', 'Vue', 'Flask'],
        dataProcessing: true,
        algorithmComparison: {
            models: [
                {
                    key: 'content-based',
                    title: 'content-based',
                    image: 'LLM/content_based.jpg',
                    description: 'Served as a foundational baseline, recommending news based on TF-IDF textual similarity between user history and candidate articles.'
                },
                {
                    key: 'dkn',
                    title: 'DKN',
                    image: 'LLM/dkn.jpg',
                    description: 'Integrated external knowledge graphs to enrich news semantics, using a knowledge-aware CNN to model deep semantic relationships between entities.'
                },
                {
                    key: 'nrms',
                    title: 'NRMS',
                    image: 'LLM/nrms.png',
                    description: 'Leveraged Transformer-based self-attention to effectively encode news and user behavior sequences, capturing long-range dependencies and core interests.'
                },
                {
                    key: 'naml',
                    title: 'NAML',
                    image: 'LLM/NAML.png',
                    description: "Distinguished itself with an attentive multi-view learning architecture, dynamically fusing information from a news article's category, subcategory, title, and abstract."
                }
            ]
        },
        llmPrompt: {
            items: [
                {
                    title: 'Role & Workflow Definition',
                    description: 'Designed structured prompts to instruct the LLM to act as a "news recommendation expert" and follow a chain-of-thought process: "analyze history → understand content → generate recommendations → write explanations".',
                    image: 'LLM/prompt.png'
                },
                {
                    title: 'Dynamic Context Construction',
                    description: 'Dynamically populated the prompt with multi-dimensional data, including user behavior history, news titles, and categories, to provide precise reasoning context for the LLM.'
                },
                {
                    title: 'Testing & Refinement',
                    description: 'Improved prompts through multiple test rounds and manual checks to ensure quality explanations.'
                },
                {
                    title: 'API Integration',
                    description: 'Connected optimized prompts with DeepSeek API for automated explanation generation.',
                    image: 'LLM/API.png'
                }
            ]
        },
        fullStack: [
            { title: 'Frontend', description: 'Vue3 + Element UI + VueX' },
            { title: 'Backend', description: 'Flask RESTful APIs' },
            { title: 'Database', description: 'MySQL with E-R Modeling' },
            { title: 'Visualization', description: 'FineBI Dashboards' }
        ],
        systemFeatures: [
            {
                title: 'User Authentication',
                description: 'Account verification and session management.',
                image: 'LLM/userauthencation.png'
            },
            {
                title: 'Insight-Driven Recommendation',
                description: 'LLM-powered personalized news recommendations with explanations.',
                image: 'LLM/insight.png'
            },
            {
                title: 'Multi-View Content Recommendation',
                description: 'NAML model combining tags and user history for deeper personalization.',
                images: ['LLM/multiview1.jpg', 'LLM/multiview2.jpg']
            },
            {
                title: 'Explanation Generation',
                description: 'DeepSeek generates a natural language explanation for each recommendation.',
                image: 'LLM/explaination.png'
            },
            {
                title: 'Browsing History',
                description: 'Track, search, and visualize user interaction journeys.',
                image: 'LLM/history.png'
            },
            {
                title: 'News Visualization',
                description: 'FineBI dashboards reveal category distribution and trend analytics.',
                image: 'LLM/datavisualization.png'
            },
            {
                title: 'Administrator User Management',
                description: 'Comprehensive admin panel for user account management and system administration.',
                image: 'LLM/usermanage.png'
            }
        ],
        impactHighlights: [
            {
                title: 'Transparent AI',
                description: 'Transformed black-box recommendations into interpretable results, boosting user trust.'
            },
            {
                title: 'Better Experience',
                description: 'Dual-mode recommendations (LLM + NAML) deliver personalized, diverse content.'
            },
            {
                title: 'Technical Innovation',
                description: 'Successfully merged LLMs with recommendation algorithms in scalable architecture.'
            },
            {
                title: 'Production Ready',
                description: 'Full-stack web application demonstrating real-world deployment potential.'
            }
        ],
        techStack: {
            'Model Architecture': ['Transformer', 'BERT'],
            'Data Processing': ['Python', 'Pandas', 'NumPy', 'Scikit-learn'],
            'Deep Learning Frameworks': ['TensorFlow', 'PyTorch', 'Keras'],
            'NLP & Large Language Models': ['DeepSeek API', 'OpenAI GPT', 'NLTK'],
            'Frontend Technologies': ['Vue.js 3', 'JavaScript', 'HTML5', 'Element UI'],
            'Backend & Infrastructure': ['Flask', 'AWS', 'MySQL'],
            'Visualization Tools': ['FineBI']
        },
        impact: `✅ Neural Architecture: Implemented hybrid recommendation model combining collaborative and content-based filtering
✅ LLM Integration: Integrated GPT-3.5 for generating natural language explanations of recommendations
✅ Performance Optimization: Achieved 85%+ recommendation accuracy with sub-second response times
✅ Explainable AI: Developed interpretable recommendation system with user-friendly explanations
✅ Full-Stack Development: Built responsive Vue.js frontend with Flask backend API`,
        duration: '3 months',
        role: 'ML Engineer & AI Researcher'
    },
    'aws-video-games': {
        title: '🎮 Cloud-Based Video Games Sales Analytics Dashboard',
        subtitle: 'AWS S3 → Athena → Power BI End-to-End Data Analytics Project',
        coverImage: 'awspowerbi/dashboard_overview.png',
        overview: 'This project presents a full cloud-based data analytics pipeline that transforms raw video game sales data into an interactive Power BI dashboard. The workflow integrates AWS cloud services, SQL-based querying, data validation and cleaning, and business intelligence visualization. The final dashboard enables users to explore publisher dominance, platform lifecycle trends, regional performance, and genre-based insights in a single interactive interface.',
        technologies: ['AWS S3', 'Amazon Athena', 'Power BI', 'SQL', 'Data Analytics', 'ODBC'],
        techStack: {
            'Cloud Storage': ['AWS S3'],
            'Query Engine': ['Amazon Athena'],
            'Connectivity': ['Simba Athena ODBC Driver'],
            'Data Processing': ['SQL', 'Excel (VLOOKUP, data validation)'],
            'Visualization': ['Power BI'],
            'Version Control': ['GitHub']
        },
        architecture: {
            title: '🏗️ Architecture Overview',
            layers: [
                {
                    name: 'Raw Data Files',
                    description: 'Initial video game sales data in various formats'
                },
                {
                    name: 'AWS S3 (Cloud Storage)',
                    description: 'Centralized data repository in the cloud'
                },
                {
                    name: 'Amazon Athena (Serverless SQL Query Engine)',
                    description: 'Serverless interactive query service for analyzing data in S3'
                },
                {
                    name: 'Simba Athena ODBC Connector',
                    description: 'Driver enabling direct connectivity between Athena and Power BI'
                },
                {
                    name: 'Power BI Desktop / Power BI Service',
                    description: 'Business intelligence platform for data visualization'
                },
                {
                    name: 'Interactive Business Dashboard',
                    description: 'Final interactive dashboard for business insights'
                }
            ]
        },
        connectivity: {
            title: '🔌 Connecting Athena to Power BI',
            items: [
                {
                    title: 'ODBC Driver Configuration',
                    description: 'Connected Amazon Athena to Power BI using the Simba Athena ODBC driver, enabling direct cloud-to-BI querying without intermediate data exports.'
                },
                {
                    title: 'Authentication Setup',
                    description: 'Configured authentication, AWS region, and schema mapping to ensure stable connectivity between services.'
                }
            ]
        },
        dataValidation: {
            title: '✅ Data Validation Before Merging Tables',
            items: [
                {
                    description: 'Verified column data types (numeric vs categorical)'
                },
                {
                    description: 'Standardized column names and formatting'
                },
                {
                    description: 'Validated join keys and removed duplicate records'
                },
                {
                    description: 'Eliminated inconsistent or invalid entries'
                }
            ]
        },
        dataCleaning: {
            title: '🧹 Data Cleaning & Enrichment (VLOOKUP)',
            items: [
                {
                    title: 'Reference Table Matching',
                    description: 'Used VLOOKUP to match reference tables and standardize publisher and platform names'
                },
                {
                    title: 'Data Enrichment',
                    description: 'Filled missing categorical values using VLOOKUP functions'
                },
                {
                    title: 'Data Quality',
                    description: 'Removed unmatched rows after validation to maintain data consistency'
                }
            ]
        },
        sqlExtraction: {
            title: '📊 SQL-Based Metric Extraction',
            description: 'Aggregated metrics by publisher, platform, region, genre, and decade using SQL. Reduced downstream calculations inside Power BI and produced analysis-ready datasets optimized for visualization.'
        },
        dashboardFeatures: {
            title: '📈 Power BI Dashboard Development',
            description: 'Built an interactive Power BI dashboard featuring:',
            features: [
                {
                    title: 'KPI Cards',
                    description: 'Summarizing overall market scale'
                },
                {
                    title: 'Top Publishers Ranking',
                    description: 'Ranked by global sales'
                },
                {
                    title: 'Sales Distribution',
                    description: 'By decade and platform'
                },
                {
                    title: 'Global Sales Trends',
                    description: 'Over time for major platforms'
                },
                {
                    title: 'Genre Performance',
                    description: 'By region analysis'
                },
                {
                    title: 'Interactive Slicers',
                    description: 'For Genre, Region, and Decade filtering'
                }
            ],
            performance: 'Query-level filters were applied to improve dashboard performance and responsiveness.'
        },
        liveDashboard: {
            title: '🌐 Live Dashboard',
            description: 'Interactive Power BI Dashboard available online',
            url: 'https://app.powerbi.com/view?r=eyJrIjoiZGNhZjAwMjEtMzJlYS00ZjRkLWEyN2EtODAwZmRkNDkzMzc3IiwidCI6ImNiNzJjNTRlLTRhMzEtNGQ5ZS1iMTRhLTFlYTM2ZGZhYzk0YyIsImMiOjF9'
        },
        impact: `✅ Cloud Integration: Built end-to-end analytics pipeline from AWS S3 to Power BI without data exports
✅ Serverless Architecture: Leveraged Amazon Athena for scalable, cost-effective SQL querying
✅ Data Quality: Implemented rigorous validation and cleaning processes ensuring data integrity
✅ Business Intelligence: Created interactive dashboard with comprehensive game sales insights
✅ Performance Optimization: Applied query-level filters for improved dashboard responsiveness`,
        duration: '2 months',
        role: 'Data Engineer & BI Developer'
    }
};

function openProjectDetail(projectId) {
    const detailPanel = document.getElementById('projectDetailPanel');
    const detailContent = document.getElementById('detailPanelContent');
    const project = projectDetails[projectId];
    
    if (project) {
        detailContent.innerHTML = `
            <h2>${project.title}</h2>
            <p class="project-subtitle">${project.subtitle}</p>
            
            <div class="project-section">
                <h3>📋 Project Overview</h3>
                <p>${project.overview}</p>
            </div>
            
            ${project.liveDashboard ? `
            <div class="project-section">
                <h3>${project.liveDashboard.title}</h3>
                <p style="margin-bottom: 1rem; line-height: 1.6; color: #2c3e50;">
                    ${project.liveDashboard.description}
                </p>
                <a href="${project.liveDashboard.url}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #4dd0e1, #0277bd); color: white; padding: 0.8rem 1.5rem; border-radius: 8px; text-decoration: none; font-weight: 600; transition: transform 0.3s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    🌐 View Live Dashboard →
                </a>
            </div>
            ` : ''}
            
            ${project.techStack ? `
            <div class="project-section">
                <h3>🛠️ Technologies Used</h3>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 1rem;">
                    ${Object.entries(project.techStack).map(([layer, techs]) => `
                        <div>
                            <h4 style="color: #0277bd; font-size: 0.95rem; font-weight: 600; margin-bottom: 0.6rem;">
                                ${layer}:
                            </h4>
                            <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
                                ${techs.map(tech => {
                                    const isKeyTech = ['PowerBI', 'Spark', 'Hive', 'Hadoop HDFS'].includes(tech);
                                    return `<span style="background: ${isKeyTech ? 'linear-gradient(135deg, #4dd0e1, #0277bd)' : '#4dd0e1'}; color: white; padding: 0.3rem 0.6rem; border-radius: 12px; font-size: ${isKeyTech ? '0.9rem' : '0.8rem'}; font-weight: ${isKeyTech ? '600' : '500'};">
                                        ${isKeyTech ? '🌟' : ''} ${tech}
                                    </span>`;
                                }).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
            
            ${project.dataProcessing ? `
            <div class="project-section">
                <h3 style="letter-spacing: 0.02em;">📊 Data Processing & Analysis (NumPy & Pandas)</h3>
                <p style="margin-bottom: 1.5rem; line-height: 1.6; color: #2c3e50; letter-spacing: 0.02em;">
                    Based on <strong>NumPy</strong> and <strong>Pandas</strong> Execute comprehensive data for the MIND dataset to build a robust foundation for recommendation:
                </p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div style="padding: 1rem; background: #f8fdfe; border-radius: 8px; border-left: 3px solid #4dd0e1;">
                        <h4 style="color: #0277bd; font-size: 0.95rem; font-weight: 600; margin-bottom: 0.6rem; letter-spacing: 0.02em;">
                            Data Clean & Conversion
                        </h4>
                        <p style="color: #2c3e50; font-size: 0.85rem; line-height: 1.6; margin: 0; letter-spacing: 0.02em;">
                            Converted raw TSV files to CSV format and handled missing values to ensure data integrity.
                        </p>
                    </div>
                    <div style="padding: 1rem; background: #f8fdfe; border-radius: 8px; border-left: 3px solid #4dd0e1;">
                        <h4 style="color: #0277bd; font-size: 0.95rem; font-weight: 600; margin-bottom: 0.6rem; letter-spacing: 0.02em;">
                            User Behavior Sequencing
                        </h4>
                        <p style="color: #2c3e50; font-size: 0.85rem; line-height: 1.6; margin: 0; letter-spacing: 0.02em;">
                            Processed and structured user clickstream logs into a sequential user-news interaction table.
                        </p>
                    </div>
                    <div style="padding: 1rem; background: #f8fdfe; border-radius: 8px; border-left: 3px solid #4dd0e1;">
                        <h4 style="color: #0277bd; font-size: 0.95rem; font-weight: 600; margin-bottom: 0.6rem; letter-spacing: 0.02em;">
                            Multi-View Feature Integration
                        </h4>
                        <p style="color: #2c3e50; font-size: 0.85rem; line-height: 1.6; margin: 0; letter-spacing: 0.02em;">
                            Fused multi-dimensional news features, including category, subcategory, title, and abstract etc.
                        </p>
                    </div>
                    <div style="padding: 1rem; background: #f8fdfe; border-radius: 8px; border-left: 3px solid #4dd0e1;">
                        <h4 style="color: #0277bd; font-size: 0.95rem; font-weight: 600; margin-bottom: 0.6rem; letter-spacing: 0.02em;">
                            Dataset Preparation
                        </h4>
                        <p style="color: #2c3e50; font-size: 0.85rem; line-height: 1.6; margin: 0; letter-spacing: 0.02em;">
                            Performed vectorization and dataset splitting for training and evaluating four distinct recommendation models.
                        </p>
                    </div>
                </div>
            </div>
            ` : ''}
            
            ${project.algorithmComparison ? `
            <div class="project-section">
                <h3 style="letter-spacing: 0.02em;">🧠 Deep Learning  Research & Comparison</h3>
                <p style="margin-bottom: 1rem; line-height: 1.6; color: #2c3e50; letter-spacing: 0.02em;">
                    This project involved the reproduction and evaluation of four news recommendation algorithms to identify the optimal model for the system's core engine.
                </p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    ${project.algorithmComparison.models.map(m => `
                        <div style="background: #ffffff; border: 1px solid #e0f2f1; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                            <div style="height: 160px; overflow: hidden; background: #f8fdfe;">
                                <img src="${m.image}" alt="${m.title}" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
                            </div>
                            <div style="padding: 0.9rem 1rem;">
                                <h4 style="color: #0277bd; font-size: 0.95rem; font-weight: 700; margin: 0 0 0.4rem 0; letter-spacing: 0.02em;">
                                    ${m.title}
                                </h4>
                                <p style="color: #2c3e50; font-size: 0.85rem; line-height: 1.6; margin: 0; letter-spacing: 0.02em;">
                                    ${m.description}
                                </p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
            
            ${project.llmPrompt ? `
            <div class="project-section">
                <h3 style="letter-spacing: 0.02em;">🎯 LLM Prompt & Optimization</h3>
                ${project.llmPrompt.items.some(item => item.image) ? `
                <div style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; margin-bottom: 1rem;">
                    ${project.llmPrompt.items.filter(item => item.image).map(item => `
                        <div style="flex: 1 1 300px; max-width: 360px; display: flex; flex-direction: column; align-items: center; gap: 0.6rem;">
                            <img src="${item.image}" alt="${item.title}" style="width: 100%; border-radius: 10px; box-shadow: 0 3px 10px rgba(0,0,0,0.12);" />
                            <span style="color: #0277bd; font-size: 0.9rem; font-weight: 600; letter-spacing: 0.02em;">${item.title}</span>
                        </div>
                    `).join('')}
                </div>
                ` : ''}
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
                    ${project.llmPrompt.items.map(item => `
                        <div style="background: #ffffff; border: 1px solid #e0f2f1; border-radius: 10px; padding: 1.1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05); display: flex; flex-direction: column; gap: 0.6rem;">
                            <h4 style="color: #0277bd; font-size: 0.95rem; font-weight: 600; margin: 0; letter-spacing: 0.02em;">
                                ${item.title}
                            </h4>
                            <p style="color: #2c3e50; font-size: 0.85rem; line-height: 1.6; margin: 0; letter-spacing: 0.02em;">
                                ${item.description}
                            </p>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
            ${project.fullStack ? `
            <div class="project-section">
                <h3 style="letter-spacing: 0.02em;">🛠️ Full-Stack Development</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem;">
                    ${project.fullStack.map(item => `
                        <div style="background: #ffffff; border: 1px solid #e0f2f1; border-radius: 10px; padding: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                            <h4 style="color: #0277bd; font-size: 0.9rem; font-weight: 600; margin: 0 0 0.4rem 0; letter-spacing: 0.02em;">
                                ${item.title}
                            </h4>
                            <p style="color: #2c3e50; font-size: 0.85rem; line-height: 1.6; margin: 0; letter-spacing: 0.02em;">
                                ${item.description}
                            </p>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
            ${project.dataModel ? `
            <div class="project-section">
                <h3>📁 Core Data Model Design</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    ${Object.entries(project.dataModel).map(([tableName, tableInfo]) => `
                        <div style="padding: 0.8rem; background: #f8fdfe; border-radius: 8px; border-left: 3px solid #4dd0e1;">
                            <h4 style="color: #0277bd; font-size: 0.95rem; font-weight: 600; margin-bottom: 0.6rem;">
                                ${tableInfo.description} - <code style="background: rgba(77, 208, 225, 0.1); padding: 0.1rem 0.4rem; border-radius: 4px; font-size: 0.8rem;">${tableName}</code>
                            </h4>
                            <ul style="margin: 0; padding-left: 1.2rem; color: #2c3e50; line-height: 1.6; font-size: 0.85rem;">
                                ${tableInfo.fields.map(field => `<li style="margin-bottom: 0.25rem;">${field}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
            
            ${project.dataArchitecture ? `
            <div class="project-section">
                <h3>📊 Five-Layer Data Warehouse Architecture</h3>
                ${Object.entries(project.dataArchitecture).map(([layerName, layerInfo], index) => {
                    const colors = [
                        { border: '#ff6b6b', bg: '#fff5f5' }, // ODS - Red
                        { border: '#ff9f40', bg: '#fff8f0' }, // DWD - Orange
                        { border: '#feca57', bg: '#fffef5' }, // DWS - Yellow
                        { border: '#48dbfb', bg: '#f0fdff' }, // DIM - Light Blue
                        { border: '#54a0ff', bg: '#f5f9ff' }  // ADS - Blue
                    ];
                    const color = colors[index];
                    return `
                    <div style="padding: 0.8rem; background: ${color.bg}; border-radius: 6px; border-left: 3px solid ${color.border}; margin-bottom: 0.8rem;">
                        <h4 style="color: ${color.border}; font-size: 0.9rem; font-weight: 600; margin-bottom: 0.5rem;">
                            ${layerInfo.name}
                        </h4>
                        <p style="color: #2c3e50; font-size: 0.85rem; line-height: 1.5; margin: 0.3rem 0;">
                            <strong>Function:</strong> ${layerInfo.function}
                        </p>
                        ${layerInfo.content ? `
                            <div style="color: #2c3e50; font-size: 0.8rem; line-height: 1.4; margin-top: 0.5rem;">
                                ${layerInfo.content}
                            </div>
                        ` : ''}
                    </div>
                `;
                }).join('')}
            </div>
            ` : ''}
            
            ${project.systemFeatures ? `
            <div class="project-section">
                <h3 style="letter-spacing: 0.02em;">🔧 System Architecture & Features</h3>
                <div style="display: flex; flex-direction: column; gap: 1.2rem;">
                    ${project.systemFeatures.map(feature => `
                        <div style="background: #ffffff; border: 1px solid #e0f2f1; border-radius: 10px; padding: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05); display: flex; flex-direction: column; gap: 0.8rem;">
                            ${(feature.images ? `
                                <div style="display: flex; gap: 0.8rem; flex-wrap: wrap; justify-content: center;">
                                    ${feature.images.map(imgSrc => `
                                        <img src="${imgSrc}" alt="${feature.title}" style="width: clamp(200px, 40%, 320px); border-radius: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);" />
                                    `).join('')}
                                </div>
                            ` : feature.image ? `
                                <div style="display: flex; justify-content: center;">
                                    <img src="${feature.image}" alt="${feature.title}" style="width: clamp(220px, 60%, 420px); max-width: 100%; border-radius: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);" />
                                </div>
                            ` : '')}
                            <h4 style="color: #0277bd; font-size: 0.9rem; font-weight: 600; margin: 0 0 0.4rem 0; letter-spacing: 0.02em;">
                                ${feature.title}
                            </h4>
                            <p style="color: #2c3e50; font-size: 0.85rem; line-height: 1.6; margin: 0; letter-spacing: 0.02em;">
                                ${feature.description}
                            </p>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
            
            ${project.dataVisualization ? `
            <div class="project-section">
                <h3>${project.dataVisualization.title}</h3>
                ${project.dataVisualization.scenarios.map(scenario => `
                    <div style="margin-bottom: 2rem; padding: 1.2rem; background: #f8fdfe; border-radius: 8px; border-left: 4px solid #4dd0e1;">
                        <h4 style="color: #0277bd; font-size: 1.1rem; font-weight: 600; margin-bottom: 0.8rem;">
                            ${scenario.title}
                        </h4>
                        <p style="color: #2c3e50; font-size: 0.9rem; line-height: 1.6; margin-bottom: 0.8rem;">
                            <strong>Analysis Goal:</strong> ${scenario.goal}
                        </p>
                        ${scenario.metrics ? `
                            <div style="margin-bottom: 0.8rem;">
                                <strong style="color: #2c3e50; font-size: 0.9rem;">Core Metrics:</strong>
                                <ul style="margin: 0.5rem 0 0 1.5rem; padding: 0; color: #2c3e50; line-height: 1.6; font-size: 0.85rem;">
                                    ${scenario.metrics.map(metric => `<li style="margin-bottom: 0.3rem;">${metric}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        ${scenario.dimensions ? `
                            <div style="margin-bottom: 0.8rem;">
                                <strong style="color: #2c3e50; font-size: 0.9rem;">Analysis Dimensions:</strong>
                                <ul style="margin: 0.5rem 0 0 1.5rem; padding: 0; color: #2c3e50; line-height: 1.6; font-size: 0.85rem;">
                                    ${scenario.dimensions.map(dimension => `<li style="margin-bottom: 0.3rem;">${dimension}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        <div style="background: white; padding: 0.8rem; border-radius: 6px; margin-top: 0.8rem;">
                            <strong style="color: #4dd0e1; font-size: 0.9rem;">Visualization Results:</strong>
                            ${scenario.image ? `
                                <div style="margin: 0.8rem 0;">
                                    <img src="${scenario.image}" alt="${scenario.title}" style="width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" />
                                </div>
                            ` : ''}
                            ${scenario.results ? `
                                <p style="margin: 0.5rem 0 0 0; color: #2c3e50; font-size: 0.85rem; line-height: 1.6;">
                                    ${scenario.results}
                                </p>
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            ${project.impactHighlights ? `
            <div class="project-section">
                <h3 style="letter-spacing: 0.02em;">💡 Project Impact</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
                    ${project.impactHighlights.map(item => `
                        <div style="background: #ffffff; border: 1px solid #e0f2f1; border-radius: 10px; padding: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                            <h4 style="color: #0277bd; font-size: 0.9rem; font-weight: 600; margin: 0 0 0.4rem 0; letter-spacing: 0.02em;">
                                ${item.title}
                            </h4>
                            <p style="color: #2c3e50; font-size: 0.85rem; line-height: 1.6; margin: 0; letter-spacing: 0.02em;">
                                ${item.description}
                            </p>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
            
            ${project.architecture ? `
            <div class="project-section">
                <h3>${project.architecture.title}</h3>
                <div style="display: flex; flex-direction: column; gap: 0.8rem;">
                    ${project.architecture.layers.map((layer, index) => `
                        <div style="display: flex; align-items: center; gap: 1rem; padding: 0.8rem; background: #f8fdfe; border-radius: 8px; border-left: 3px solid #4dd0e1;">
                            <span style="color: #0277bd; font-weight: 600; min-width: 30px; text-align: center;">${index < project.architecture.layers.length - 1 ? '⬇️' : ''}</span>
                            <div style="flex: 1;">
                                <h4 style="color: #0277bd; font-size: 0.95rem; font-weight: 600; margin: 0 0 0.3rem 0;">
                                    ${layer.name}
                                </h4>
                                <p style="color: #2c3e50; font-size: 0.85rem; line-height: 1.5; margin: 0;">
                                    ${layer.description}
                                </p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
            
            ${project.connectivity ? `
            <div class="project-section">
                <h3>${project.connectivity.title}</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
                    ${project.connectivity.items.map(item => `
                        <div style="background: #ffffff; border: 1px solid #e0f2f1; border-radius: 10px; padding: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                            <h4 style="color: #0277bd; font-size: 0.95rem; font-weight: 600; margin: 0 0 0.4rem 0;">
                                ${item.title}
                            </h4>
                            <p style="color: #2c3e50; font-size: 0.85rem; line-height: 1.6; margin: 0;">
                                ${item.description}
                            </p>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
            
            ${project.dataValidation ? `
            <div class="project-section">
                <h3>${project.dataValidation.title}</h3>
                <p style="margin-bottom: 1rem; line-height: 1.6; color: #2c3e50;">
                    Before merging datasets, strict validation checks were performed to ensure data integrity:
                </p>
                <ul style="margin: 0; padding-left: 1.5rem; color: #2c3e50; line-height: 1.8;">
                    ${project.dataValidation.items.map(item => `<li style="margin-bottom: 0.5rem;">${item.description}</li>`).join('')}
                </ul>
            </div>
            ` : ''}
            
            ${project.dataCleaning ? `
            <div class="project-section">
                <h3>${project.dataCleaning.title}</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
                    ${project.dataCleaning.items.map(item => `
                        <div style="background: #ffffff; border: 1px solid #e0f2f1; border-radius: 10px; padding: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                            <h4 style="color: #0277bd; font-size: 0.95rem; font-weight: 600; margin: 0 0 0.4rem 0;">
                                ${item.title}
                            </h4>
                            <p style="color: #2c3e50; font-size: 0.85rem; line-height: 1.6; margin: 0;">
                                ${item.description}
                            </p>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
            
            ${project.sqlExtraction ? `
            <div class="project-section">
                <h3>${project.sqlExtraction.title}</h3>
                <p style="line-height: 1.6; color: #2c3e50;">
                    ${project.sqlExtraction.description}
                </p>
            </div>
            ` : ''}
            
            ${project.dashboardFeatures ? `
            <div class="project-section">
                <h3>${project.dashboardFeatures.title}</h3>
                <p style="margin-bottom: 1rem; line-height: 1.6; color: #2c3e50;">
                    ${project.dashboardFeatures.description}
                </p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
                    ${project.dashboardFeatures.features.map(feature => `
                        <div style="background: #f8fdfe; border-left: 3px solid #4dd0e1; padding: 0.8rem; border-radius: 6px;">
                            <h4 style="color: #0277bd; font-size: 0.9rem; font-weight: 600; margin: 0 0 0.3rem 0;">
                                ${feature.title}
                            </h4>
                            <p style="color: #2c3e50; font-size: 0.85rem; line-height: 1.5; margin: 0;">
                                ${feature.description}
                            </p>
                        </div>
                    `).join('')}
                </div>
                ${project.dashboardFeatures.performance ? `
                    <p style="color: #4dd0e1; font-size: 0.9rem; font-weight: 500; margin-top: 0.5rem;">
                        💡 ${project.dashboardFeatures.performance}
                    </p>
                ` : ''}
            </div>
            ` : ''}
            

        `;
        detailPanel.classList.add('active');
    }
}

function closeProjectDetail() {
    const detailPanel = document.getElementById('projectDetailPanel');
    detailPanel.classList.remove('active');
}

// 添加项目卡片点击事件
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card[data-project]');
    
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            openProjectDetail(projectId);
        });
    });
});

function openLifeGallery(galleryId) {
    const gallery = lifeGalleries[galleryId];
    const modal = document.getElementById('lifeGalleryModal');
    const content = document.getElementById('lifeGalleryContent');

    if (gallery && modal && content) {
        content.innerHTML = `
            <div class="life-gallery-header">
                <h2>${gallery.title}</h2>
            </div>
            <div class="life-gallery-grid">
                ${gallery.images.map(image => `
                    <div class="life-gallery-item">
                        <img src="${image}" alt="Life moment photo" />
                    </div>
                `).join('')}
            </div>
        `;
        modal.style.display = 'block';
    }
}

function closeLifeGallery() {
    const modal = document.getElementById('lifeGalleryModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadSiteContent();

    const galleryTriggers = document.querySelectorAll('.kitty-info.kitty-gallery-trigger');
    galleryTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const galleryId = trigger.getAttribute('data-gallery');
            openLifeGallery(galleryId);
        });
    });
});

// 简历模态框功能
function openResumeModal() {
    const modal = document.getElementById('resumeModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeResumeModal() {
    const modal = document.getElementById('resumeModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// 点击模态框外部关闭
window.addEventListener('click', (event) => {
    const resumeModal = document.getElementById('resumeModal');
    if (event.target === resumeModal) {
        closeResumeModal();
    }
});


