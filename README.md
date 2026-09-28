# Sito personale — Pasquale Cerullo

Portfolio bilingue e spazio didattico realizzato con Astro. Il sito raccoglie progetti,
esperienza, articoli e materiali per gli studenti. La ricerca globale si apre con
`Cmd + K` su macOS e `Ctrl + K` su Windows/Linux.

## Comandi

```sh
npm install
npm run check
npm run build
```

Per lavorare in locale, il server va avviato in background:

```sh
npx astro dev --background
npx astro dev status
npx astro dev logs
npx astro dev stop
```

## Aggiungere un materiale didattico

I materiali sono gestiti dalla collection `materials`. Crea un file Markdown in
`src/content/materials/it/` e, quando disponibile, la sua versione inglese in
`src/content/materials/en/`.

```md
---
title: 'Titolo della risorsa'
description: 'Descrizione breve e utile per studenti e ricerca.'
lang: 'it'
category: 'Programmazione web'
format: 'guide'
level: 'Secondaria di secondo grado'
topics: ['PHP', 'Web']
href: '/percorso-risorsa/'
downloadHref: '/percorso/file.pdf'
updatedDate: '2026-09-28'
featured: false
order: 2
---
```

I formati accettati sono `guide`, `notes`, `exercise`, `slides` e `video`. Le risorse
vengono inserite automaticamente nella pagina Didattica e nell'indice della ricerca.

## Aggiungere un articolo

Crea un file `.md` o `.mdx` in `src/content/blog/it/` oppure
`src/content/blog/en/`. Il frontmatter richiede titolo, descrizione, data e lingua.
Gli articoli vengono aggiunti automaticamente alla pagina Appunti e alla ricerca.

## Aggiornare la guida PHP

```sh
npm run update:guide
```

Il comando rigenera il progetto Quarto e copia il risultato in `public/guida-php`.
È possibile passare un percorso diverso al progetto sorgente:

```sh
npm run update:guide -- "/percorso/della/guida-quarto"
```

La versione HTML è disponibile in `/guida-php/`; il PDF in
`/guida-php/Guida-alla-programmazione-PHP.pdf`.

## Struttura principale

- `src/components/`: componenti riutilizzabili dell'interfaccia.
- `src/content/blog/`: articoli bilingui.
- `src/content/materials/`: catalogo dei materiali didattici.
- `src/data/portfolio.ts`: profilo, progetti, competenze ed esperienza.
- `src/i18n/`: testi dell'interfaccia e utilità per italiano e inglese.
- `src/pages/[locale]/`: pagine e route localizzate.
- `public/guida-php/`: output statico della guida Quarto.

## Pubblicazione

Il sito è statico. `npm run build` genera la cartella `dist`, pronta per un hosting
statico. Prima di ogni pubblicazione eseguire `npm run check` e `npm run build`.
