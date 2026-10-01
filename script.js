// ByteSpace Landing Page JavaScript
document.addEventListener('DOMContentLoaded', () => {
  // 1. Progress Bar Fill Animation
  const progressFill = document.getElementById('progress-bar-fill');
  if (progressFill) {
    progressFill.style.width = '0%';
    setTimeout(() => {
      progressFill.style.width = '55%';
    }, 400);
  }

  // 2. Interactive Search Form
  const searchForm = document.getElementById('hero-search-box');
  const searchInput = document.getElementById('search-input');

  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        console.log(`Searching for: ${query}`);
        // Visual feedback
        const btn = document.getElementById('search-btn');
        const origText = btn.textContent;
        btn.textContent = 'Searching...';
        setTimeout(() => {
          btn.textContent = origText;
        }, 800);
      } else {
        searchInput.focus();
      }
    });
  }

  // 3. Subtle Parallax effect on mouse move for floating cards & 3D shapes
  const heroArea = document.getElementById('hero-section');
  const shapes = document.querySelectorAll('.shape');
  const cards = document.querySelectorAll('.floating-stat-card');

  if (heroArea && window.innerWidth > 768) {
    heroArea.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const xPercent = (clientX / window.innerWidth - 0.5) * 2;
      const yPercent = (clientY / window.innerHeight - 0.5) * 2;

      shapes.forEach((shape, index) => {
        const depth = (index + 1) * 4;
        const moveX = xPercent * depth;
        const moveY = yPercent * depth;
        shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });

      cards.forEach((card, index) => {
        const depth = (index + 1) * 3;
        const moveX = -xPercent * depth;
        const moveY = -yPercent * depth;
        card.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    });

    heroArea.addEventListener('mouseleave', () => {
      shapes.forEach((shape) => {
        shape.style.transform = '';
      });
      cards.forEach((card) => {
        card.style.transform = '';
      });
    });
  }

  // 4. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // 5. Category Pills Interactive Selection
  const categoryPills = document.querySelectorAll('.category-pill:not(.more-link)');
  categoryPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      categoryPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.getAttribute('data-category');
      console.log(`Active category selected: ${cat}`);
    });
  });

  const moreBtn = document.getElementById('more-categories-btn');
  if (moreBtn) {
    moreBtn.addEventListener('click', () => {
      window.location.href = 'search.html';
    });
  }

  // 6. Search Page Interactivity
  const searchInputCourse = document.getElementById('course-search-input');
  const courseCards = document.querySelectorAll('.search-courses-grid .course-card');

  if (searchInputCourse && courseCards.length > 0) {
    // Check URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get('q');
    if (initialQuery) {
      searchInputCourse.value = initialQuery;
      filterCards(initialQuery);
    }

    searchInputCourse.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      filterCards(query);
    });

    function filterCards(query) {
      courseCards.forEach((card) => {
        const title = card.querySelector('.course-title')?.textContent.toLowerCase() || '';
        const instructor = card.querySelector('.course-instructor')?.textContent.toLowerCase() || '';
        if (title.includes(query) || instructor.includes(query)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }
  }

  // Search Tag Pills
  const searchTagPills = document.querySelectorAll('.search-tag-pill');
  searchTagPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      searchTagPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  // Search Pagination Buttons
  const pageNumbers = document.querySelectorAll('.search-pagination .page-number');
  pageNumbers.forEach((btn) => {
    btn.addEventListener('click', () => {
      pageNumbers.forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      window.scrollTo({ top: 320, behavior: 'smooth' });
    });
  });

  // Global Course Card Click Handler
  document.querySelectorAll('.course-card').forEach((card) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      if (e.target.closest('a') || e.target.closest('button')) return;
      window.location.href = 'course-details.html';
    });
  });

  // 7. Course Details Page Functionality
  const blueBackdrop = document.getElementById('hero-blue-backdrop');
  const videoWrapper = document.getElementById('course-video-container');

  function updateHeroBackdropHeight() {
    if (blueBackdrop && videoWrapper) {
      const rect = videoWrapper.getBoundingClientRect();
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const bottomPos = rect.bottom + scrollY + 28;
      blueBackdrop.style.height = `${bottomPos}px`;
    }
  }

  if (blueBackdrop && videoWrapper) {
    updateHeroBackdropHeight();
    window.addEventListener('resize', updateHeroBackdropHeight);
    window.addEventListener('load', updateHeroBackdropHeight);
    // Re-check after images/fonts settle
    setTimeout(updateHeroBackdropHeight, 300);
    setTimeout(updateHeroBackdropHeight, 800);
  }

  // Course Details Navigation Tabs
  const detailTabs = document.querySelectorAll('.nav-tab-pill');
  const tabPanes = {
    about: document.getElementById('tab-pane-about'),
    lessons: document.getElementById('tab-pane-lessons'),
    reviews: document.getElementById('tab-pane-reviews')
  };

  detailTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      detailTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      Object.keys(tabPanes).forEach((paneKey) => {
        if (tabPanes[paneKey]) {
          if (paneKey === target) {
            tabPanes[paneKey].style.display = 'block';
            tabPanes[paneKey].classList.add('active');
          } else {
            tabPanes[paneKey].style.display = 'none';
            tabPanes[paneKey].classList.remove('active');
          }
        }
      });
      // Animate progress bar if switching to lessons
      if (target === 'lessons') {
        const progressBar = document.getElementById('lesson-progress-bar');
        if (progressBar) {
          progressBar.style.width = '0%';
          setTimeout(() => {
            progressBar.style.width = '55%';
          }, 150);
        }
      }

      setTimeout(updateHeroBackdropHeight, 50);
    });
  });

  // Review Filter Pills
  const reviewFilterPills = document.querySelectorAll('.review-filter-pill');
  const reviewCards = document.querySelectorAll('.review-card-item');

  reviewFilterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      reviewFilterPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.getAttribute('data-filter');

      reviewCards.forEach((card) => {
        if (filter === 'all' || card.getAttribute('data-rating') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
      setTimeout(updateHeroBackdropHeight, 50);
    });
  });

  // More videos button switches to lessons tab
  const moreVideosBtn = document.getElementById('more-videos-btn');
  if (moreVideosBtn && tabPanes.lessons) {
    moreVideosBtn.addEventListener('click', () => {
      const lessonsTab = document.getElementById('tab-lessons');
      if (lessonsTab) lessonsTab.click();
      lessonsTab?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  // Toast notification helper
  const toastNotification = document.getElementById('toast-notification');
  function showToast(message) {
    if (!toastNotification) return;
    toastNotification.textContent = message;
    toastNotification.classList.add('show');
    setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 3200);
  }

  // Share button
  const shareBtn = document.getElementById('share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).then(() => {
          showToast('🔗 Course link copied to clipboard!');
        }).catch(() => {
          showToast('🔗 Link ready to share!');
        });
      } else {
        showToast('🔗 Link ready to share!');
      }
    });
  }

  // Enroll button
  const enrollBtn = document.getElementById('sidebar-enroll-btn');
  if (enrollBtn) {
    enrollBtn.addEventListener('click', () => {
      const origText = enrollBtn.textContent;
      enrollBtn.textContent = 'Enrolling...';
      enrollBtn.style.opacity = '0.85';
      setTimeout(() => {
        enrollBtn.textContent = 'Enrolled!';
        enrollBtn.style.backgroundColor = '#10B981';
        enrollBtn.style.color = '#FFFFFF';
        showToast('🎉 Successfully enrolled in Build Digital Asset!');
        setTimeout(() => {
          enrollBtn.textContent = origText;
          enrollBtn.style.backgroundColor = '';
          enrollBtn.style.color = '';
          enrollBtn.style.opacity = '';
        }, 2500);
      }, 700);
    });
  }

  // Video Preview Modal
  const videoPlayBtn = document.getElementById('video-play-btn');
  const videoModal = document.getElementById('video-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (videoPlayBtn && videoModal) {
    videoPlayBtn.addEventListener('click', () => {
      videoModal.classList.add('show');
      videoModal.setAttribute('aria-hidden', 'false');
    });

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', () => {
        videoModal.classList.remove('show');
        videoModal.setAttribute('aria-hidden', 'true');
      });
    }

    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        videoModal.classList.remove('show');
        videoModal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Sneak peek image click preview
  const sneakPeekItems = document.querySelectorAll('.sneak-peek-item');
  sneakPeekItems.forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img && toastNotification) {
        showToast(`🔍 Previewing asset: ${img.alt}`);
      }
    });
  });

  // 8. Creator Profile Interactivity
  // See Full Profile button on Course Details page
  const seeProfileBtn = document.getElementById('see-profile-btn');
  if (seeProfileBtn) {
    seeProfileBtn.addEventListener('click', (e) => {
      window.location.href = 'creator-profile.html';
    });
  }

  // Follow Button on Creator Profile Page
  const followBtn = document.getElementById('follow-btn');
  if (followBtn) {
    let isFollowing = false;
    followBtn.addEventListener('click', () => {
      isFollowing = !isFollowing;
      const followerCountEl = document.querySelector('.creator-stat-pill:nth-child(2) .stat-number');
      if (isFollowing) {
        followBtn.textContent = 'Following';
        followBtn.classList.add('following');
        if (followerCountEl) followerCountEl.textContent = '13';
        showToast('✨ You are now following PurePearl Studio!');
      } else {
        followBtn.textContent = 'Follow';
        followBtn.classList.remove('following');
        if (followerCountEl) followerCountEl.textContent = '12';
        showToast('👋 You unfollowed PurePearl Studio.');
      }
    });
  }

  // Creator Filters on Profile Page
  const creatorFilterPills = document.querySelectorAll('.filter-outline-pill');
  creatorFilterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      pill.classList.toggle('active');
      const filterName = pill.querySelector('span') ? pill.querySelector('span').textContent : 'Filter';
      showToast(`⚡ Filter: ${filterName} applied`);
    });
  });

  // 9. Auth Pages Form Handling
  window.handleAuthSubmit = function(type) {
    if (type === 'signin') {
      const emailInput = document.getElementById('signin-email');
      const email = emailInput ? emailInput.value.trim() : '';
      showToast(`✨ Welcome back, ${email || 'Creator'}! Signing you in...`);
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    } else if (type === 'register') {
      const nameInput = document.getElementById('reg-fullname');
      const name = nameInput ? nameInput.value.trim() : 'Creator';
      showToast(`🎉 Account created! Welcome to ByteSpace, ${name}!`);
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    }
  };

  window.handleSocialAuth = function(provider) {
    showToast(`🔐 Connecting with ${provider}...`);
  };
});



