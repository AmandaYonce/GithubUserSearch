/*
1. Get Location
    -use geolocation api to get coordinates or use fallback location
2. Get Photo info from Flickr
    -use fetch to send get request to flickr
    -include the lat and long
    -include a search term

    -process the promises to get the photo data
    -convert json to a usable object
    -send the photo data to a display function
3. Display Photos
    -create the image urls from the photo data-see flickr documentation
    -insert an image tag into the page
    -create image element
    -set source attribute to image url
    -display link to the image's flickr page
4. Provide a way to click through the photos
*/

/*
Key:
e35c72b1e1a0100981627f0b8f995665

Secret:
91b06c47be98d069
*/
navigator.geolocation.getCurrentPosition(success, error, options)  //get current location

var options = {         //optional parameters for geolocation search
    enableHighAccuracy: true,
    maximumAge: 0
  };
  
  function success(pos) {       //get current coordinates
    var crd = pos.coords;
    displayPhoto(crd)
    return crd
  }
  
  function error(err) {         //function to use fallback location
    displayPhoto(blockLocation);
  }

const blockLocation={latitude: 37, longitude: 14}       //fallback location

function displayPhoto(crd){         //send request to flickr api in this function
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);

    const proxy="https://shrouded-mountain-15003.herokuapp.com/"
    const url=proxy+"https://flickr.com/services/rest/?api_key=e35c72b1e1a0100981627f0b8f995665&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&page=1&"+"lat="+crd.latitude+"&"+"lon="+crd.longitude

    fetch(url)

        .then(function (responseObject){
            return responseObject.json()
        })
        .then(function (data){
            createImageUrlObject(data)
            return data
        })
}
let imageUrlArray=[]

function createImageUrlObject(data){
    console.log(data)
    console.log(data.photos.photo[0])
    for(let i=0; i<data.photos.photo.length; i++){
            imageUrlArray.push("https://farm" + data.photos.photo[i].farm+".staticflickr.com/"+data.photos.photo[i].server+"/"+data.photos.photo[i].id+"_"+data.photos.photo[i].secret+".jpg")
    }
    console.log(imageUrlArray)
    sendImageToHTML(imageUrlArray)
    return imageUrlArray
}


let i=0

function sendImageToHTML(imageUrlArray){
    if(i<5){
    const imageLocation=document.getElementById("photoImage")
    imageLocation.src=imageUrlArray[i]
    console.log(imageUrlArray[i])
    i++
    console.log(i)
    } else {
        i=0
        sendImageToHTML(imageUrlArray)
    }
}










