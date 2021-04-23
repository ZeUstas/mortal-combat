export function getRandNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

export function zeroPad(str) {
  return +str < 10 ? `0${str}` : str;
}

export function createElement(tag, className) {
  const $element = document.createElement(tag);
  if (className) {
    $element.classList.add(className);
  }
  return $element;
}

export function showElement(element) {
  element.style.display = 'block';
}

