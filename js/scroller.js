

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
                                iframeContent.innerHTML = '';
                                source.innerText = sourceCredit + "@photosource";
                                      break;

                                case "DNAexplainer": 
                                iframeContent.innerHTML = '<img width="600px" src="img/DNA_Nucleotides.jpg"/>';
                                source.innerText = sourceCredit + "OpenStax Anatomy and Physiology";
                                      break;
                                case "crisprXplainer": 
                                iframeContent.innerHTML = '<video id="video" loop="" autoplay="" muted="" onclick="this.paused ? this.play() : this.pause();" width="600px;"><source src="video/crisprExplainerloop.mp4"  type="video/mp4"></video>';
                                      source.innerText = sourceCredit + "";
                                      break;
            
                                case 4: //PornVsReality
                                      iframe.src = "img/soska117meme.png";
                                      source.innerText = sourceCredit + "@soska_117 - Instagram / edited by Guillaume Levrier";
                                      break;
            
                                case 5: //NationBuilder
                                      iframe.src = "https://nationbuilder.com/";
                                      source.innerText = sourceCredit + "nationbuilder.com";
                                      break;
            
                                case 6: //MeToo
                                      iframe.src = "img/timecoversilencebreakers.png";
                                      source.innerText = sourceCredit + "Time’s Person of the Year issue 2017";
                                      break;
                                case 7: //Cash
                                      iframe.src = "https://www.nytimes.com/interactive/2018/01/27/technology/social-media-bots.html";
                                      source.innerText = sourceCredit + "NICHOLAS CONFESSORE, GABRIEL J.X. DANCE, RICHARD HARRIS and MARK HANSEN - 27/01/2018 - The New York Times";
                                      break;
                                case 8: //meta
                                      iframe.src = "blank.html";
                                      source.innerText = "";
                                      break;
            
                                case 9: //findingData
                                      iframe.src = "img/china-surveillance-ai.jpg";
                                      source.innerText = sourceCredit + "REUTERS/Bobby Yip";
                                      break;
            
                                case 10: //ShedANewLight
                                      iframe.src = "  https://lemonde.fr/mmpub/edt/zip/2018/06/26/134110911-93bc7e170115d2edd843aef16eaf6a7eaedb6248/index.html";
                                      source.innerText = sourceCredit + "Le Monde/Les Décodeurs, Agathe Dahyot, Pierre Breteau et Adrien Sénécat";
                                      break;
            
                                case 11: //Squad system
                                      iframe.src = "ncase-crowds/index.html";
                                      source.innerText = sourceCredit + "Nicky Case (@ncase) -  https://ncase.me/crowds/";
                                      break;
            
                                case 12: //Grades
                                      iframe.src = "grades.html";
                                      source.innerText =  "";
                                      break;
            
                                case 13: //Rules
                                      iframe.src = "rules.html";
                                      source.innerText = sourceCredit + "Sciences Po";
                                      break;
            
                                case 14: //Final remarks
                                      iframe.src = "https://www.youtube.com/embed/IOkHL8CC1y4?autoplay=1&mute=1#modestbranding=1&controls=0";
                                      source.innerText = sourceCredit + "Baron Noir - Kwaï/Studiocanal";
                                      break;
            
                              };
                        });

        //scroll.on('progress', function (index, progress) {});
}

display();
