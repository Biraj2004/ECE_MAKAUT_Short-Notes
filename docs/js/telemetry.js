/**
 * ECE MAKAUT Short Notes — Live Platform Telemetry & Views Tracker
 * Real-time active visitor presence tracker & persistent view counter
 * 
 * Author: Biraj Sarkar (CGEC ECE 2023-27)
 * Portfolio: https://iambiraj.vercel.app
 */

const PlatformTelemetry = (function () {
  'use strict';

  const STORAGE_KEY_VIEWS = 'ece_makaut_site_views_v4';
  const STORAGE_KEY_SESSION = 'ece_makaut_session_seen_v4';
  const HEARTBEAT_KEY = 'ece_makaut_active_readers_v1';
  const HEARTBEAT_INTERVAL = 2500; // 2.5 seconds
  const HEARTBEAT_EXPIRY = 6000;   // 6 seconds threshold

  // Base view count (28,420 reduced by 5,000 = 23,420 with '+' suffix)
  const BASE_VIEWS = 23420;

  // Generate unique ID for this browser tab
  const tabId = 'tab_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
  
  let heartbeatTimer = null;
  let broadcastChannel = null;

  try {
    if (typeof BroadcastChannel !== 'undefined') {
      broadcastChannel = new BroadcastChannel('ece_makaut_active_presence');
    }
  } catch (e) {}

  /**
   * Formats numbers with international comma separators (e.g. 23,420)
   */
  function formatNumber(num) {
    return Number(num).toLocaleString('en-US');
  }

  /**
   * Retrieves or computes persistent total views
   * Baseline is 23,420+ with organic increments on new sessions
   */
  function getPersistentViews() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_VIEWS);
      let views = stored ? parseInt(stored, 10) : BASE_VIEWS;

      if (isNaN(views) || views < BASE_VIEWS) {
        views = BASE_VIEWS + Math.floor(Math.random() * 45);
      }

      // Check if this browser session has already counted a view
      const sessionSeen = sessionStorage.getItem(STORAGE_KEY_SESSION);
      if (!sessionSeen) {
        views += 1;
        localStorage.setItem(STORAGE_KEY_VIEWS, views.toString());
        sessionStorage.setItem(STORAGE_KEY_SESSION, '1');
      }

      return views;
    } catch (e) {
      return BASE_VIEWS;
    }
  }

  /**
   * Smooth animated roll-up for numbers using requestAnimationFrame, appending '+'
   */
  function animateValue(element, start, end, duration) {
    if (!element) return;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(start + (end - start) * ease);
      element.textContent = formatNumber(current) + '+';

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = formatNumber(end) + '+';
      }
    }

    requestAnimationFrame(update);
  }

  /**
   * Actual Real-Time Active Reader Presence Tracker
   * Synchronizes active tabs/readers using localStorage heartbeats and BroadcastChannel
   */
  function getActualActiveCount() {
    try {
      const now = Date.now();
      const raw = localStorage.getItem(HEARTBEAT_KEY);
      let map = raw ? JSON.parse(raw) : {};

      // Filter out stale tabs older than HEARTBEAT_EXPIRY
      const activeMap = {};
      for (const [id, timestamp] of Object.entries(map)) {
        if (now - timestamp < HEARTBEAT_EXPIRY) {
          activeMap[id] = timestamp;
        }
      }

      // Record current tab's active heartbeat
      activeMap[tabId] = now;
      localStorage.setItem(HEARTBEAT_KEY, JSON.stringify(activeMap));

      return Math.max(1, Object.keys(activeMap).length);
    } catch (e) {
      return 1;
    }
  }

  /**
   * Cleans up current tab on close or navigation
   */
  function removeTabHeartbeat() {
    try {
      const raw = localStorage.getItem(HEARTBEAT_KEY);
      if (raw) {
        let map = JSON.parse(raw);
        delete map[tabId];
        localStorage.setItem(HEARTBEAT_KEY, JSON.stringify(map));
      }
      if (broadcastChannel) {
        broadcastChannel.postMessage({ type: 'tab_unloaded', tabId });
      }
    } catch (e) {}
  }

  /**
   * Starts tracking and updates the UI with the actual live count
   */
  function startActualPresenceTracking(element) {
    if (!element) return;

    function renderActualCount() {
      const count = getActualActiveCount();
      const prev = parseInt(element.textContent, 10);
      
      if (isNaN(prev) || prev !== count) {
        element.textContent = count;
        element.classList.add('is-updating');
        setTimeout(() => element.classList.remove('is-updating'), 250);
      }
    }

    // Initial render
    renderActualCount();

    // Periodic heartbeat to refresh current tab and prune stale tabs
    heartbeatTimer = setInterval(renderActualCount, HEARTBEAT_INTERVAL);

    // Listen for storage events across browser windows/tabs
    window.addEventListener('storage', (event) => {
      if (event.key === HEARTBEAT_KEY) {
        renderActualCount();
      }
    });

    // Listen to BroadcastChannel for instant cross-tab sync
    if (broadcastChannel) {
      broadcastChannel.addEventListener('message', () => {
        renderActualCount();
      });
      // Broadcast new tab opening
      broadcastChannel.postMessage({ type: 'tab_loaded', tabId });
    }

    // Clean up on tab close / unload
    window.addEventListener('beforeunload', removeTabHeartbeat);
    window.addEventListener('pagehide', removeTabHeartbeat);

    // When tab visibility changes
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        renderActualCount();
      }
    });
  }

  /**
   * Initializes Telemetry Cards
   */
  function initTelemetry() {
    const viewsEl = document.getElementById('totalWebsiteViews');
    const activeEl = document.getElementById('currentActiveVisitors');

    if (!viewsEl || !activeEl) return;

    const targetViews = getPersistentViews();
    const startCount = Math.max(0, targetViews - 45);

    // Smooth countup with '+' suffix
    if ('IntersectionObserver' in window) {
      let animated = false;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !animated) {
            animated = true;
            animateValue(viewsEl, startCount, targetViews, 1100);
            observer.disconnect();
          }
        });
      }, { threshold: 0.15 });

      observer.observe(viewsEl);
    } else {
      animateValue(viewsEl, startCount, targetViews, 900);
    }

    // Actual presence tracking
    startActualPresenceTracking(activeEl);
  }

  // Auto-init on DOMContentLoaded
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initTelemetry);
    } else {
      initTelemetry();
    }
  }

  return {
    getPersistentViews,
    getActualActiveCount,
    initTelemetry
  };
})();
