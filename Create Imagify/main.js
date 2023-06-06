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
      const imageContainer = document.querySelector('.image-container');
    
      if (data && data.data && Array.isArray(data.data)) {
        data.data.forEach((imageObject) => {
    
          const imageElement = document.createElement('img');
          imageElement.src = imageObject.url;
          imageElement.alt = inputElement.value;
          imageElement.classList.add('image');
    
          imageContainer.appendChild(imageElement);
          console.log('imageContainer', imageContainer);
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