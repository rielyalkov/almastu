export function open_floating(file, alt) {
  document.getElementById('floating').style.opacity = '1';
  document.getElementById('floating').style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  document.getElementById('floating').style.visibility = 'visible';
  document.getElementById('floating-image').setAttribute('src', file);
  document.getElementById('floating-alt').innerText = alt;
}
