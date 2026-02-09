// 页面加载动画
document.addEventListener('DOMContentLoaded', function() {
    // 添加滚动动画
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

    // 观察所有section元素
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // 技能标签悬停效果
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
        });
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // 项目卡片3D效果与全屏展示
    const projectCards = document.querySelectorAll('.project-card');

    const openProjectModal = (card) => {
        const overlay = document.createElement('div');
        overlay.className = 'project-modal-overlay';

        const modal = document.createElement('div');
        modal.className = 'project-modal';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'project-modal-close';
        closeBtn.innerHTML = '&times;';

        const content = card.cloneNode(true);
        content.style.transform = ''; // reset transform if any

        modal.appendChild(closeBtn);
        modal.appendChild(content);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        const close = () => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        };

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                close();
            }
        });

        closeBtn.addEventListener('click', close);
    };

    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });

        card.addEventListener('click', function() {
            openProjectModal(card);
        });
    });

    // 平滑滚动
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

    // 技能进度动画
    const skillCards = document.querySelectorAll('.skill-card');
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);

    skillCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        skillObserver.observe(card);
    });

    // 添加返回顶部按钮
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: white;
        color: #2563eb;
        border: 2px solid #2563eb;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
        } else {
            backToTop.style.opacity = '0';
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTop.addEventListener('mouseenter', function() {
        this.style.background = '#2563eb';
        this.style.color = 'white';
        this.style.transform = 'translateY(-3px)';
    });
    
    backToTop.addEventListener('mouseleave', function() {
        this.style.background = 'white';
        this.style.color = '#2563eb';
        this.style.transform = 'translateY(0)';
    });
    
    document.body.appendChild(backToTop);

    // 添加页面加载完成提示
    console.log('🎉 简历页面加载完成！');
    console.log('💼 黄志文 - 嵌入式软件技术经理');
});

// 添加键盘快捷键
document.addEventListener('keydown', function(e) {
    // Esc 返回顶部
    if (e.key === 'Escape') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});
