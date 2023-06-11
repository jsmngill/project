var images = ['images/Image1.jpg', 'images/image2.jpg', 'images/image3.jpg','images/image4.jpg']; 
var currentIndex = 0;
var interval = 60000; 

function changeBackgroundImage() {
  currentIndex = (currentIndex + 1) % images.length;
  var imageUrl = images[currentIndex];
  document.body.style.backgroundImage = "url('" + imageUrl + "')";
}

setInterval(changeBackgroundImage, interval);
function toggleMobileMenu(menu) {
  menu.classList.toggle('open');
}

const API_KEY="";
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

submitIcon.addEventListener('click',getImages);


/*function downloadFile() {
    var apiUrl = imageObject.url;
    var link = document.createElement("a");
    link.style.display = "none";
    document.body.appendChild(link);
    link.href = apiUrl;
    link.download = "imageforge.jpg";
    link.click();
    document.body.removeChild(link);
  }*/
  async function downloadImage(imageObject) {
    const image = await fetch(imageObject)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)
  
    const link = document.createElement('a')
    link.href = imageURL
    link.download = 'ImageForge'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  downloadImages.addEventListener('click',downloadImage)