// Receives quiz results from the Attachment Style Quiz and appends one row per submission.
// Setup: Google Sheet > Extensions > Apps Script > paste this > Deploy > New deployment >
// Web app, Execute as: Me, Who has access: Anyone > copy the Web app URL into SHEET_URL in index.html.

const HEADERS = [
  "Timestamp", "Location", "Result", "Secondary leaning",
  "Secure", "Anxious", "Avoidant", "Fearful",
  "Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10", "Q11", "Q12"
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    }

    const d = JSON.parse(e.postData.contents);
    const c = d.counts || {};
    const answers = (d.answers || []).slice(0, 12);
    while (answers.length < 12) answers.push("");

    sheet.appendRow([
      new Date(),
      String(d.location || "Unknown").slice(0, 200),
      String(d.result || "").slice(0, 100),
      String(d.secondary || "").slice(0, 100),
      Number(c.secure) || 0,
      Number(c.anxious) || 0,
      Number(c.avoidant) || 0,
      Number(c.fearful) || 0,
      ...answers.map(a => String(a).slice(0, 50))
    ]);

    return ContentService.createTextOutput("ok");
  } catch (err) {
    return ContentService.createTextOutput("error");
  } finally {
    lock.releaseLock();
  }
}
