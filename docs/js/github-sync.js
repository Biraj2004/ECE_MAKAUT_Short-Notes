/**
 * ECE MAKAUT Short Notes - GitHub Sync & Link Provider
 * Maps repository filepaths to live GitHub raw and web URLs
 * 
 * Author: Biraj Sarkar (CGEC ECE 2023-27)
 * Repository: https://github.com/Biraj2004/ECE_MAKAUT_Short-Notes
 */

const GitHubSync = (function () {
  'use strict';

  const CONFIG = {
    owner: 'Biraj2004',
    repo: 'ECE_MAKAUT_Short-Notes',
    branch: 'main',
    // Base URLs
    rawBase: 'https://raw.githubusercontent.com',
    blobBase: 'https://github.com',
    releaseBase: 'https://github.com'
  };

  /**
   * Safely URI-encodes a repo-relative path, preserving slashes
   * Handles spaces and special characters like & in file/folder names
   */
  function encodePath(relativePath) {
    if (!relativePath) return '';
    return relativePath
      .split('/')
      .map(part => encodeURIComponent(part))
      .join('/');
  }

  /**
   * Generates the direct raw GitHub download URL for the latest PDF on 'main'
   * @param {string} relativePath - Path from repo root, e.g. "6th SEM/01. Control System/EC601_Control_System.pdf"
   */
  function getRawUrl(relativePath) {
    if (!relativePath) return '#';
    const cleanPath = relativePath.replace(/^\/+/, '');
    return `${CONFIG.rawBase}/${CONFIG.owner}/${CONFIG.repo}/${CONFIG.branch}/${encodePath(cleanPath)}`;
  }

  /**
   * Generates the GitHub web viewer (blob) URL
   * @param {string} relativePath - Path from repo root
   */
  function getBlobUrl(relativePath) {
    if (!relativePath) return '#';
    const cleanPath = relativePath.replace(/^\/+/, '');
    return `${CONFIG.blobBase}/${CONFIG.owner}/${CONFIG.repo}/blob/${CONFIG.branch}/${encodePath(cleanPath)}`;
  }

  /**
   * Generates URL suitable for in-page iframe embedding or PDF.js viewer
   * Note: Raw GitHub served with application/pdf header works directly in modern browser PDF iframes!
   */
  function getViewerUrl(relativePath) {
    return getRawUrl(relativePath);
  }

  /**
   * Generates a local fallback URL (relative to docs/ directory)
   * Useful when running offline in local environment
   */
  function getLocalFallbackUrl(relativePath) {
    if (!relativePath) return '#';
    const cleanPath = relativePath.replace(/^\/+/, '');
    return `../${cleanPath}`;
  }

  /**
   * Fetches latest commit metadata and total commit count from GitHub API
   * Uses localStorage cache with 5-minute TTL to stay well within unauthenticated rate limits (60/hr).
   */
  async function fetchRepoCommitStats() {
    const CACHE_KEY = 'ece_makaut_gh_commit_stats_v1';
    const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

    // 1. Try active cache first for instant render
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_TTL) {
          return parsed.data;
        }
      }
    } catch (e) {
      // localStorage disabled or unavailable
    }

    // 2. Fetch fresh stats from GitHub API
    try {
      const url = `https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}/commits?per_page=1&sha=${CONFIG.branch}`;
      const res = await fetch(url, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (!res.ok) {
        // Fallback to stale cache if API failed (e.g. rate limit)
        const stale = localStorage.getItem(CACHE_KEY);
        if (stale) return JSON.parse(stale).data;
        return null;
      }

      const commits = await res.json();
      if (!Array.isArray(commits) || commits.length === 0) return null;

      const latestSha = commits[0].sha ? commits[0].sha.substring(0, 7) : null;
      const latestMsg = commits[0].commit?.message || '';

      // Parse total commits count from Link header rel="last"
      let totalCommits = null;
      const linkHeader = res.headers.get('link') || res.headers.get('Link');
      if (linkHeader) {
        const match = linkHeader.match(/[?&]page=(\d+)[^>]*>;\s*rel="last"/);
        if (match && match[1]) {
          totalCommits = parseInt(match[1], 10);
        }
      }

      const result = {
        latestSha: latestSha || 'a3ea4d9',
        totalCommits: totalCommits || 108,
        latestMsg: latestMsg.split('\n')[0]
      };

      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          data: result
        }));
      } catch (e) {}

      return result;
    } catch (err) {
      try {
        const stale = localStorage.getItem(CACHE_KEY);
        if (stale) return JSON.parse(stale).data;
      } catch (e) {}
      return null;
    }
  }

  /**
   * Initializes and populates the live GitHub commit badge button in the hero stats row
   */
  async function initCommitBadge() {
    const countEl = document.getElementById('ghCommitCount');
    const hashEl = document.getElementById('ghCommitHash');
    const btnEl = document.getElementById('heroGithubBtn');

    if (!btnEl && !countEl && !hashEl) return;

    // Apply immediate cached values to eliminate UI flash
    try {
      const cached = localStorage.getItem('ece_makaut_gh_commit_stats_v1');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.data) {
          if (countEl && parsed.data.totalCommits) countEl.textContent = parsed.data.totalCommits;
          if (hashEl && parsed.data.latestSha) hashEl.textContent = parsed.data.latestSha;
          if (btnEl && parsed.data.latestMsg) {
            btnEl.title = `Latest commit on main: "${parsed.data.latestMsg}" (${parsed.data.latestSha}) · Click to open GitHub`;
          }
        }
      }
    } catch (e) {}

    // Fetch fresh stats in background and update DOM
    const stats = await fetchRepoCommitStats();
    if (stats) {
      if (countEl && stats.totalCommits) {
        countEl.textContent = stats.totalCommits;
      }
      if (hashEl && stats.latestSha) {
        hashEl.textContent = stats.latestSha;
      }
      if (btnEl && stats.latestMsg) {
        btnEl.title = `Latest commit on main: "${stats.latestMsg}" (${stats.latestSha}) · Click to open GitHub`;
      }
    }
  }

  // Auto-initialize when document is ready
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initCommitBadge);
    } else {
      initCommitBadge();
    }
  }

  return {
    CONFIG,
    encodePath,
    getRawUrl,
    getBlobUrl,
    getViewerUrl,
    getLocalFallbackUrl,
    fetchRepoCommitStats,
    initCommitBadge
  };
})();

// Export for module or global use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GitHubSync;
}
