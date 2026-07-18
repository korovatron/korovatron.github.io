# korovatron.github.io

## App galleries

The homepage can show an optional `Gallery` button on any app tile. Gallery content is maintained in `images/galleries/gallery-data.json`, so you do not need to edit the homepage HTML when adding or removing screenshots.

To enable a gallery for an app:

1. Put the image files in `images/galleries/` or a subfolder such as `images/galleries/graphiti/`.
2. Add entries under the matching app title in `images/galleries/gallery-data.json`.
3. Leave the app array empty, or remove all entries, to hide the gallery button.

Example:

```json
{
	"Graphiti": [
		{
			"src": "images/galleries/graphiti/tangent-tools.png",
			"title": "Interactive tangent and normal tools",
			"alt": "Graphiti showing tangent and normal tools on a curve"
		},
		{
			"src": "images/galleries/graphiti/svg-export.png",
			"title": "Custom SVG export for worksheets",
			"alt": "Graphiti SVG export settings"
		}
	]
}
```

Each entry needs `src` and `title`. The `alt` field is optional but recommended.