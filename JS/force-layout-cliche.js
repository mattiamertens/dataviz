// File for comparing

$('#project_label').on('click', function () {
  $(this).toggleClass('on-focus')
  $('.project_filters').toggleClass('closed')
  $('.arrow1').toggleClass('rotate')
});

$('#position_label').on('click', function () {
  $(this).toggleClass('on-focus')
  $('.position_filters').toggleClass('closed')
  $('.arrow2').toggleClass('rotate')
});

// Multi choice filtering
const project = ['Aria', 'Co-Inventing Doria', 'Green Between', "L'innesto", 'Lambrate Streaming', 'Loreto Open Community', 'Milano City Door', 'MoLeCoLa', 'Scalo di Porta Romana', 'Sei Milano', 'Torre Botanica', 'Vitae']
const plane = [1, 2, 3]

const width = d3.select("#force-layout").node().offsetWidth;
const height = d3.select("#force-layout").node().offsetHeight;
const svg = d3.select("#force-layout")
  .append("svg")
  .attr("viewBox", `0 0 ${width} ${height}`);

const simulation_t = d3
  .forceSimulation()
  .force("x", d3.forceX())
  .force("y", d3.forceY())
  .force("collide", d3.forceCollide().radius(d => 10))
  .force("charge", d3.forceManyBody().strength(-25))
  .on("tick", ticked);

//.stop()

function ticked() {
  // console.log(simulation.alpha())
  node.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
}

// positions
const cluster = d3.scalePoint().range([0, width]);
const _positions = function (c, xORy) {
  const positions = {
    S00: { x: -2*width, y: -2*height },
    S01: { x: 0.40*width, y: 0.65*height },
    S02: { x: 0.15*width, y: 0.67*height },
    S03: { x: 0.15*width, y: 0.25*height },
    S04: { x: 0.18*width, y: 0.50*height },
    S05: { x: 0.79*width, y: 0.65*height },
    S06: { x: 0.38*width, y: 0.47*height },
    S07: { x: 0.40*width, y: 0.30*height },
    S08: { x: 0.50*width, y: 0.57*height },
    S09: { x: 0.63*width, y: 0.30*height },
    S10: { x: 0.70*width, y: 0.49*height },
    S11: { x: 0.82*width, y: 0.25*height },
    S12: { x: 0.50*width, y: 0.38*height },
    S13: { x: 0.60*width, y: 0.50*height },
    S15: { x: 0.78*width, y: 0.45*height },
    S16: { x: 0.27*width, y: 0.60*height },
    S17: { x: 0.27*width, y: 0.45*height },
    S19: { x: 0.72*width, y: 0.27*height },
    S20: { x: 0.28*width, y: 0.33*height },
    S21: { x: 0.65*width, y: 0.65*height },
  };
  return positions[c][xORy]
};

let node = svg.selectAll(".sprite");



