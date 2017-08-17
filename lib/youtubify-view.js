'use babel';

export default class youtubifyView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('youtubify');

    // Create message element
    var message = document.createElement('input');
    message.classList.add('user-input');
    message.classList.add('native-key-bindings');
    message.id = "query";
    message.type = "text";
    this.element.appendChild(message);


    var container = document.createElement('div');
    container.id = "ytcontainer";
    container.style.cssText = "position:relative;display:inline; height : 32px; width:100px;"
    statusbar = document.getElementsByClassName('status-bar-left')[0];
    statusbar.appendChild(container);

    button = document.createElement('a');
    button.innerHTML = 'Search ';
    button.classList.add("btn");
    button.style.cssText = "margin-left: 10px;";
    button.onclick = function(){

                    url = 'https://www.googleapis.com/youtube/v3/search';
                    part = 'snippet';
                    key = 'AIzaSyDAKDaBy_JDwcScSHqDQimOOLjdPImLanc';
                    q = document.getElementById('query').value;

                    url += "?part="+ part;
                    url += "&key=" + key;
                    url += "&q=" + q;

                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.send( null );
                xhr.onload = function (data) {
                  document.getElementById("ytresults").innerHTML = "";



                      var entries = JSON.parse(xhr.responseText).items
                      var ol = document.createElement('ol');
                      ol.id = 'ytresultsol';
                      document.getElementById('ytresults').appendChild(ol);
                      for (i= 0; i< 5; i++)
                      {
                            var title = entries[i].snippet.title;
                            var desc = entries[i].snippet.description;
                            var thumbnail = entries[i].snippet.thumbnails.default.url;
                            var list = document.createElement('ol');
                            list.classList.add("result-container")
                            list.innerHTML = "<img src=" + thumbnail+ "><yttitle style='display:inline;'>" + title + "</yttitle>"+
                            "<ytdescription style='display:block;'>" + desc+ "</ytdescription>";
                            list.id = entries[i].id.videoId;

                            list.onclick = function() {
                              document.getElementById("ytcontainer").innerHTML = "";
                              var player = document.createElement('div');
                              player.classList.add("ytvideo");
                              player.style.cssText = "position:absolute;height:32px; display:inline; top:-125px;"
                              src = "https://www.youtube.com/embed/" + this.id + "?autoplay=1";
                              player.innerHTML = "<iframe width='150' frameborder='0' heigth='150' src='" + src +"'></iframe>";
                              document.getElementById("ytcontainer").appendChild(player);

                            }
                            document.getElementById('ytresultsol').appendChild(list);


                      }



                }
              }

    this.element.appendChild(button);
    resultsbox = document.createElement('div');
    resultsbox.id = 'ytresults';
    this.element.appendChild(resultsbox);
}



  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
