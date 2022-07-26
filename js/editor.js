// Default Text
myData = `The quick brown fox jumps over the lazy dog`;
// Declaring and Intializing variables for various options in the editor
let img = [],
  myFont = [],
  myFonts = 15,
  imgNum = 8,
  fontNum = 0,
  pageNum = 0,
  xaxis = 20,
  yaxis = 20,
  fontsize = 30,
  w = 700,
  linespacing = false;

function preload() {
  loadPage();
  fontLoad();
}

document.getElementsByTagName("BODY")[0].onresize = function () {
  setup();
};

function setup() {
  let canvasHeight = document.getElementById("contribute-wrapper").offsetHeight;
  let canvasWidth = document.getElementById("contribute-wrapper").offsetWidth;
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("contributing");
  rectMode(CORNER);
}

// Default Ink Color
defInk = "#16264C";
// Functions for Choosing Ink Color
function chooseRed() {
  defInk = "red"; //red colour
}
function chooseBlue() {
  defInk = "blue"; //blue colour
}
function chooseGreen() {
  defInk = "green";  //green colour
}
function chooseBlack() {
  defInk = "black"; //black colour
}
function choosePink() {
  defInk = "#e11d74"; //pink colour
}
function chooseGolden() {
  defInk = "#ffd571"; //golden colour
}

function draw() {
  image(img[pageNum], 0, 0, width, height);
  textFont(myFont[fontNum]);
  textSize(fontsize);
  fill(defInk);
  if (linespacing) {
    textLeading(linespacing);
  }
  data = "\n" + myData;
  text(data, xaxis, yaxis, w, 900);
}

function fontLoad() {
  for (var i = 0; i < myFonts; i++) {
    myFont.push(loadFont("assets/fonts/font (" + str(i) + ").ttf"));
  }
}

function changeFont() {
  fontNum += 1;
  fontNum %= myFonts;
}

function loadPage() {
  for (var i = 0; i < imgNum; i++) {
    img.push(loadImage("assets/images/pages/page (" + str(i) + ").jpg"));
  }
}

function changePage() {
  pageNum += 1;
  pageNum %= imgNum;
}

function chooseFont(x) {
  fontNum = x;
  fontNum %= myFonts;
}

function choosePage(x) {
  pageNum = x;
  pageNum %= imgNum;
}

// setting font size options
const noOfFontSizes = 20;
let fontSize = 2;

// adding font sizes in option
for (let i = 1; i <= noOfFontSizes; i++) {
  document.querySelector(
    "#font-size-select"
  ).innerHTML += `<option value="${fontSize * i}">${fontSize * i}</option>`;
}

// changing the font size of data field on font size input
let fontSizeFromInput;
document.querySelector('#font-size-select').addEventListener('input', () => {
  fontSizeFromInput = document.querySelector('#font-size-select').value;
})
var temp = "30";
        var mySelect = document.getElementById('font-size-select');
        
        for(var i, j = 0; i = mySelect.options[j]; j++) {
            if(i.value == temp) {
                mySelect.selectedIndex = j;
                break;
            }
        }

/*range field*/

// Function to count the number of words and limit the total number of words
$("#dataField").on("keydown", function (e) {// function event
  var words = $.trim(this.value).length ? this.value.match(/\S+/g).length : 0; //count length of word when space occur
  if (words <= 10000) {
    $("#count-words").text(10000 - words);// subtracts word from 10K and targets span-id"count-words" 
    $("#words-strt").text(0 + words);
  } else {
    if (e.which !== 8) e.preventDefault();//prevent user to enter more text
  }
});
// function to generate pdf
function getPDF(){

  var HTML_Width = $(".container-input").width();
  var HTML_Height = $(".container-input").height();
  var top_left_margin = 15;
  var PDF_Width = HTML_Width+(top_left_margin*2);
  var PDF_Height = (PDF_Width*1.2)+(top_left_margin*2);
  var canvas_image_width = HTML_Width;
  var canvas_image_height = HTML_Height;
  
  var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
  

  html2canvas($(".container-input")[0],{allowTaint:true}).then(function(canvas) {
    canvas.getContext('2d');
    
    console.log(canvas.height+"  "+canvas.width);
    
    
    var imgData = canvas.toDataURL("image/jpeg", 1.0);
    var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
      pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
    
    
    for (var i = 1; i <= totalPDFPages; i++) { 
      pdf.addPage(PDF_Width, PDF_Height);
      pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
    }
    
      pdf.save("HTML-Document.pdf");
      });
};