function update(data) {
  node = node.data(data, (d) => d.id);
  node.exit().remove();
  node = node.enter().append("g").merge(node);
  node
    .append("image")
    .attr("width", "25")
    .attr("height", "25")
    .attr("href", (d) => "./assets/data/SPRITE/" + d.name + ".png")
    .attr("data-project", d => d.project)
    .attr('data-name', d => d.name)
    .attr('data-stereotype', d => d.stereotype)
    


    // Label
    // var filteredLabel = filterJSONLab(data, 'project', 'label')
    // console.log(filteredLabel)

    // label = label.data(filteredLabel, (d) => d.id);
    // label.exit().remove();
    // label = label.enter().append("g").merge(label);
    // label
    //   .append("image")
    //   .attr("width", "100")
    //   .attr("height", "50")
    //   .attr("href", (d) => "./assets/data/SPRITE/" + d.name + ".png")
    //   .attr("data-project", d => d.project)
    //   .attr('data-name', d => d.name)
    //   .attr('data-stereotype', d => d.stereotype)



  // node
  //   .append("text")
  //   .text((d) => d.id)
  //   .classed("label", true)
  //   .style("font-size", "10px")
  //   .style("text-anchor", "middle")


  // OPEN MODAL WINDOW
	$('g').on('mouseover', function(){
    // alert('adcd')
    var project = $(this).children().attr('data-project')
    var name = $(this).children().attr('data-name')
    var stereotype = $(this).children().attr('data-stereotype')

    $('.prova').removeClass('visibility-toggle')
    .append("text") 
    .text(project + name + stereotype)

  });
  $('g').on('mouseleave', function(){
    $('.prova').addClass('visibility-toggle')
  })


  simulation_t.nodes(data);
  simulation_t.force("x").x((d) => _positions(d.stereotype,"x"));
  simulation_t.force("y").y((d) => _positions(d.stereotype,"y"));
  // simulation_t.force("x").x(d=>d._x)
  // simulation_t.force("y").y(d => cluster(d.stereotype))
  simulation_t.alpha(1);
  simulation_t.restart();
}

// var zoom = d3.zoom()
//       .scaleExtent([1, 4])
//       .on('zoom', function(event) {
//           svg.attr('transform', event.transform);
//       console.log('AAA')
// });
// svg.call(zoom);


