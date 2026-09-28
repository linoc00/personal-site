import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { homedir } from 'node:os';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const defaultGuideRoot = resolve(
	projectRoot,
	'../AS_2026_2027/5MI_INFORMATICA/PHP_GUIDA_2/guida-quarto',
);
const guideRoot = resolve(process.argv[2] ?? defaultGuideRoot);
const outputRoot = resolve(guideRoot, '_book');
const destinationRoot = resolve(projectRoot, 'public/guida-php');
const userQuarto = resolve(homedir(), 'Applications/quarto/bin/quarto');
const quartoCommand = process.env.QUARTO_BIN ?? (existsSync(userQuarto) ? userQuarto : 'quarto');

if (!existsSync(resolve(guideRoot, '_quarto.yml'))) {
	throw new Error(`Progetto Quarto non trovato in: ${guideRoot}`);
}

console.log(`Genero la guida da ${guideRoot}`);
execFileSync(quartoCommand, ['render'], { cwd: guideRoot, stdio: 'inherit' });

if (
	!existsSync(resolve(outputRoot, 'index.html')) ||
	!existsSync(resolve(outputRoot, 'Guida-alla-programmazione-PHP.pdf'))
) {
	throw new Error('La generazione non ha prodotto sia index.html sia il PDF della guida.');
}

rmSync(destinationRoot, { recursive: true, force: true });
mkdirSync(destinationRoot, { recursive: true });
cpSync(outputRoot, destinationRoot, { recursive: true });

console.log(`Guida aggiornata in ${destinationRoot}`);
