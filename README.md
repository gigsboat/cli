<p align="center"><h1 align="center">
  @gigsboat/cli
</h1>

<p align="center">
  Do you have a boatload of speaking gigs?
  <br/>
  Use the <strong>gigsboat</strong> CLI to manage them all via GitHub in the open source way!
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/gigsboat/cli/master/.github/gigsboat-2.png" height="160" />
</p>

<p align="center">
  <a href="https://www.npmjs.org/package/@gigsboat/cli"><img src="https://badgen.net/npm/v/@gigsboat/cli" alt="npm version"/></a>
  <a href="https://www.npmjs.org/package/@gigsboat/cli"><img src="https://badgen.net/npm/license/@gigsboat/cli" alt="license"/></a>
  <a href="https://www.npmjs.org/package/@gigsboat/cli"><img src="https://badgen.net/npm/dt/@gigsboat/cli" alt="downloads"/></a>
  <a href="https://github.com/gigsboat/cli/actions?workflow=CI"><img src="https://github.com/gigsboat/cli/workflows/CI/badge.svg" alt="build"/></a>
  <a href="https://codecov.io/gh/gigsboat/cli"><img src="https://badgen.net/codecov/c/github/gigsboat/cli" alt="codecov"/></a>
  <a href="https://snyk.io/test/github/gigsboat/cli"><img src="https://snyk.io/test/github/gigsboat/cli/badge.svg" alt="Known Vulnerabilities"/></a>
  <a href="./SECURITY.md"><img src="https://img.shields.io/badge/Security-Responsible%20Disclosure-yellow.svg" alt="Responsible Disclosure Policy" /></a>
</p>

# The Hook

Track your speaking activities all within your GitHub opensource repository!