data = d3.json("./assets/data/data-id.json").then((data) => {
  
  update(data)

  function filterJSON(data, key, value) {
    var result = [];

    for (var i in data) {
      if (data[i][key] === value) {
        result.push(data[i]);
      }
    }
    return result;
  }



  var ariaC = false;
  var doriaC = false;
  var greenbC = false;
  var innestoC = false;
  var lambrateC = false;
  var loretoC = false;
  var citydC = false;
  var molecolaC = false;
  var romanaC = false;
  var seimC = false;
  var torrebC = false;
  var vitaeC = false;

  // Aria
  var filteredAria = filterJSON(data, "project", "Aria")
  
  $('#button_aria').on('click', function () {
    ariaC = true;
    // console.log(ariaC)
    update(filteredAria)
    $('.html-change-project').text($(this).text())
    // newArray = filteredAria.map(data => ({ value: data.disposition }));
    // console.log(newArray)
  })

  // Co-inventing Doria
  var filteredDoria = filterJSON(data, "project", "Co-inventing Doria");

  $('#button_co-inventing_doria').on('click', function () {
    doriaC = true;
    update(filteredDoria)
    $('.html-change-project').text($(this).text())
  })
  
  // GB Crescenzago
  var filteredCrescenzago = filterJSON(data, "project", "Green Between");

  $('#button_green_between').on('click', function () {
    greenbC = true;
    update(filteredCrescenzago)
    $('.html-change-project').text($(this).text())
  })
  
  // Innesto
  var filteredInnesto = filterJSON(data, "project", "L'innesto");

  $('#button_l_innesto').on('click', function () {
    innestoC = true;
    update(filteredInnesto)
    $('.html-change-project').text($(this).text())
  })

  //Lambrate
  var filteredLambrate = filterJSON(data, "project", "Lambrate Streaming");

  $('#button_lambrate_streaming').on('click', function () {
    lambrateC = true;
    update(filteredLambrate)
    $('.html-change-project').text($(this).text())
  })
  
  //Loreto
  var filteredLoreto = filterJSON(data, "project", "Loreto Open Community");

  $('#button_loreto_open_community').on('click', function () {
    loretoC = true;
    update(filteredLoreto)
    $('.html-change-project').text($(this).text())
  })
  
  //City Door
  var filteredCityD = filterJSON(data, "project", "Milano City Door");
  
  $('#button_milano_city_door').on('click', function () {
    citydC = true;
    update(filteredCityD)
    $('.html-change-project').text($(this).text())
  })
  
  //Molecola
  var filteredMolecola = filterJSON(data, "project", "MoLeCoLa");
  
  $('#button_molecola').on('click', function () {
    molecolaC = true;
    update(filteredMolecola)
    $('.html-change-project').text($(this).text())
  })
  
  // P. Romana
  var filteredPRomana = filterJSON(data, "project", "Scalo di Porta Romana");
  
  $('#button_scalo_di_porta_romana').on('click', function () {
    romanaC = true;
    update(filteredPRomana)
    $('.html-change-project').text($(this).text())
  })
  
  // Sei Milano
  var filtered6Milano = filterJSON(data, "project", "Sei Milano");
  
  $('#button_sei_milano').on('click', function () {
    seimC = true;
    update(filtered6Milano)
    $('.html-change-project').text($(this).text())
  })
  
  // Torre Botanica
  var filteredTorre = filterJSON(data, "project", "Torre Botanica");
  
  $('#button_torre_botanica').on('click', function () {
    torrebC = true;
    update(filteredTorre)
    $('.html-change-project').text($(this).text())
  })
  
  // Vitae
  var filteredVitae = filterJSON(data, "project", "Vitae");
  
  $('#button_vitae').on('click', function () {
    vitaeC = true;
    update(filteredVitae)
    $('.html-change-project').text($(this).text())
  })
  


  // Background
  var filteredBg = filterJSON(data, "disposition", 3);
  $('#button_background').on('click', function () {
    if(ariaC == true){
      mioArray = data.filter(d => d.disposition ==3 && d.project == 'Aria')
      update(mioArray)
    }
    else if(doriaC == true){
      mioArray = data.filter(d => d.disposition ==3 && d.project == 'Co-inventing Doria')
      update(mioArray)
    }
    else if(greenbC == true){
      mioArray = data.filter(d => d.disposition ==3 && d.project == 'Green Between')
      update(mioArray)
    }
    else if(innestoC == true){
      mioArray = data.filter(d => d.disposition ==3 && d.project == "L'innesto")
      update(mioArray)
    }
    else if(lambrateC == true){
      mioArray = data.filter(d => d.disposition ==3 && d.project == 'Lambrate Streaming')
      update(mioArray)
    }
    else if(loretoC == true){
      mioArray = data.filter(d => d.disposition ==3 && d.project == 'Loreto Open Community')
      update(mioArray)
    }
    else if(citydC == true){
      mioArray = data.filter(d => d.disposition ==3 && d.project == 'Milano City Door')
      update(mioArray)
    }
    else if(molecolaC == true){
      mioArray = data.filter(d => d.disposition ==3 && d.project == 'MoLeCoLa')
      update(mioArray)
    }
    else if(romanaC == true){
      mioArray = data.filter(d => d.disposition ==3 && d.project == 'Scalo di Porta Romana')
      update(mioArray)
    }
    else if(seimC == true){
      mioArray = data.filter(d => d.disposition ==3 && d.project == 'Sei Milano')
      update(mioArray)
    }
    else if(torrebC == true){
      mioArray = data.filter(d => d.disposition ==3 && d.project == 'Torre Botanica')
      update(mioArray)
    }
    else if(vitaeC == true){
      mioArray = data.filter(d => d.disposition ==3 && d.project == 'Vitae')
      update(mioArray)
    }

    else{
      update(filteredBg)
      $('.html-change-position').text($(this).text())
    }
  })

  // Middle ground
  var filteredMg = filterJSON(data, "disposition", 2);
  $('#button_middleground').on('click', function () {
    if(ariaC == true){
      mioArray = data.filter(d => d.disposition ==2 && d.project == 'Aria')
      update(mioArray)
    }
    else if(doriaC == true){
      mioArray = data.filter(d => d.disposition ==2 && d.project == 'Co-inventing Doria')
      update(mioArray)
    }
    else if(greenbC == true){
      mioArray = data.filter(d => d.disposition ==2 && d.project == 'Green Between')
      update(mioArray)
    }
    else if(innestoC == true){
      mioArray = data.filter(d => d.disposition ==2 && d.project == "L'innesto")
      update(mioArray)
    }
    else if(lambrateC == true){
      mioArray = data.filter(d => d.disposition ==2 && d.project == 'Lambrate Streaming')
      update(mioArray)
    }
    else if(loretoC == true){
      mioArray = data.filter(d => d.disposition ==2 && d.project == 'Loreto Open Community')
      update(mioArray)
    }
    else if(citydC == true){
      mioArray = data.filter(d => d.disposition ==2 && d.project == 'Milano City Door')
      update(mioArray)
    }
    else if(molecolaC == true){
      mioArray = data.filter(d => d.disposition ==2 && d.project == 'MoLeCoLa')
      update(mioArray)
    }
    else if(romanaC == true){
      mioArray = data.filter(d => d.disposition ==2 && d.project == 'Scalo di Porta Romana')
      update(mioArray)
    }
    else if(seimC == true){
      mioArray = data.filter(d => d.disposition ==2 && d.project == 'Sei Milano')
      update(mioArray)
    }
    else if(torrebC == true){
      mioArray = data.filter(d => d.disposition ==2 && d.project == 'Torre Botanica')
      update(mioArray)
    }
    else if(vitaeC == true){
      mioArray = data.filter(d => d.disposition ==2 && d.project == 'Vitae')
      update(mioArray)
    }
    else{
      update(filteredMg)
      $('.html-change-position').text($(this).text())
    }
  })
  
  // Foreground
  var filteredFg = filterJSON(data, "disposition", 1);
  $('#button_foreground').on('click', function () {
    if(ariaC == true){
      mioArray = data.filter(d => d.disposition ==1 && d.project == 'Aria')
      update(mioArray)
    }
    else if(doriaC == true){
      mioArray = data.filter(d => d.disposition ==1 && d.project == 'Co-inventing Doria')
      update(mioArray)
    }
    else if(greenbC == true){
      mioArray = data.filter(d => d.disposition ==1 && d.project == 'Green Between')
      update(mioArray)
    }
    else if(innestoC == true){
      mioArray = data.filter(d => d.disposition ==1 && d.project == "L'innesto")
      update(mioArray)
    }
    else if(lambrateC == true){
      mioArray = data.filter(d => d.disposition ==1 && d.project == 'Lambrate Streaming')
      update(mioArray)
    }
    else if(loretoC == true){
      mioArray = data.filter(d => d.disposition ==1 && d.project == 'Loreto Open Community')
      update(mioArray)
    }
    else if(citydC == true){
      mioArray = data.filter(d => d.disposition ==1 && d.project == 'Milano City Door')
      update(mioArray)
    }
    else if(molecolaC == true){
      mioArray = data.filter(d => d.disposition ==1 && d.project == 'MoLeCoLa')
      update(mioArray)
    }
    else if(romanaC == true){
      mioArray = data.filter(d => d.disposition ==1 && d.project == 'Scalo di Porta Romana')
      update(mioArray)
    }
    else if(seimC == true){
      mioArray = data.filter(d => d.disposition ==1 && d.project == 'Sei Milano')
      update(mioArray)
    }
    else if(torrebC == true){
      mioArray = data.filter(d => d.disposition ==1 && d.project == 'Torre Botanica')
      update(mioArray)
    }
    else if(vitaeC == true){
      mioArray = data.filter(d => d.disposition ==1 && d.project == 'Vitae')
      update(mioArray)
    }
    else{
      update(filteredFg)
      $('.html-change-position').text($(this).text())
    }
  })
  


  // Reset all filters
  $('#reset_filters').on('click', function(){
    update(data)
    $('.filter_button').removeClass('in-focus')
    $('.project_filters').addClass('closed')
    $('.html-change-project').text('Project')
    $('.html-change-position').text('Position')
  })
});
