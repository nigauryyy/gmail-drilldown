(function() {
  var labels = (function() {
    var elems = document.querySelectorAll("div.ar.as > div.at");
    var hash_labels = {}
    for (var i = 0; i < elems.length; i++) {
      var label = elems[i].attributes["title"].nodeValue;
      if (!(label in hash_labels)) {
        hash_labels[label] = 0;
      }
      hash_labels[label]++;
    }

    var ret = [];
    for (var h in hash_labels) {
      ret.push({
        "title": h,
        "value": hash_labels[h]
      })
    }
    ret.sort(function(a, b) {
      if (a.value > b.value) return -1;
      if (a.value < b.value) return 1;
      return 0;
    });

    return ret;
  })();

  var filter_label = function(title, value) {
    var escape_title = title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");

    var a = document.createElement("a");

    a.href = location.hash + encodeURIComponent(" l:" + (title=="受信トレイ"?"inbox":title.replace(/ /g, "-")));
    a.innerHTML = escape_title + " (" + value + ")";
    a.style = "margin:0 5px"
    return a;
  }

  var old_hrefs = document.querySelectorAll("#gbqfw > a");
  for (var i = 0; i < old_hrefs.length; i++){
    old_hrefs[i].remove();
  }

  var base = document.querySelector("#gbqfw");
  for (var i = 0; i < labels.length; i++) {
    base.appendChild(filter_label(labels[i].title, labels[i].value));
  }
})();

