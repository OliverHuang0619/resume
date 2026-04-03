// 主 JavaScript 文件
document.addEventListener('DOMContentLoaded', function() {
    // 移动菜单切换
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            // 切换图标
            const icon = menuToggle.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // 点击菜单项关闭菜单
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
        
        // 点击外部关闭菜单
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 向下滚动时隐藏导航栏，向上滚动时显示
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        // 添加阴影效果
        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // 平滑滚动
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 技能标签动画
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // 项目卡片动画与弹窗
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length > 0) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        projectCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(card);
        });
    }

    // 项目详情弹窗交互
    const projectModal = document.getElementById('projectModal');
    const projectModalBody = document.getElementById('projectModalBody');
    const projectModalClose = document.getElementById('projectModalClose');
    const projectModalOverlay = projectModal?.querySelector('.project-modal-overlay');

    function openProjectModal(card) {
        if (!projectModal || !projectModalBody) return;
        
        const header = card.querySelector('.project-header')?.cloneNode(true);
        const client = card.querySelector('.project-client')?.cloneNode(true);
        const results = card.querySelector('.project-results')?.cloneNode(true);
        const tags = card.querySelector('.project-tags')?.cloneNode(true);

        projectModalBody.innerHTML = '';

        [header, client, results, tags].forEach(block => {
            if (block) {
                projectModalBody.appendChild(block);
            }
        });

        projectModal.classList.add('active');
        projectModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
        if (!projectModal) return;
        projectModal.classList.remove('active');
        projectModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (projectCards.length > 0 && projectModal) {
        projectCards.forEach(card => {
            card.addEventListener('click', function(event) {
                const target = event.target;
                if (target.closest('a')) {
                    return;
                }
                openProjectModal(card);
            });
        });
    }

    if (projectModalClose) {
        projectModalClose.addEventListener('click', closeProjectModal);
    }

    if (projectModalOverlay) {
        projectModalOverlay.addEventListener('click', closeProjectModal);
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeProjectModal();
        }
    });
    
    // 联系表单处理（示例）
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // 简单验证
            if (!name || !email || !message) {
                alert('请填写所有必填字段');
                return;
            }
            
            // 这里可以添加实际的表单提交逻辑
            // 例如使用 Fetch API 发送到服务器
            
            // 显示成功消息
            alert('感谢您的留言！我会尽快回复您。');
            this.reset();
        });
    }
    
    // 动态年份更新
    const yearElement = document.querySelector('.footer-year');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
    
    // 响应式调整
    function handleResize() {
        if (window.innerWidth > 768) {
            mobileMenu.classList.remove('active');
            const icon = menuToggle?.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    }
    
    window.addEventListener('resize', handleResize);
    
    // 初始化
    handleResize();
    
    // 控制台欢迎消息
    console.log('%c👋 欢迎来到黄志文的工作室网站！', 'color: #2563eb; font-size: 16px; font-weight: bold;');
    console.log('%c💡 核心理念：用技术解决「懒」——把时间留给创新与业务', 'color: #64748b; font-size: 14px;');
});