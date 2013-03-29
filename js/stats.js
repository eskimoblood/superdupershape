define(function() {
  var stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.bottom = '0px';
  stats.domElement.style.right = '0px';
  document.getElementById("container").appendChild(stats.domElement);
  return stats;
});