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

  return {
    CONFIG,
    encodePath,
    getRawUrl,
    getBlobUrl,
    getViewerUrl,
    getLocalFallbackUrl
  };
})();

// Export for module or global use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GitHubSync;
}