Here is how [I'm doing it](https://github.com/lirantal/public-speaking):

![](https://github.com/gigsboat/cli/blob/main/.github/gigsboat-screenshot.png)


# About

- Are you a Developer Advocate 🥑 ?
- Enjoy doing conference talks, meetups presentations, or joining a podcast?
- Do you have a boatload of speaking gigs? 

Gigsboat is for you becasue:
- It is difficult for you to keep track of all of your gigs
- You want some stats and hard cold data for all of your speaking engagements

Welcome to gigsboat ⛵️ 🎉

## Why gigsboat?

Even more reasons to use Gigsboat:

- **You own your data** - do you use a 3rd-party app, or tool to manage your talks? Maybe a Trello board? With gigsboat, you own and manage your data via YAML files, and gigsboat is here to help you transform that into a beautiful Markdown page.

- **It's all open source** - Well, gigsboat is open source but also all of your speaking activities, they're all open source and all managed right here in GitHub where it's easy to manage your talks, just like you manage your code projects. It's all transparent and you can share it with your friends, conference organizers, and so on.

- **Zero config** - just run the CLI tool and it'll automatically detect source files, and generate a Markdown document for you with all of them.

- **Statistics** - gigsboat runs some numbers crunching and gives you stats about your speaking engagements!

# How does it work?

1. You run the CLI
2. It finds your events' data files
3. It parses them into JSON
4. It extracts, and sorts the data in all kinds of way
5. Exports the JSON into Markdown format
6. Results are printed to STDOUT or to a `README.md` file
7. You now have a fancy looking Markdown document that lists all of your events

# How to get started?

## Option 1: Zero-to-Hero in a heartbeat!

We have a template repository for you to get started in a matter of seconds! 🚤

Head over to the [gigs-template](https://github.com/gigsboat/gigs-template) repository which we created as a template for you to quickly get started. It's just a few steps, and you can start tracking all of your speaking engagements.

If you would like to know the gritty details of how the gigsboat CLI works, continue to read for the _starting from scratch_ section.

## Option 2: Starting from scratch

If you're just getting started tracking your events and you don't have any actual data files that hold the history of your events (or your upcoming events), then this section is for you.

It boils down to the following:
1. You need a directory structure (any structure you choose) with data files inside it
2. Those data files need to be in [YAML Front Matter format](https://docs.zettlr.com/en/core/yaml-frontmatter/#:~:text=A%20YAML%20frontmatter%20is%20a,%2C%20keywords%2C%20and%20the%20title.&text=They%20contain%20valid%20YAML%20and%20can%20be%20used%20to%20define%20arbitrary%20variables.). Those YAML files need to have a specific format.

Now, let's break it down further to give you example code you can get started with.

### 1. Directory structure

You are probably going to manage it all via a repository, so once you have one created, here's a suggested directory structure:

```
- gigsboat.json
- pages
   |
    - 2020
       |
        - 2020-02-03.md
        - 2020-06-03.md
    - 2021
       |
        - 2021-11-26.md
```

In the above we are nesting all of the data files under `pages/<year>/` directories.

You are free to create whatever directory structure that makes sense for you, but note that `gigsboat` will by default search the data files under the `pages` root directory in which it runs.

The `gigsboat.json` file is used as a configuration file for the gigsboat cli. 

Note: the data filenames can be anything. In this example, it shows a simple date format of `yyyy-mm-dd` however that may not always work - for example, when you have two speaking engagements (a podcast recording, and a meetup talk) on the same day. That said, the filename doesn't matter at all, and you can then follow a convention, of say, `2021-11-26-2.md` which adds a suffix of incrementing numbers to the day.

### 2. YAML Front Matter 

The data files are markdown, but they need to have the following YAML Front Matter format:

```md
---
date: 2019-05-30
tags: post
name: OWASP Global AppSec
url: https://telaviv.appsecglobal.org/
type: conference
title: Black Clouds Silver Linings In Nodejs Security
slides_url: https://drive.google.com/file/d/1s0YIvnlF7ByoESu3rHV2i5M9_jQSXjyR/view
recording_url: https://www.youtube.com/watch?v=4XdF4OiAAzU&feature=emb_logo&ab_channel=OWASP
city: Tel Aviv
country: Israel
country_code: IL
language: English
recognitions:
  twitter:
    - https://twitter.com/_r3ggi/status/1134057317538942978
image_header: https://pbs.twimg.com/media/D7z7G5dXsAA3ulw?format=jpg&name=small
images:
  - https://pbs.twimg.com/media/D7z7G5dXsAA3ulw?format=jpg&name=small
---
```

For brevity, the above also includes example values to each of the field so that the schema for the data files is easily understood. 

You can save this data file as say `2019-05-30.md` in your `pages/` directory somewhere. As you can see, there's a dedicated `date` field, which `gigsboat` will parse and is the reason that the filename convention doesn't actually matter.

You might wonder why is this referred to as a markdown file? because the front matter piece of it all the YAML structure between the opening and closing `---`, after which, it can have a markdown-formatted content, so you can treat it as a markdown document for any purpose. Some ideas: you may want to capture your own personal notes of that event, maybe add pictures, add your summary and so on.

#### type property

There are currently 6 supported values for the `type` property within the YAML Front Matter.  The gigsboat cli will count how many of each of these exist, and create a badge with that count on the generated README.md file.

These values are:

* conference
* podcast
* webinar
* meetup
* article
* workshop

It is possible to use any free form text in the type property, however, when these aren't matched against the above, they will be counted in a fallback type called 'other'.

### gigsboat.json

This is the configuration file for the gigsboat CLI.  This contains four sections:

* `input`
  * `sourceDirectory` - this is the relative path to the directory in which the data files for the generated file are located
* `output`
  * `markdownFile` - this is the name of the file that should be generated
* `preContent` - a collection of raw or formatted HTML to place at the start of the generated file
* `postContent` - a collection of raw or formatted HTML to place at the end of the generated file

A complete example of this configuration file:

```json
{
  "input": {
    "sourceDirectory": "pages"
  },
  "output": {
    "markdownFile": "README-gigs.md"
  },
  "preContent": [
    {
      "raw": "<p align='center'><h1 align='center'>This will appear at the top of the generated README.md file</h1>"
    },
    {
      "raw": "<p align='center'>Let's add some badges! <p align='center'><a href='https://twitter.com/liran_tal'><img alt='Twitter Follow' src='https://img.shields.io/twitter/follow/liran_tal?style=social'></a></p>"
    },
    {
      "format": [
        {
          "ul": [
            "In addition to raw HTML elements, you can use format sections",
            "Using HTML elements to construct the output"
          ]
        }
      ]
    }
  ],
  "postContent": [
    {
      "raw": "<p align='center'><h1 align='center'>This will appear at the bottom of the generated README.md file</h1>"
    }
  ]
}
```

## I already track events via YAML / Markdown

Use the `gigsboat` CLI to manage them all!

Use npm's built-in `npx` command to fetch, install, and run gigsboat with no configuration on your current project:

```bash
npx @gigsboat/cli
```

## Generating a static site
You can use several static site generators to output an html from the generated README.md file. Using jekyll, is great if you want to deploy to github pages. But if you're looking to deploy somewhere else, you might want to use a different tool like [11ty](https://www.11ty.dev/). We have created a guide in [GENERATE_11ty_STATIC_SITE.md](GENERATE_11ty_STATIC_SITE.md) to get you started.

# Contributing

Please consult [CONTRIBUTING](./CONTRIBUTING.md) for guidelines on contributing to this project.

# Author

**@gigsboat/cli** © [Liran Tal](https://github.com/lirantal), Released under the [Apache-2.0](./LICENSE) License.
