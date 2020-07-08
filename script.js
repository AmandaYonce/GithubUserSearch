
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
let imageUrlArray=[]

function displayPhoto(crd){         //send request to flickr api in this function
    imageUrlArray=[]

    const proxy="https://shrouded-mountain-15003.herokuapp.com/"
    const url=proxy+"https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=e35c72b1e1a0100981627f0b8f995665&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&page=1&"+"lat="+crd.latitude+"&"+"lon="+crd.longitude

    fetch(url)

        .then(function (responseObject){
            console.log(responseObject)
            return responseObject.json()
        })
        .then(function (data){
            console.log(data)
            createImageUrlObject(data)
            return data
        })
        
}

function createImageUrlObject(data){        //create array of photo urls

    for(let i=0; i<data.photos.photo.length; i++){
            imageUrlArray.push("https://farm" + data.photos.photo[i].farm+".staticflickr.com/"+data.photos.photo[i].server+"/"+data.photos.photo[i].id+"_"+data.photos.photo[i].secret+".jpg")
    }
    sendImageToHTML(imageUrlArray)
    return imageUrlArray
}

let i=0

function sendImageToHTML(imageUrlArray){        //send images to html
    if(i<5){
    const imageLocation=document.getElementById("photoImage")
    imageLocation.src=imageUrlArray[i]

    const urlLocation=document.getElementById("urlAnchor")
    urlLocation.href=imageUrlArray[i]
    
    i++
    } else {
        i=0
        sendImageToHTML(imageUrlArray)
    }
}










