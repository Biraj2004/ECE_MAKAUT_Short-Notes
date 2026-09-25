/**
 * ECE MAKAUT Short Notes — Main Application Logic
 * Light Mode Editorial Neo-Brutalism + Pastel Edition
 * 
 * Author: Biraj Sarkar (CGEC ECE 2023-27)
 */

(function () {
  'use strict';

  // Application State
  const state = {
    activeSemester: 'all',
    searchQuery: ''
  };

  // Minimalist Geometric SVG Icons (No emojis)
  const ICONS = {
    download: `<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>`,
    book: `<svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
    check: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    clock: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    close: `<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
  };

  // DOM Elements
  const DOM = {
    contentContainer: document.getElementById('mainContentFeed'),
    semesterTabsGrid: document.getElementById('semesterTabsGrid'),
    searchInput: document.getElementById('searchInput'),
    searchClearBtn: document.getElementById('searchClearBtn'),
    searchKbd: document.getElementById('searchKbd'),
    licenseModal: document.getElementById('licenseModal'),
    licenseModalClose: document.getElementById('licenseModalClose'),
    licenseTriggerBtn: document.getElementById('licenseTriggerBtn'),
    licenseFooterTrigger: document.getElementById('licenseFooterTrigger'),
    copyCitationBtn: document.getElementById('copyCitationBtn'),
    scrollToTopBtn: document.getElementById('scrollToTopBtn'),
    toast: document.getElementById('toastBar'),
    // Mobile menu
    hamburgerBtn: document.getElementById('hamburgerBtn'),
    mobileMenuOverlay: document.getElementById('mobileMenuOverlay'),
    mobileMenuClose: document.getElementById('mobileMenuClose'),
    mobileMenuTabs: document.getElementById('mobileMenuTabs'),
    mobileLicenseBtn: document.getElementById('mobileLicenseBtn')
  };

  /**
   * Toast Notice (Desktop only — disabled on mobile & tablet where native OS copy UI triggers)
   */
  function showToast(message) {
    if (!DOM.toast) return;
    // Suppress on mobile and tablet where default system clipboard notice already triggers
    if (window.innerWidth <= 1024 || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches)) {
      return;
    }
    DOM.toast.innerHTML = `${ICONS.check} <span>${message}</span>`;
    DOM.toast.classList.add('show');
    setTimeout(() => {
      DOM.toast.classList.remove('show');
    }, 2200);
  }

  /**
   * Copy to Clipboard
   */
  async function copyToClipboard(text, msg = 'Copied to clipboard!') {
    try {
      await navigator.clipboard.writeText(text);
      showToast(msg);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast(msg);
    }
  }

  /**
   * Render Semester Tabs (Neat 2-Row Grid, NO numbers, NO horizontal scroll)
   */
  function renderSemesterTabs() {
    if (!DOM.semesterTabsGrid) return;

    let html = `
      <button class="tab-btn ${state.activeSemester === 'all' ? 'active' : ''}" data-sem="all">
        <span class="tab-label">All Semesters</span>
      </button>
    `;

    AcademicCatalog.SEMESTERS.forEach(sem => {
      const isWip = sem.status === 'coming-soon';
      const isActive = state.activeSemester === sem.id;

      html += `
        <button class="tab-btn ${isActive ? 'active' : ''} ${isWip ? 'wip' : ''}" data-sem="${sem.id}">
          <span class="tab-label">${sem.name}</span>
          ${isWip ? `<span class="tag-soon">Soon</span>` : ''}
        </button>
      `;
    });

    // 10th Slot: PYQ Papers Link Button (completes the 2-row x 5-column grid)
    html += `
      <a href="https://docs.google.com/document/d/1NLcByiSlAugGMJxNbXkBvEaA9jEwVhUt-21GkwoT_ZE/edit?tab=t.0#heading=h.vpuhncm2s6km" target="_blank" rel="noopener noreferrer" class="tab-btn tab-btn-pyq" title="Open MAKAUT PYQ Papers (Google Doc)">
        <span class="tab-label">PYQ Papers</span>
        <svg class="tab-ext-icon" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </a>
    `;

    DOM.semesterTabsGrid.innerHTML = html;

    DOM.semesterTabsGrid.querySelectorAll('.tab-btn[data-sem]').forEach(btn => {
      btn.addEventListener('click', () => {
        const semId = btn.getAttribute('data-sem');
        if (semId) {
          setActiveSemester(semId);
        }
      });
    });
  }

  function scrollToSemester(semId) {
    if (!semId || semId === 'all') return;
    setTimeout(() => {
      const target = document.getElementById(semId);
      if (target) {
        const nav = document.querySelector('.site-nav');
        const searchBar = document.querySelector('.search-sticky-bar');
        const stickyOffset =
          (nav ? nav.getBoundingClientRect().height : 64) +
          (searchBar ? searchBar.getBoundingClientRect().height : 50) +
          12;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - stickyOffset;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    }, 80);
  }

  function setActiveSemester(semId) {
    state.activeSemester = semId;
    if (history.pushState) {
      history.pushState(null, null, semId === 'all' ? '#' : `#${semId}`);
    }
    renderSemesterTabs();
    renderMobileMenuTabs();
    renderContentFeed();
    scrollToSemester(semId);
  }

  /**
   * Render Semester Tabs inside the Mobile Menu Overlay
   */
  function renderMobileMenuTabs() {
    if (!DOM.mobileMenuTabs) return;

    let html = `
      <button class="tab-btn ${state.activeSemester === 'all' ? 'active' : ''}" data-mob-sem="all">
        <span class="tab-label">All Semesters</span>
      </button>
    `;

    AcademicCatalog.SEMESTERS.forEach(sem => {
      const isWip = sem.status === 'coming-soon';
      const isActive = state.activeSemester === sem.id;

      html += `
        <button class="tab-btn ${isActive ? 'active' : ''} ${isWip ? 'wip' : ''}" data-mob-sem="${sem.id}">
          <span class="tab-label">${sem.name}</span>
          ${isWip ? `<span class="tag-soon">Soon</span>` : ''}
        </button>
      `;
    });

    html += `
      <a href="https://docs.google.com/document/d/1NLcByiSlAugGMJxNbXkBvEaA9jEwVhUt-21GkwoT_ZE/edit?tab=t.0#heading=h.vpuhncm2s6km" target="_blank" rel="noopener noreferrer" class="tab-btn tab-btn-pyq" title="Open MAKAUT PYQ Papers (Google Doc)">
        <span class="tab-label">PYQ Papers</span>
        <svg class="tab-ext-icon" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </a>
    `;

    DOM.mobileMenuTabs.innerHTML = html;

    DOM.mobileMenuTabs.querySelectorAll('.tab-btn[data-mob-sem]').forEach(btn => {
      btn.addEventListener('click', () => {
        const semId = btn.getAttribute('data-mob-sem');
        if (semId) {
          closeMobileMenu();
          setActiveSemester(semId);
        }
      });
    });
  }

  /**
   * Search Query Regex Builder
   * Supports alphanumeric tokens, course codes with optional hyphens/spaces (e.g. EC601 / EC-601),
   * escapes special regex characters, and caps at 50 characters.
   */
  function buildSearchRegexTokens(queryString) {
    if (!queryString) return null;
    const clean = queryString.trim().slice(0, 50);
    if (!clean) return null;

    const tokens = clean.split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return null;

    const regexTokens = [];
    for (const token of tokens) {
      const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const flexible = escaped
        .replace(/([a-zA-Z]+)[-_]?(\d+)/gi, '$1[-_\\s]?$2')
        .replace(/(\d+)[-_]?([a-zA-Z]+)/gi, '$1[-_\\s]?$2');
      try {
        regexTokens.push(new RegExp(flexible, 'i'));
      } catch (err) {
        regexTokens.push(new RegExp(escaped, 'i'));
      }
    }
    return regexTokens;
  }

  function matchesAnyField(fields, regexTokens) {
    if (!regexTokens || regexTokens.length === 0) return true;
    const combined = fields.filter(Boolean).join(' ');
    return regexTokens.every(rx => rx.test(combined));
  }

  function updateClearButtonVisibility() {
    const hasText = DOM.searchInput && DOM.searchInput.value.trim().length > 0;
    if (DOM.searchClearBtn) {
      DOM.searchClearBtn.classList.toggle('visible', hasText);
    }
    if (DOM.searchKbd) {
      DOM.searchKbd.style.display = hasText ? 'none' : 'block';
    }
  }

  function clearSearch() {
    if (DOM.searchInput) {
      DOM.searchInput.value = '';
      state.searchQuery = '';
      updateClearButtonVisibility();
      renderContentFeed();
      DOM.searchInput.focus();
    }
  }

  /**
   * Render Clean Content Feed (Combined PDFs Only)
   */
  function renderContentFeed() {
    if (!DOM.contentContainer) return;

    const regexTokens = buildSearchRegexTokens(state.searchQuery);
    const semFilter = state.activeSemester;

    let matchedSemesters = AcademicCatalog.SEMESTERS;
    if (semFilter !== 'all') {
      matchedSemesters = matchedSemesters.filter(s => s.id === semFilter);
    }

    let renderedAny = false;
    let outputHtml = '';

    matchedSemesters.forEach(sem => {
      // Coming Soon Semesters
      if (sem.status === 'coming-soon') {
        const expectedText = sem.expectedSubjects.map(sub => `${sub.code} ${sub.name}`).join(' ');
        const matchesQuery = matchesAnyField([sem.name, sem.code, sem.description, sem.note, expectedText], regexTokens);

        if (matchesQuery) {
          renderedAny = true;
          outputHtml += `
            <section class="semester-block" id="${sem.id}">
              <div class="semester-header">
                <div class="header-left">
                  <span class="sem-code-badge">${sem.code}</span>
                  <h2 class="sem-title-text">${sem.name}</h2>
                </div>
                <div class="sem-meta-text">Official Combined Exam Notes</div>
              </div>
              
              <div class="roadmap-card">
                <div class="roadmap-badge">${ICONS.clock} Pipeline Roadmap</div>
                <h3>${sem.name} Notes In Preparation</h3>
                <p>${sem.note}</p>
                <div class="roadmap-tags">
                  ${sem.expectedSubjects.map(sub => `
                    <span class="roadmap-tag"><strong>${sub.code}</strong> · ${sub.name}</span>
                  `).join('')}
                </div>
              </div>
            </section>
          `;
        }
        return;
      }

      // Ready Semesters
      let filteredSubjects = sem.subjects;
      if (regexTokens) {
        filteredSubjects = sem.subjects.filter(subj => {
          return matchesAnyField([subj.code, subj.name, subj.category, sem.name, sem.code], regexTokens);
        });
      }

      const showSyllabus = sem.syllabusPdf && (
        !regexTokens || 
        matchesAnyField([sem.syllabusPdf.title, sem.syllabusPdf.description, 'syllabus', sem.name, sem.code], regexTokens)
      );
      const hasSubjects = filteredSubjects.length > 0;

      if (showSyllabus || hasSubjects) {
        renderedAny = true;
        outputHtml += `
          <section class="semester-block" id="${sem.id}">
            <div class="semester-header">
              <div class="header-left">
                <span class="sem-code-badge">${sem.code}</span>
                <h2 class="sem-title-text">${sem.name}</h2>
              </div>
              <div class="sem-meta-text">Official Combined Exam Notes</div>
            </div>
        `;

        // Official Syllabus Card
        if (showSyllabus) {
          const sylRaw = GitHubSync.getRawUrl(sem.syllabusPdf.path);
          outputHtml += `
            <div class="syllabus-card-banner">
              <div class="syllabus-banner-left">
                <div class="syllabus-icon-box">${ICONS.book}</div>
                <div class="syllabus-info">
                  <h3>${sem.syllabusPdf.title}</h3>
                  <p>${sem.syllabusPdf.description}</p>
                </div>
              </div>
              <a href="${sylRaw}" download target="_blank" rel="noopener noreferrer" class="btn-syllabus-download">
                ${ICONS.download} Download Syllabus PDF
              </a>
            </div>
          `;
        }

        // Subject Grid (Clean & Combined Notes Only)
        if (hasSubjects) {
          outputHtml += `<div class="subject-grid">`;
          filteredSubjects.forEach(subj => {
            const combinedPath = `${subj.folder}/${subj.combinedPdf}`;
            const combinedRaw = GitHubSync.getRawUrl(combinedPath);

            outputHtml += `
              <article class="subject-item-card">
                <div>
                  <div class="card-top-row">
                    <span class="subject-code">${subj.code}</span>
                    <span class="subject-category">${subj.category}</span>
                  </div>
                  <h3 class="subject-title">${subj.name}</h3>
                  <p class="subject-desc">Comprehensive combined exam notes typeset with XeLaTeX.</p>
                </div>
                <a href="${combinedRaw}" download target="_blank" rel="noopener noreferrer" class="btn-download-combined">
                  ${ICONS.download} Download Combined Notes PDF
                </a>
              </article>
            `;
          });
          outputHtml += `</div>`;
        }

        outputHtml += `</section>`;
      }
    });

    if (!renderedAny) {
      const displayQuery = state.searchQuery.slice(0, 50);
      outputHtml = `
        <div style="background-color: var(--bg-surface); border: var(--border-width) dashed var(--border-ink); padding: 3rem 1.5rem; text-align: center; border-radius: var(--border-radius); margin: 2rem 0;">
          <h3 style="font-size: 1.35rem; margin-bottom: 0.5rem;">No Matching Subjects Found</h3>
          <p style="color: var(--ink-secondary); margin-bottom: 1.25rem; font-size: 0.88rem;">No subjects match your query "${displayQuery}". Try searching for course codes like "EC601", "BS-PH101", or "Control".</p>
          <button id="resetSearchBtn" class="btn-download-combined" style="width: auto; padding: 0 1.5rem; margin: 0 auto;">
            Reset Search
          </button>
        </div>
      `;
    }

    DOM.contentContainer.innerHTML = outputHtml;

    const resetBtn = document.getElementById('resetSearchBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', clearSearch);
    }
  }

  /**
   * License Modal Controller
   */
  function openLicenseModal() {
    if (DOM.licenseModal) {
      DOM.licenseModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      const body = DOM.licenseModal.querySelector('.modal-body');
      if (body) body.scrollTop = 0;
    }
  }

  function closeLicenseModal() {
    if (DOM.licenseModal) {
      DOM.licenseModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  /**
   * Event Listeners Setup
   */
  function setupEventListeners() {
    // Live search input with 50-character limit, regex sanitization, and clear button
    if (DOM.searchInput) {
      DOM.searchInput.addEventListener('input', (e) => {
        let rawVal = e.target.value;
        // Limit to 50 characters
        if (rawVal.length > 50) {
          rawVal = rawVal.slice(0, 50);
        }
        // Sanitize: allow letters, numbers, spaces, and safe punctuation (- _ . /)
        const sanitized = rawVal.replace(/[^a-zA-Z0-9\s\-_./]/g, '');
        if (rawVal !== sanitized) {
          e.target.value = sanitized;
        }

        state.searchQuery = sanitized;
        updateClearButtonVisibility();
        renderContentFeed();
      });

      // Clear button listener
      if (DOM.searchClearBtn) {
        DOM.searchClearBtn.addEventListener('click', clearSearch);
      }

      window.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement !== DOM.searchInput) {
          e.preventDefault();
          DOM.searchInput.focus();
          DOM.searchInput.select();
        } else if (e.key === 'Escape' && document.activeElement === DOM.searchInput) {
          if (DOM.searchInput.value) {
            clearSearch();
          } else {
            DOM.searchInput.blur();
          }
        }
      });
    }

    // License modal triggers
    if (DOM.licenseTriggerBtn) {
      DOM.licenseTriggerBtn.addEventListener('click', openLicenseModal);
    }
    if (DOM.licenseFooterTrigger) {
      DOM.licenseFooterTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        openLicenseModal();
      });
    }
    if (DOM.licenseModalClose) {
      DOM.licenseModalClose.addEventListener('click', closeLicenseModal);
    }
    if (DOM.licenseModal) {
      DOM.licenseModal.addEventListener('click', (e) => {
        if (e.target === DOM.licenseModal) closeLicenseModal();
      });
    }

    // Citation copy
    if (DOM.copyCitationBtn) {
      DOM.copyCitationBtn.addEventListener('click', () => {
        const citation = `Sarkar, Biraj. (2023–2027). ECE MAKAUT Short Notes [Study Notes]. Department of Electronics and Communication Engineering, Cooch Behar Government Engineering College (CGEC). Available under CC BY-NC-SA 4.0: https://github.com/Biraj2004/ECE_MAKAUT_Short-Notes`;
        copyToClipboard(citation, 'Citation copied!');
        const origText = DOM.copyCitationBtn.textContent;
        DOM.copyCitationBtn.textContent = 'Copied!';
        DOM.copyCitationBtn.classList.add('copied');
        setTimeout(() => {
          DOM.copyCitationBtn.textContent = origText;
          DOM.copyCitationBtn.classList.remove('copied');
        }, 2000);
      });
    }

    // ── Download Buttons (Open in new tab while staying on current tab) ─────
    if (DOM.contentContainer) {
      DOM.contentContainer.addEventListener('click', (e) => {
        const downloadBtn = e.target.closest('a.btn-download-combined, a.btn-syllabus-download');
        if (!downloadBtn) return;

        const href = downloadBtn.getAttribute('href');
        if (!href || href === '#' || href.startsWith('javascript:')) return;

        e.preventDefault();

        // Open download link in a new tab without shifting focus away from current tab
        const newTab = window.open(href, '_blank', 'noopener,noreferrer');
        if (newTab) {
          try {
            newTab.blur();
          } catch (err) {}
        }
        window.focus();
        setTimeout(() => window.focus(), 50);
        setTimeout(() => window.focus(), 150);

        if (!newTab) {
          // Fallback if popup blocker intercepted window.open
          const tempAnchor = document.createElement('a');
          tempAnchor.href = href;
          tempAnchor.target = '_blank';
          tempAnchor.rel = 'noopener noreferrer';
          tempAnchor.download = '';
          document.body.appendChild(tempAnchor);
          tempAnchor.click();
          document.body.removeChild(tempAnchor);
        }
      });
    }

    // ESC key closes modal and mobile menu
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeLicenseModal();
        closeMobileMenu();
      }
    });

    // ── Hamburger / Mobile Menu ──────────────────────────────────────────────
    if (DOM.hamburgerBtn) {
      DOM.hamburgerBtn.addEventListener('click', () => {
        if (DOM.mobileMenuOverlay && DOM.mobileMenuOverlay.classList.contains('is-open')) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }
      });
    }

    if (DOM.mobileMenuClose) {
      DOM.mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    // Close overlay when clicking the backdrop (outside the panel)
    if (DOM.mobileMenuOverlay) {
      DOM.mobileMenuOverlay.addEventListener('click', (e) => {
        if (e.target === DOM.mobileMenuOverlay) closeMobileMenu();
      });
    }

    // Mobile license button
    if (DOM.mobileLicenseBtn) {
      DOM.mobileLicenseBtn.addEventListener('click', () => {
        closeMobileMenu();
        openLicenseModal();
      });
    }

    // Auto-hiding Scroll to Top Button (Smooth 60fps rAF)
    if (DOM.scrollToTopBtn) {
      let isTicking = false;
      const onScroll = () => {
        if (window.scrollY > 320) {
          DOM.scrollToTopBtn.classList.add('visible');
        } else {
          DOM.scrollToTopBtn.classList.remove('visible');
        }
        isTicking = false;
      };

      window.addEventListener('scroll', () => {
        if (!isTicking) {
          window.requestAnimationFrame(onScroll);
          isTicking = true;
        }
      }, { passive: true });

      DOM.scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    // Hash sync
    window.addEventListener('hashchange', () => {
      handleUrlHash();
    });
  }

  /**
   * Mobile Menu Open / Close
   */
  function openMobileMenu() {
    if (!DOM.mobileMenuOverlay) return;
    DOM.mobileMenuOverlay.classList.add('is-open');
    DOM.mobileMenuOverlay.setAttribute('aria-hidden', 'false');
    if (DOM.hamburgerBtn) {
      DOM.hamburgerBtn.classList.add('is-open');
      DOM.hamburgerBtn.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!DOM.mobileMenuOverlay) return;
    DOM.mobileMenuOverlay.classList.remove('is-open');
    DOM.mobileMenuOverlay.setAttribute('aria-hidden', 'true');
    if (DOM.hamburgerBtn) {
      DOM.hamburgerBtn.classList.remove('is-open');
      DOM.hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }

  function handleUrlHash() {
    const hash = window.location.hash.replace('#', '');
    state.activeSemester = hash && (hash === 'all' || AcademicCatalog.SEMESTERS.some(s => s.id === hash)) ? hash : 'all';
    renderSemesterTabs();
    renderMobileMenuTabs();
    renderContentFeed();
    scrollToSemester(hash);
  }

  /**
   * App Initializer
   */
  function init() {
    setupEventListeners();
    handleUrlHash();
    renderMobileMenuTabs();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
