fetch('background.html')
.then(response => response.text())
.then(data => {
  document.querySelector('#background').innerHTML = data;
});