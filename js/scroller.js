

let activeIndex = 0;

function scroller() {
  let container = d3.select('body'),
      dispatch = d3.dispatch('active', 'progress'),
      sections = null,
      sectionPositions = [],
      currentIndex = -1,
      containerStart = 0;

  function scroll(els) {

    sections = els;
    d3.select(window)
      .on('scroll.scroller', position)
      .on('resize.scroller', resize);

    resize();

    var timer = d3.timer(function () {
      position();
      timer.stop();
    });
  }

  function resize() {

    sectionPositions = [];
    var startPos;
    sections.each(function (d, i) {
      var top = this.getBoundingClientRect().top;
      if (i === 0) {
        startPos = top;
      }
      sectionPositions.push(top - startPos);
    });
    containerStart = container.node().getBoundingClientRect().top + window.pageYOffset;
  }

  function position() {
    var pos = window.pageYOffset - 10 - containerStart;
    var sectionIndex = d3.bisect(sectionPositions, pos);
    sectionIndex = Math.min(sections.size() - 1, sectionIndex);

      if (currentIndex !== sectionIndex) {
        dispatch.call('active', this, sectionIndex);
          currentIndex = sectionIndex;
          activeIndex = currentIndex;
      }

    var prevIndex = Math.max(sectionIndex - 1, 0);
    var prevTop = sectionPositions[prevIndex];
    var progress = (pos - prevTop) / (sectionPositions[sectionIndex] - prevTop);

    dispatch.call('progress', this, currentIndex, progress);
  }

  scroll.container = function (value) {
    if (arguments.length === 0) {
      return container;
    }
    container = value;
    return scroll;
  };

  scroll.on = function (action, callback) {
    dispatch.on(action, callback);
  };

  return scroll;
}

var previous = "";

const smoothScrollTo = (target,hide) => {
  var sectionList = document.querySelectorAll("section");                                                  // Create an array with all sections
  previous = sectionList[activeIndex].id;                                                                  // Store current section ID
  document.getElementById('backarrow').style.display = "inline-block";                                     // Display "previous" arrow button
  document.getElementById(target).scrollIntoView({ behavior: 'smooth' });                                  // Scroll smoothly to target
  if (hide === true) {document.getElementById('backarrow').style.display = "none"};                        // If order comes from the "previous" arrow button, hide this button
};

const display = () => {

var scroll = scroller().container(d3.select('#graphic'));

var iframe = document.querySelector('iframe');
var iframeContent = iframe.contentWindow.document.body;
var source = document.getElementById('source');
scroll(d3.selectAll('.step'));

        scroll.on('active', function (index) {
                d3.selectAll('.step').style('opacity', function (d, i) { return i === index ? 1 : 0.1; });
                             
                              let sourceCredit = "Source/Credit: ";
                              var sectionList = document.querySelectorAll("section");
                              
                              switch (sectionList[index].id) {
                                case "introslide": 
                                          iframeContent.innerHTML = '<video id="video" loop autoplay muted onclick="this.paused ? this.play() : this.pause();" width="600px;"><source src="video/loop.mp4"  type="video/mp4"></video>';
                                          source.innerText = sourceCredit + "Wired - https://www.wired.com/story/wired-guide-to-crispr/";
                                      break;
                                case "foucagamb":  
                                iframeContent.innerHTML = '<img width="600px" src="img/agamben-foucault.png"/>';

                                      source.innerText = sourceCredit + "@photosource";
                                      break;
            
                                case "accident": 
                                iframeContent.innerHTML = '<img width="600px" src="img/virilio.jpg"/>';
                                source.innerText = sourceCredit + "@photosource";
                                      break;

                                case "plan": 
                                iframeContent.innerHTML = 
                                "<span style='font-family:sans-serif'><h2>I - L’édition du génome est une technique prométhéenne qui incarne le processus par lequel la science crée de nouveaux pouvoirs.</h2>"+
                                "<h3><i>A/ Effacer, ajouter, modifier l’ADN : entrer dans l’âge des nucléases<br>B/ De la technique à la science, de la science au pouvoir : biosphère et biopouvoir au XXIème siècle</i></h3>"+
                                "<h2>II – Les nucléases potentialisent fortement le génie génétique, alors que la plupart des Etats peinent à prendre à bras le corps la question du vivant en politique</h2>"+
                                "<h3><i>A/ Le développement des capacités scientifiques en génie génétique s’est brusquement accéléré avec CRISPR<br>B/ Tous les Etats ne sont pas égaux face à la nécessité de débattre du vivant</i></h3>"
                                +"</span>";
                                source.innerText = sourceCredit + "@photosource";
                                      break;

                                case "DNAexplainer": 
                                iframeContent.innerHTML = '<img height="450px" src="img/DNA_Nucleotides.jpg"/>';
                                source.innerText = sourceCredit + "OpenStax Anatomy and Physiology";
                                      break;
                                case "crisprXplainer": 
                                iframeContent.innerHTML = '<video id="video" loop="" autoplay="" muted="" onclick="this.paused ? this.play() : this.pause();" width="600px;"><source src="video/crisprExplainerloop.mp4"  type="video/mp4"></video>';
                                source.innerText = sourceCredit + "";
                                break;

                                case "anthropocene": 
                                iframeContent.innerHTML = '<video id="video" onclick="this.paused ? this.play() : this.pause();" width="600px;"><source src="video/latourAnthropocene.mp4"  type="video/mp4"></video>';
                                source.innerText = sourceCredit + "";
                                break;
                                
                                case "sacer": 
                                iframeContent.innerHTML = '<img width="600px" src="img/auschwitz-master-plan-fev42.jpg"/>';
                                source.innerHTML = sourceCredit + "Plan d'Auschwitz - février 1942 - utilisé en couverture de la première édition d'<i>Homo Sacer</i>";
                                break;

                              case "humanCRISPR": 
                              iframeContent.innerHTML = '<video id="video" loop="" autoplay="" muted="" onclick="this.paused ? this.play() : this.pause();" width="600px;"><source src="video/zaynertrailer.mp4"  type="video/mp4"></video>';
                              source.innerText = sourceCredit + "";
                              break;
            
                              };
                        });

        //scroll.on('progress', function (index, progress) {});
}

display();
