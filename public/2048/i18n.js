export function resolveGameLocale({ search = '', referrer = '', origin = '', stored = '' } = {}) {
  const supported = (value) => value === 'it' || value === 'en';
  const requested = new URLSearchParams(search).get('lang');
  if (supported(requested)) return requested;
  try {
    const previous = new URL(referrer);
    const locale = previous.pathname.split('/')[1];
    if (previous.origin === origin && supported(locale)) return locale;
  } catch {}
  return supported(stored) ? stored : 'en';
}

export const messages = {
  en: {
    navigation: 'Navigation', back: '← All projects', eyebrow: 'The lab · Experiment 01',
    tagline: 'Small moves.\nNew possibilities.',
    intro: 'Merge matching tiles and build your next high score. One grid, four directions, one goal.',
    description: '2048, an interactive experiment by Pasquale Cerullo. Merge tiles and reach your next high score.',
    game: '2048 game', grid: '2048 grid', score: 'Score', best: 'Best', restart: 'New game ↗',
    continue: 'Continue', retry: 'Try again', helpTitle: 'How to play:',
    help: ' Use the arrow keys, WASD or swipe on the grid. Matching tiles merge when they touch.',
    lost: 'Game over!', won: 'You won!', cell: (r, c, value) => `Row ${r + 1}, column ${c + 1}: ${value}`,
  },
  it: {
    navigation: 'Navigazione', back: '← Tutti i progetti', eyebrow: 'Il laboratorio · Esperimento 01',
    tagline: 'Piccole mosse.\nNuove possibilità.',
    intro: 'Unisci due tessere uguali e costruisci il tuo prossimo record. Una griglia, quattro direzioni, un obiettivo.',
    description: '2048, un esperimento interattivo di Pasquale Cerullo. Unisci le tessere e raggiungi il tuo prossimo record.',
    game: 'Partita 2048', grid: 'Griglia 2048', score: 'Punti', best: 'Record', restart: 'Nuova partita ↗',
    continue: 'Continua', retry: 'Riprova', helpTitle: 'Come si gioca:',
    help: ' Usa le frecce della tastiera, WASD o scorri sulla griglia. Due tessere uguali si uniscono quando si toccano.',
    lost: 'Partita finita!', won: 'Hai vinto!', cell: (r, c, value) => `Riga ${r + 1}, colonna ${c + 1}: ${value}`,
  },
};
