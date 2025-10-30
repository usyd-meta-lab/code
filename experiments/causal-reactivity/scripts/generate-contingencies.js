/* 
===============================================================
=              TASK PARAMETERS              =
===============================================================
*/

  // Build exact joint counts for cue x outcome, then shuffle
  const joint = [];
  // Cloveritol + Recovery
  joint.push(
    ...Array.from({ length: cue_outcome }, () => ({ cue: "Cloveritol", outcome: "Recovery" }))
  );
  // Cloveritol + No Recovery
  joint.push(
    ...Array.from({ length: cue_noOutcome }, () => ({ cue: "Cloveritol", outcome: "No Recovery" }))
  );
  // No Treatment + Recovery
  joint.push(
    ...Array.from({ length: noCue_outcome }, () => ({ cue: "No Treatment", outcome: "Recovery" }))
  );
  // No Treatment + No Recovery
  joint.push(
    ...Array.from({ length: noCue_noOutcome }, () => ({ cue: "No Treatment", outcome: "No Recovery" }))
  );

  // Shuffle and expose timeline variables globally
  factors = jsPsych.randomization.shuffle(joint);

/* 
===============================================================
=              Checks              =
===============================================================
*/

// data: Array<Object>, rowKey: string, colKey: string
function crosstab(data, rowKey, colKey) {
  const rowLevels = [...new Set(data.map(d => d[rowKey]))];
  const colLevels = [...new Set(data.map(d => d[colKey]))];

  // init counts
  const counts = Object.fromEntries(
    rowLevels.map(r => [r, Object.fromEntries(colLevels.map(c => [c, 0]))])
  );

  // fill counts
  for (const d of data) {
    const r = d[rowKey];
    const c = d[colKey];
    if (r in counts && c in counts[r]) counts[r][c] += 1;
  }

  // pretty print with totals
  const body = rowLevels.map(r => {
    const total = colLevels.reduce((s, c) => s + counts[r][c], 0);
    return { [rowKey]: r, ...counts[r], Total: total };
  });
  const colTotals = Object.fromEntries(
    colLevels.map(c => [c, data.filter(d => d[colKey] === c).length])
  );
  const grandTotal = data.length;

  console.table([...body, { [rowKey]: "Total", ...colTotals, Total: grandTotal }]);
  return { rowLevels, colLevels, counts }; // raw counts if you need them
}

// ---- usage ----
if(is_DEBUG) crosstab(factors, "cue", "outcome"); // Cross tab for printing and piloting
