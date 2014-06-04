
function setEventHandlers(){

   var button = $('.palette-button')[0];
   $(button).click(function(){
      $('.palette').remove();
      $('.color-box').remove();
      $.ajax({
         url: '/palettes.json',
         success: displayPalettes
      });
      return this;
   });
}

function displayColorBox(e){
   var colorBox = $('<div>').addClass('color-box ten columns');
   $('.palette-grid').append(colorBox);

   var colorBoxArray = $(this).data().colors;
   var numColumns = $(this).data().colors.length;
   console.log(numColumns);
   var stripWidth = ((900/$(this).data().colors.length)/900)*100;

   for (var i = 0; i < numColumns; i++) {
      var colorStrip = $('<div>').addClass('color-strip')
      colorStrip.css('width', stripWidth + '%');
      $(colorBox).append(colorStrip);
      colorStrip.css('background-color', '#' + colorBoxArray[i]);
   };

   var closeButton = $('<div>').addClass('close-button').html('X');
   $(colorBox).append(closeButton);

   $(closeButton).mouseup(function(e){
      $(colorBox).remove();
   })

}

function displayPalettes(data){
   var containerDiv = $('.container');

   for (var i in data){

      var paletteDiv = $('<div>').addClass('palette four columns');
      $(containerDiv).append(paletteDiv);

      var colorsDiv = $('<div>').addClass('colors four columns');
      colorsDiv.data('colors', data[i].colors, 'arrayPos', i);

      $(paletteDiv).append(colorsDiv);
      
      var colorArray = data[i].colors;

      for (var j in colorArray){
         var hueDiv = $('<div>').addClass('hue');
         $(hueDiv).css('background-color', '#' + colorArray[j] );
         $(colorsDiv).append(hueDiv);
      };

      colorsDiv.click(displayColorBox) // display popup color box

      var title = data[i].title;
      var titleDiv = $('<div>').addClass('title four columns').html('Title: ' + title);
      $(paletteDiv).append(titleDiv);

      var creator = data[i].userName;
      var creatorDiv = $('<div>').addClass('creator four columns').html('Creator: ' + creator);
      $(paletteDiv).append(creatorDiv);

   };

}

$(function(){
  setEventHandlers();
});



