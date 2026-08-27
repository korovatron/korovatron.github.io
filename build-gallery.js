'use strict';
// Run with: node build-gallery.js
// Reads gallery-data.json + gallery/index-template.html -> writes gallery/index.html
const fs = require('fs');
const path = require('path');

// Must be kept in sync with appMeta in gallery/index-template.html
const appMeta = {
    'Graphiti': {
        colorClass: 'green', url: '/graphiti/', icon: '/images/icons/graphitiIcon.png',
        description: 'Feature screenshots for Graphiti - the free graphing tool that automatically detects turning points, asymptotes, integrals, tangents and more. For GCSE and A Level maths.',
        firstImage: 'https://www.korovatron.co.uk/images/galleries/graphiti/parameterSliders.png',
    },
    'Komplexiti': {
        colorClass: 'neon', url: '/komplexiti/', icon: '/images/icons/complexiti.png',
        description: 'Feature screenshots for Komplexiti - the free Argand diagram app for A Level Further Maths. Plot complex loci, roots of unity, inequalities and more.',
        firstImage: 'https://www.korovatron.co.uk/images/galleries/komplexiti/complexInequalities.png',
    },
    'Vectorama': {
        colorClass: 'orange', url: '/vectorama/', icon: '/images/icons/vectorama.png',
        description: 'Feature screenshots for Vectorama - the free linear algebra tool for A Level maths. Explore vectors, matrices, transformations and eigenvalues in 2D and 3D.',
        firstImage: 'https://www.korovatron.co.uk/images/galleries/vectorama/MatrixIdentification.png',
    },
    'Trimension': {
        colorClass: 'purple', url: '/trimension/', icon: '/images/icons/trimensionIcon.png',
        description: 'Feature screenshots for Trimension - the free 3D geometry tool for GCSE and A Level maths. Build composite solids and explore 3D Pythagoras and trigonometry.',
        firstImage: 'https://www.korovatron.co.uk/images/galleries/trimension/addItems.png',
    },
    'The Crate Escape': {
        colorClass: 'green', url: '/crate_escape/', icon: '/images/icons/crateEscapeIcon.png',
        description: 'Feature screenshots for The Crate Escape - the free Sokoban-style puzzle game with over 1200 levels, progress syncing, LURD move replay, and built-in level editor.',
        firstImage: 'https://www.korovatron.co.uk/images/galleries/the-crate-escape/intro.png',
    },
    'Gyrograf': {
        colorClass: 'blue', url: '/gyrograf/', icon: '/images/icons/gyrograf.png',
        description: 'Feature screenshots for Gyrograf - the free interactive Spirograph-style drawing app. Experiment with rings and wheels to create intricate geometric patterns.',
        firstImage: 'https://www.korovatron.co.uk/images/galleries/gyrograf/intro.png',
    },
    'Haskish': {
        colorClass: 'orange', url: '/haskish/', icon: '/images/icons/haskishIcon.png',
        description: 'Feature screenshots for Haskish - the free Haskell-style functional programming playground for AQA A Level Computer Science. No installation or sign-in required.',
        firstImage: 'https://www.korovatron.co.uk/images/galleries/haskish/functionalProgrammingAQA.png',
    },
    'Chewring': {
        colorClass: 'blue', url: '/chewring/', icon: '/images/icons/chewRingLogo.png',
        description: 'Feature screenshots for Chewring - the free Turing machine simulator for A Level Computer Science. Create, simulate and share multi-tape Turing machines.',
        firstImage: 'https://www.korovatron.co.uk/images/galleries/chewring/intro.png',
    },
    'Syntaxor': {
        colorClass: 'purple', url: '/syntaxor/', icon: '/images/icons/syntaxor.png',
        description: 'Feature screenshots for Syntaxor - the free Backus-Naur Form (BNF) playground for A Level Computer Science. Build grammar rules, test strings, and visualise parse trees.',
        firstImage: 'https://www.korovatron.co.uk/images/galleries/syntaxor/intro.png',
    },
    'Boolinator': {
        colorClass: 'yellow', url: '/boolinator/', icon: '/images/icons/boolinator.png',
        description: 'Feature screenshots for Boolinator - the free Boolean algebra practice tool for GCSE and A Level Computer Science. Simplify expressions step by step and generate worksheets.',
        firstImage: 'https://www.korovatron.co.uk/images/galleries/boolinator/intro.png',
    },
    'Encodr': {
        colorClass: 'green', url: '/encodr/', icon: '/images/icons/encodrIcon.png',
        description: 'Feature screenshots for Encodr - the free Data Representation tool for GCSE and A Level Computer Science. Explore number bases, binary arithmetic, bitmap images, compression and more.',
        firstImage: 'https://www.korovatron.co.uk/images/galleries/encodr/intro.png',
    },
    'SQL Academy': {
        colorClass: 'blue', url: '/sql_academy/', icon: '/images/icons/sqlAcademyIcon.png',
        description: 'Feature screenshots for SQL Academy - the free SQL practice tool for GCSE and A Level Computer Science. Master database queries, data manipulation, and SQL syntax with 44 structured exercises.',
        firstImage: 'https://www.korovatron.co.uk/images/galleries/sql-academy/intro.png',
    },
    'Mandelscope': {
        colorClass: 'purple', url: '/mandelscope/', icon: '/images/icons/mandelscopeIcon.png',
        description: 'Feature screenshots for Mandelscope - the free interactive fractal viewer. Explore the Mandelbrot and Julia sets with deep GPU zoom and perturbation theory.',
        firstImage: 'https://www.korovatron.co.uk/images/galleries/mandelscope/intro.png',
    },
};

