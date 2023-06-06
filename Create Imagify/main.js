var images = ['images/Image1.jpg', 'images/image2.jpg', 'images/image3.jpg','images/image4.jpg']; // Array of image URLs
var currentIndex = 0;
var interval = 60000; // Change image every 5 seconds (adjust as needed)

function changeBackgroundImage() {
  currentIndex = (currentIndex + 1) % images.length;
  var imageUrl = images[currentIndex];
  document.body.style.backgroundImage = "url('" + imageUrl + "')";
}

setInterval(changeBackgroundImage, interval);
function toggleMobileMenu(menu) {
  menu.classList.toggle('open');
}

const API_KEY="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";
const submitIcon=document.querySelector("#submit-icon");
const inputElement=document.querySelector("input");
const imageSection=document.querySelector('.image-section')

const getImages=async()=>{
    const options={
        method:"POST",
        headers:{
            "Authorization":`Bearer ${API_KEY}`,
            'Content-Type':"application/json"
        },
        body:JSON.stringify({
            prompt:inputElement.value,
            n:1,
            size:"256x256"
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', options);
        const data = await response.json();
      
        if (data && data.data && Array.isArray(data.data)) {
          data.data.forEach((imageObject) => {
            const ImageContainer = document.createElement('div');
            ImageContainer.classList.add('image-container');
      
            const imageElement = document.createElement('img');
            imageElement.setAttribute('src', imageObject.url);
      
            ImageContainer.append(imageElement);
            imageSection.append(ImageContainer);
          });
        } else {
          throw new Error('Invalid data structure');
        }
      } catch (error) {
        console.error(error);
      }
    }   
/*custom-button.addEventListener('click',getImages);*/
submitIcon.addEventListener('click',getImages);