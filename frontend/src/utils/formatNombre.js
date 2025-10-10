export function formatNombre(nombre) {
  if (nombre >= 1_000_000_000) {
    return (nombre / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'Md';
  } else if (nombre >= 1_000_000) {
    return (nombre / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  } else if (nombre >= 1_000) {
    return (nombre / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
  } else {
    return nombre.toString();
  }
}