const preferredOrder = ['Graphiti', 'Komplexiti', 'Vectorama', 'Trimension'];

function esc(str) {
    return (str || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const galleryData = JSON.parse(fs.readFileSync(path.join(__dirname, 'images/galleries/gallery-data.json'), 'utf8'));

const appNames = [
    ...preferredOrder.filter(n => Array.isArray(galleryData[n]) && galleryData[n].length),
    ...Object.keys(galleryData).filter(n => !preferredOrder.includes(n) && Array.isArray(galleryData[n]) && galleryData[n].length),
];

const sectionsHtml = appNames.map(appName => {
    const items = galleryData[appName];
    const meta = appMeta[appName] ?? { colorClass: 'blue', url: '/', icon: '' };
    const cc = meta.colorClass;
    const sectionId = appName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const figures = items.map(item => `
                    <figure class="gallery-figure fig-${cc}">
                        <div class="img-wrap">
                            <button class="img-btn" type="button"
                                    data-src="/${esc(item.src)}"
                                    data-alt="${esc(item.alt || item.title)}"
                                    data-caption="${esc(item.title)}"
                                    data-app="${esc(appName)}"
                                    aria-label="View full size: ${esc(item.title)}">
                                <img class="gallery-img"
                                     src="/${esc(item.src)}"
                                     alt="${esc(item.alt || item.title)}"
                                     loading="lazy">
                            </button>
                        </div>
                        <figcaption>${esc(item.title)}</figcaption>
                    </figure>`).join('');

    const iconHtml = meta.icon
        ? `<img class="app-icon" src="${esc(meta.icon)}" alt="" aria-hidden="true" width="40" height="40">`
        : '';

    return `
                    <section class="app-section" id="${sectionId}" aria-labelledby="heading-${sectionId}">
                        <div class="app-header c-${cc}">
                            ${iconHtml}
                            <h2 class="app-heading c-${cc}" id="heading-${sectionId}">${esc(appName)}</h2>
                            <a class="launch-link c-${cc}" href="${esc(meta.url)}">Launch ${esc(appName)}</a>
                        </div>
                        <div class="gallery-grid">${figures}</div>
                    </section>`;
}).join('');

const template = fs.readFileSync(path.join(__dirname, 'gallery/index-template.html'), 'utf8');
const output = template.replace('<!-- %%GALLERY_CONTENT%% -->', sectionsHtml);
fs.writeFileSync(path.join(__dirname, 'gallery/index.html'), output, 'utf8');

const totalImages = appNames.reduce((sum, n) => sum + galleryData[n].length, 0);
console.log(`Built gallery/index.html — ${appNames.length} apps, ${totalImages} images`);
