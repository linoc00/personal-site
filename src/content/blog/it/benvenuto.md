---
title: "Benvenuto sul mio blog"
description: "Una guida per scrivere e pubblicare i tuoi primi articoli."
pubDate: "Sep 18 2026"
lang: "it"
---

Benvenuto! Questa è la guida per pubblicare i tuoi articoli sul blog.

## Come scrivere un nuovo post

Crea un file `.md` (o `.mdx`) in `src/content/blog/it/`. Il frontmatter supporta questi campi:

| Campo         | Descrizione                                |
| ------------- | ------------------------------------------ |
| `title`       | Titolo dell'articolo                       |
| `description` | Riepilogo usato nelle card e nella SEO     |
| `pubDate`     | Data di pubblicazione                      |
| `lang`        | La lingua del post: `it` o `en`            |
| `heroImage`   | (opzionale) Immagine di copertina          |
| `updatedDate` | (opzionale) Data dell'ultimo aggiornamento |

Un esempio minimale (`src/content/blog/it/il-mio-primo-post.md`):

```md
---
title: "Il mio primo post"
description: "Breve descrizione."
pubDate: "Sep 18 2026"
lang: "it"
---

Contenuto dell'articolo in Markdown...
```

## Versioni in inglese

Per la versione inglese, crea un file con lo **stesso nome** in `src/content/blog/en/` e imposta `lang: 'en'`, così i due post condividono lo stesso URL:

- `src/content/blog/it/il-mio-primo-post.md`
- `src/content/blog/en/il-mio-primo-post.md`

Entrambi saranno raggiungibili rispettivamente su `/blog/il-mio-primo-post/` in ogni lingua. Il sito mostra solo i post della lingua selezionata.

Buona scrittura!
