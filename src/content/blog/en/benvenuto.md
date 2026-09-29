---
title: "Welcome to my blog"
description: "A guide for writing and publishing your first articles."
pubDate: "Sep 18 2026"
lang: "en"
---

Welcome! This is the guide for publishing your articles on the blog.

## How to write a new post

Create a `.md` (or `.mdx`) file in `src/content/blog/en/`. The frontmatter supports the following fields:

| Field         | Description                       |
| ------------- | --------------------------------- |
| `title`       | Article title                     |
| `description` | Summary used on cards and for SEO |
| `pubDate`     | Publication date                  |
| `lang`        | Article language: `it` or `en`    |
| `heroImage`   | (optional) Cover image            |
| `updatedDate` | (optional) Last update date       |

A minimal example (`src/content/blog/en/my-first-post.md`):

```md
---
title: "My first post"
description: "Short description."
pubDate: "Sep 18 2026"
lang: "en"
---

Article content in Markdown...
```

## English versions

For the English version, create a file with the **same name** in `src/content/blog/en/` and set `lang: 'en'`, so the two posts share the same URL:

- `src/content/blog/it/my-first-post.md`
- `src/content/blog/en/my-first-post.md`

They will be available at `/it/blog/my-first-post/` and `/en/blog/my-first-post/`. When a translation is missing, the site shows the text in the other language while keeping navigation in the selected language.

Happy writing!
