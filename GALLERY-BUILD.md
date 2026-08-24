# Gallery Build Notes

## When to run the build

Run `node build-gallery.js` whenever you:
- Add, remove, or change images in `images/galleries/gallery-data.json`
- Change the page layout or JS in `gallery/index-template.html`

## How to run it

Open a terminal in VS Code at the workspace root and run:

```
node build-gallery.js
```

It completes instantly and prints a confirmation line, e.g.:
`Built gallery/index.html — 13 apps, 101 images`

## Then

1. Preview the gallery locally
2. `git add gallery/index.html images/galleries/gallery-data.json`
3. `git commit` and `git push`

## Important

- **Edit `gallery/index-template.html`** for layout/CSS/JS changes
- **Edit `images/galleries/gallery-data.json`** for image data changes
- **Never edit `gallery/index.html` directly** — it is overwritten by the build script
- If you add a new app to `gallery-data.json`, also add it to `appMeta` in both `gallery/index-template.html` AND `build-gallery.js`
