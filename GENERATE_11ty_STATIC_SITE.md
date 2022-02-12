# Generating a static site with 11ty

11ty is a very flexible static site generator, with loads of different templating and layout options. Below are some instructions to get you started but check the [11ty docs](https://www.11ty.dev/docs/getting-started/) for further customisation.

## To create the 11ty starter
1. Create a file name `.eleventy.js` at the root of your project
1. Start with some basic config:
    ```
        const GIGSBOAT_INPUT_DIR = 'gigsboat-eleventy-starter'

        module.exports = function(eleventyConfig) {
            const markdownIt = require('markdown-it')
            const options = { html: true }

            eleventyConfig.setLibrary('md', markdownIt(options).use(require('markdown-it-anchor'), { permalink: false }))

            eleventyConfig.addPassthroughCopy(`${GIGSBOAT_INPUT_DIR}/styles.css`)

            return {
                dir: { input: GIGSBOAT_INPUT_DIR }
            }
        }
    ```
1. Create a directory `gigsboat-eleventy-starter` where your 11ty starter files will live
1. In the `gigsboat-eleventy-starter` directory create a file `index.json` and declare your layout file name
`{ "layout": "gigsboat-layout" }`
1. Create a file `` and add some basic css
    ```
    :root {
        --nightrider-gray: #333;
        --white-smoke: #eee;
        --blue: #0ff;
        --cornflower-blue: #539bf5;
    }

    @media (prefers-color-scheme: light) {
        :root {
            --color-bg: var(--white-smoke);
            --color-text: var(--nightrider-gray);
            --color-link: var(--cornflower-blue);
        }
        }
        @media (prefers-color-scheme: dark) {
        :root {
            --color-bg: var(--nightrider-gray);
            --color-text: var(--white-smoke);
            --color-link: var(--cornflower-blue);
        }
    }

    * {
        box-sizing: border-box;
    }

    html,
    body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, system-ui, sans-serif;
        color: var(--color-text);
        background-color: var(--color-bg);
    }

    main {
        max-width: calc(900px - (20px * 2));
        margin: 0 auto;
        padding-right: 20px;
        padding-left: 20px;
    }

    p:last-child {
        margin-bottom: 0;
    }

    a {
    color: var(--color-link);
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    table {
        border-collapse: collapse;
    }

    table td,
    table th {
        border: 1px solid var(--color-text);
        padding: 5px;
        text-align: left;
    }
    ```
1. Create a new directory named `_includes` (this is the default name where 11ty looks for layout files) and in that directory create a file named `gigsboat-layout.liquid`
1. In the `gigsboat-layout.liquid` file add the code for a basic template and edit as you wish.
    ```
    ---
    title: Public Speaking
    ---
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>{{ title }}</title>
        {% if description %}
        <meta name="description" content="{{description}}" />
        {% endif %}

        <link rel="stylesheet" href="styles.css" />

    </head>

    <body>
        <main>
            <!-- This is where the contents of the generated README will be -->
            {% block content %}
            {{ content }}
            {% endblock %}
        </main>
    </body>
    </html>
    ```
That's it! Your gigsboat 11ty starter is ready

## To generate the html
After you run `npx @gigsboat/cli` and your markdown file is generated

Run
```bash
cp README.md gigsboat-eleventy-starter/index.md
npx @11ty/eleventy
```

The above will copy your generated README file into the  `gigsboat-eleventy-starter` directory and then run 11ty to generate your html.

Your newly generated html and css files will be in a new directory rceated by 11ty named  `_site`. If desired you can define a different output directory name in *.eleventy.js*