// One Line, One Chill — make.fun entry (u-azazex-one-line-one-chill-6d4d5488)
//
// Writes one single-line horror sentence to
// $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt),
// validates the competition gate (UTF-8, 1-200 chars, single line),
// then reads the file back and verifies it matches byte for byte.
//
// Node 22+, standard library only. Run with: node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My daughter's drawings stopped including me three weeks before she started calling the man in the attic 'Dad.'";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

// Gate: UTF-8 text, 1-200 characters, a single line, not only whitespace.
// Also reject leading/trailing whitespace: the file must hold exactly the
// line, with no padding the judge would read as filler.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 200) {
  fail(`entry is ${chars.length} characters, must be 1-200`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  fail("entry must be exactly one line");
}
if (ENTRY.trim().length === 0) {
  fail("entry must not be only whitespace");
}
if (ENTRY !== ENTRY.trim()) {
  fail("entry must not start or end with whitespace");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");

// Read back and verify byte-identical output.
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY) {
  fail("verification failed: entry.txt does not match the entry");
}

console.log(`wrote ${outPath} (${chars.length} chars)`);
console.log(written);
