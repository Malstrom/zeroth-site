/**
 * i18n.js — loader i18n condiviso per zeroth-site
 *
 * Convenzione data-page:
 *   - zeroth.html          → data-page="zeroth"  → ./i18n/{lang}.yml  (root, nessuna sottocartella)
 *   - framework pages      → data-page="developer" → ./i18n/developer/{lang}.yml
 *   - _templates/          → data-page="__template__" → non carica nulla
 *
 * Dipende da: js-yaml (CDN) caricato prima di questo script.
 * Espone: window.i18n.setLang(lang)
 */
(function () {
  'use strict';

  // ── Stato interno ──────────────────────────────────────────────────────────
  const root = document.documentElement;
  const page = root.dataset.page || '';

  // Rileva lingua iniziale: navigator oppure default EN
  let currentLang = (navigator.language || '').toLowerCase().startsWith('ru') ? 'ru' : 'en';

  // ── Costruzione path YAML ──────────────────────────────────────────────────
  function buildPath(lang) {
    if (!page || page === '__template__') return null;
    if (page === 'zeroth') return './i18n/' + lang + '.yml';
    return './i18n/' + page + '/' + lang + '.yml';
  }

  // ── Risoluzione chiave dot-notation ───────────────────────────────────────
  // es. "hero.eyebrow" → obj["hero"]["eyebrow"]
  function resolve(obj, key) {
    return key.split('.').reduce(function (acc, k) {
      return acc && acc[k] !== undefined ? acc[k] : null;
    }, obj);
  }

  // ── Popola DOM ─────────────────────────────────────────────────────────────
  function applyTranslations(dict) {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      const value = resolve(dict, key);
      if (value !== null && value !== undefined) {
        el.innerHTML = value;
      }
    });
    root.setAttribute('lang', currentLang);
  }

  // ── Fetch + parse YAML ────────────────────────────────────────────────────
  function loadLang(lang) {
    const path = buildPath(lang);
    if (!path) return; // __template__ o page vuoto: non caricare

    if (typeof jsyaml === 'undefined') {
      console.warn('[i18n] js-yaml non trovato. Assicurati di caricare il CDN prima di i18n.js.');
      return;
    }

    fetch(path)
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status + ' — ' + path);
        return res.text();
      })
      .then(function (text) {
        const parsed = jsyaml.load(text);
        // Il file ha chiave root "en" o "ru" → entra nel sotto-oggetto
        const dict = (parsed && parsed[lang]) ? parsed[lang] : parsed;
        applyTranslations(dict);
        updateLangToggle(lang);
      })
      .catch(function (err) {
        console.warn('[i18n] Impossibile caricare ' + path + ':', err.message);
      });
  }

  // ── Toggle lingua (UI) ────────────────────────────────────────────────────
  function updateLangToggle(lang) {
    const btn = document.querySelector('[data-lang-toggle]');
    if (btn) btn.textContent = lang === 'ru' ? 'RU / EN' : 'EN / RU';
  }

  // ── API pubblica ───────────────────────────────────────────────────────────
  window.i18n = {
    setLang: function (lang) {
      if (lang !== 'en' && lang !== 'ru') {
        console.warn('[i18n] Lingua non supportata:', lang);
        return;
      }
      currentLang = lang;
      loadLang(lang);
    },
    getLang: function () {
      return currentLang;
    }
  };

  // ── Init: collega toggle nel DOM ───────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    const langToggle = document.querySelector('[data-lang-toggle]');
    if (langToggle) {
      langToggle.addEventListener('click', function () {
        const next = currentLang === 'en' ? 'ru' : 'en';
        window.i18n.setLang(next);
      });
    }
    // Carica lingua iniziale
    loadLang(currentLang);
  });

})();
