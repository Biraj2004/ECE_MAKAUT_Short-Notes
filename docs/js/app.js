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
    close: `<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
  };

  // DOM Elements
  const DOM = {
    siteNav: document.querySelector('.site-nav'),
    searchBar: document.querySelector('.search-sticky-bar'),
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
      <button class="tab-btn ${state.activeSemester === 'all' ? 'active' : ''}" data-sem="all" aria-pressed="${state.activeSemester === 'all'}">
        <span class="tab-label">All Semesters</span>
      </button>
    `;

    AcademicCatalog.SEMESTERS.forEach(sem => {
      const isWip = sem.status === 'in-progress';
      const isActive = state.activeSemester === sem.id;

      html += `
        <button class="tab-btn ${isActive ? 'active' : ''} ${isWip ? 'wip' : ''}" data-sem="${sem.id}" aria-pressed="${isActive}">
          <span class="tab-label">${sem.name}</span>
          ${isWip ? `<span class="tag-progress">In progress</span>` : ''}
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

  function positionSearchBar() {
    if (!DOM.siteNav || !DOM.searchBar || !DOM.contentContainer) return;
    const { siteNav, searchBar, contentContainer } = DOM;
    const root = document.documentElement;
    const mobileLayout = window.matchMedia('(max-width: 768px)');
    const measureStickyStack = () => {
      const navHeight = siteNav.getBoundingClientRect().height;
      const searchHeight = siteNav.contains(searchBar) ? 0 : searchBar.getBoundingClientRect().height;
      root.style.setProperty('--site-nav-height', `${navHeight}px`);
      root.style.setProperty('--sticky-stack-height', `${navHeight + searchHeight}px`);
    };
    const placeSearch = ({ matches }) => {
      if (matches) {
        siteNav.append(searchBar);
      } else {
        contentContainer.before(searchBar);
        if (DOM.mobileMenuOverlay?.classList.contains('is-open')) closeMobileMenu();
      }
      measureStickyStack();
    };
    placeSearch(mobileLayout);
    mobileLayout.addEventListener('change', placeSearch);

    const observer = new ResizeObserver(measureStickyStack);
    observer.observe(siteNav, { box: 'border-box' });
    observer.observe(searchBar, { box: 'border-box' });
  }

  function scrollToSemester(semId) {
    if (!semId || semId === 'all') return;
    setTimeout(() => {
      const target = document.getElementById(semId);
      if (target) {
        const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
        target.scrollIntoView({ block: 'start', behavior });
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
      <button class="tab-btn ${state.activeSemester === 'all' ? 'active' : ''}" data-mob-sem="all" aria-pressed="${state.activeSemester === 'all'}">
        <span class="tab-label">All Semesters</span>
      </button>
    `;

    AcademicCatalog.SEMESTERS.forEach(sem => {
      const isWip = sem.status === 'in-progress';
      const isActive = state.activeSemester === sem.id;

      html += `
        <button class="tab-btn ${isActive ? 'active' : ''} ${isWip ? 'wip' : ''}" data-mob-sem="${sem.id}" aria-pressed="${isActive}">
          <span class="tab-label">${sem.name}</span>
          ${isWip ? `<span class="tag-progress">In progress</span>` : ''}
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
    const combined = fields.filter(Boolean).join(' ').replace(/[\u2013\u2014]/g, '-');
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
  function escapeHtml(text) {
    return text.replaceAll('&', '&amp;').replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;').replaceAll('"', '&quot;');
  }

  function renderSyllabus(syllabus) {
    return `
      <div class="syllabus-card-banner">
        <div class="syllabus-banner-left">
          <div class="syllabus-icon-box" aria-hidden="true">${ICONS.book}</div>
          <div class="syllabus-info">
            <h3>${escapeHtml(syllabus.title)}</h3>
            <p>${escapeHtml(syllabus.description)}</p>
          </div>
        </div>
        <a href="${GitHubSync.getRawUrl(syllabus.path)}" download target="_blank" rel="noopener noreferrer"
           aria-label="Download ${escapeHtml(syllabus.title)} PDF" class="btn-syllabus-download">
          ${ICONS.download} Download Syllabus PDF
        </a>
      </div>
    `;
  }

  function renderSubject(subject) {
    const available = Boolean(subject.combinedPdf);
    const working = subject.status === 'in-progress';
    const status = working ? 'In progress' : 'Pending';
    return `
      <article class="subject-item-card${available ? '' : ' subject-unavailable'}">
        <div>
          <div class="card-top-row">
            <span class="subject-code">${escapeHtml(subject.code)}</span>
            <span class="subject-category">${escapeHtml(subject.category)}</span>
          </div>
          <h3 class="subject-title">${escapeHtml(subject.name)}</h3>
        </div>
        <div class="subject-downloads">
          ${(!available || working) ? `<span class="availability-badge ${working ? 'availability-working' : ''}">${status}</span>` : ''}
          ${available ? `<a href="${GitHubSync.getRawUrl(`${subject.folder}/${subject.combinedPdf}`)}" download target="_blank" rel="noopener noreferrer"
             aria-label="Download ${escapeHtml(subject.name)} combined notes PDF" class="btn-download-combined">
            ${ICONS.download} Download Combined Notes PDF
          </a>` : ''}
        </div>
      </article>
    `;
  }

  function renderCatalogGroup(group, semester, regexTokens) {
    const context = [semester.name, semester.code, group.title, group.searchAliases];
    const syllabus = group.syllabusPdf;
    const showSyllabus = syllabus && matchesAnyField(
      [...context, syllabus.title, syllabus.description, 'syllabus'], regexTokens
    );
    const subjects = group.subjects.filter(subject => {
      const fields = [...context, subject.code, subject.name, subject.category];
      return matchesAnyField(fields, regexTokens) || subject.modules?.some(module =>
        matchesAnyField([...fields, module.name], regexTokens)
      );
    });
    const available = subjects.filter(subject => subject.combinedPdf);
    const upcoming = subjects.filter(subject => !subject.combinedPdf);
    if (!showSyllabus && !subjects.length) return '';

    return `
      <div class="catalog-group">
        ${showSyllabus ? renderSyllabus(syllabus) : group.title ? `<h3 class="curriculum-heading">${escapeHtml(group.title)}</h3>` : ''}
        ${available.length ? `<div class="subject-grid">${available.map(renderSubject).join('')}</div>` : ''}
        ${upcoming.length ? `
          <div class="upcoming-notes">
            <h3 class="curriculum-heading">Upcoming notes</h3>
            <div class="subject-grid">${upcoming.map(renderSubject).join('')}</div>
          </div>
        ` : ''}
        ${showSyllabus && group.emptyNote ? `<p class="curriculum-note">${escapeHtml(group.emptyNote)}</p>` : ''}
      </div>
    `;
  }

  function renderContentFeed() {
    if (!DOM.contentContainer) return;

    const regexTokens = buildSearchRegexTokens(state.searchQuery);
    const semesters = AcademicCatalog.SEMESTERS.filter(semester =>
      state.activeSemester === 'all' || state.activeSemester === semester.id
    );
    const sections = semesters.map(semester => {
      const groups = AcademicCatalog.getGroups(semester);
      const catalog = groups.map(group => renderCatalogGroup(group, semester, regexTokens)).join('');
      if (!catalog) return '';

      const count = groups.reduce((total, group) => total + group.subjects.filter(subject => subject.combinedPdf).length, 0);
      return `
        <section class="semester-block" id="${semester.id}">
          <div class="semester-header">
            <div class="header-left">
              <span class="sem-code-badge">${semester.code}</span>
              <h2 class="sem-title-text">${semester.name}</h2>
            </div>
            <div class="sem-meta-text">
              <span>${count} subject${count === 1 ? '' : 's'} available</span>
              ${semester.status === 'in-progress' ? '<span class="availability-badge availability-working">In progress</span>' : ''}
            </div>
          </div>
          ${catalog}
        </section>
      `;
    }).join('');

    DOM.contentContainer.innerHTML = sections || `
      <div class="catalog-empty">
        <h3>No matching resources</h3>
        <p>No notes or syllabi match &ldquo;${escapeHtml(state.searchQuery)}&rdquo; in the selected semester view.</p>
        <button id="resetSearchBtn" type="button" class="btn-download-combined">Reset search</button>
      </div>
    `;

    document.getElementById('resetSearchBtn')?.addEventListener('click', clearSearch);
  }

  function renderCatalogStats() {
    const { semestersWithNotes, totalSemesters, totalCombinedPdfs, totalModules } = AcademicCatalog.META.stats;
    document.getElementById('catalogSemesterCount').textContent = `${semestersWithNotes}/${totalSemesters}`;
    document.getElementById('catalogCombinedCount').textContent = totalCombinedPdfs;
    document.getElementById('catalogModuleCount').textContent = totalModules;
  }

  /**
   * License Modal Controller
   */
  let overlayScrollY = 0;

  function syncOverlayScrollLock() {
    const root = document.documentElement;
    const hasOpenOverlay = Boolean(DOM.licenseModal?.classList.contains('active') ||
      DOM.mobileMenuOverlay?.classList.contains('is-open'));
    if (hasOpenOverlay === root.classList.contains('overlay-scroll-locked')) return;

    if (hasOpenOverlay) {
      overlayScrollY = window.scrollY;
      root.style.setProperty('--overlay-scroll-top', `${-overlayScrollY}px`);
      root.classList.add('overlay-scroll-locked');
    } else {
      root.classList.remove('overlay-scroll-locked');
      root.style.removeProperty('--overlay-scroll-top');
      window.scrollTo({ top: overlayScrollY, behavior: 'instant' });
    }
  }

  function openLicenseModal() {
    if (DOM.licenseModal) {
      DOM.licenseModal.classList.add('active');
      syncOverlayScrollLock();
      const body = DOM.licenseModal.querySelector('.modal-body');
      if (body) body.scrollTop = 0;
    }
  }

  function closeLicenseModal() {
    if (DOM.licenseModal) {
      DOM.licenseModal.classList.remove('active');
      syncOverlayScrollLock();
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
        const sanitized = rawVal.replace(/[\u2013\u2014]/g, '-').replace(/[^a-zA-Z0-9\s\-_./]/g, '');
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
        openLicenseModal();
        closeMobileMenu();
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
    syncOverlayScrollLock();
  }

  function closeMobileMenu() {
    if (!DOM.mobileMenuOverlay) return;
    DOM.mobileMenuOverlay.classList.remove('is-open');
    DOM.mobileMenuOverlay.setAttribute('aria-hidden', 'true');
    if (DOM.hamburgerBtn) {
      DOM.hamburgerBtn.classList.remove('is-open');
      DOM.hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
    syncOverlayScrollLock();
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
    positionSearchBar();
    setupEventListeners();
    renderCatalogStats();
    handleUrlHash();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
