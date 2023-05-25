var images = ['images/Image1.jpg', 'images/image2.jpg', 'images/image3.jpg','images/image4.jpg']; // Array of image URLs
var currentIndex = 0;
var interval = 60000; // Change image every 5 seconds (adjust as needed)

function changeBackgroundImage() {
  currentIndex = (currentIndex + 1) % images.length;
  var imageUrl = images[currentIndex];
  document.body.style.backgroundImage = "url('" + imageUrl + "')";
}

setInterval(changeBackgroundImage, interval);