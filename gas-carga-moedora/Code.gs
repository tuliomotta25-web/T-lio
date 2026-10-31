/**
 * Controle de Carga Moedora
 * Backend do Web App (Google Apps Script).
 *
 * Persistência via PropertiesService (Script Properties), compartilhada
 * entre todos os usuários que acessam o Web App. Cada propriedade aceita no
 * máximo ~9 KB, então valores grandes (ex.: histórico de medições) são
 * divididos em partes ("chunks") automaticamente.
 *
 * Chaves usadas pelo front-end:
 *   - mills-config          → configuração dos moinhos/câmaras
 *   - measurement-records   → registros de medição
 *   - corpos-moedores-ref   → tabela de referência dos corpos moedores
 */

var CHUNK_SIZE = 8000;

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Controle de Carga Moedora')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
}

/** Lê todas as chaves de uma vez (usado na carga inicial). */
function getAllData(keys) {
  var props = PropertiesService.getScriptProperties();
  var all = props.getProperties();
  var out = {};
  keys.forEach(function (key) {
    out[key] = readValue_(all, key);
  });
  return out;
}

function getData(key) {
  return readValue_(PropertiesService.getScriptProperties().getProperties(), key);
}

function setData(key, value) {
  var lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    var props = PropertiesService.getScriptProperties();
    var all = props.getProperties();
    var oldCount = Number(all[key + '__n'] || 0);

    var chunks = [];
    for (var i = 0; i < value.length; i += CHUNK_SIZE) {
      chunks.push(value.substring(i, i + CHUNK_SIZE));
    }
    if (!chunks.length) chunks.push('');

    var toSet = {};
    chunks.forEach(function (c, idx) { toSet[key + '__' + idx] = c; });
    toSet[key + '__n'] = String(chunks.length);
    props.setProperties(toSet, false);

    for (var j = chunks.length; j < oldCount; j++) {
      props.deleteProperty(key + '__' + j);
    }
    if (all[key] !== undefined) props.deleteProperty(key);
  } finally {
    lock.releaseLock();
  }
  return true;
}

function readValue_(all, key) {
  var n = Number(all[key + '__n'] || 0);
  if (!n) return all[key] !== undefined ? all[key] : null;
  var s = '';
  for (var i = 0; i < n; i++) s += all[key + '__' + i] || '';
  return s;
}

/** Utilitário opcional: rode no editor para apagar todos os dados salvos. */
function resetAllData() {
  PropertiesService.getScriptProperties().deleteAllProperties();
}
