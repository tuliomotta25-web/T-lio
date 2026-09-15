/**
 * Teste de Moagem — Moinho de Cimento 02
 * Backend do Web App (Google Apps Script).
 *
 * Persistência via PropertiesService (Script Properties), compartilhada
 * entre todos os usuários que acessam o Web App — equivalente ao
 * armazenamento único usado na versão HTML original.
 */

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Teste de Moagem — Moinho de Cimento 02');
}

function getData(key) {
  return PropertiesService.getScriptProperties().getProperty(key);
}

function setData(key, value) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    PropertiesService.getScriptProperties().setProperty(key, value);
  } finally {
    lock.releaseLock();
  }
  return true;
}
