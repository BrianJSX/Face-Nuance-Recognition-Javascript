const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.getElementById('videoControl').append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 320 })
    try {
      const ob = detections[0].expressions ;
      const FaceStatus = document.getElementById('faceStatus');
      var arr = Object.values(ob);     
      for (let i = 0; i < 7; i++) {
        if(arr[i] > 0.7){
          switch (i) {
            case 0:
              FaceStatus.remove();
              var para = document.createElement("P"); 
              para.id = 'faceStatus'
              para.className = 'greenColor'
              para.innerText = "Bình Thường";               // Insert text
              document.body.appendChild(para);    
              break;
            case 1:
              FaceStatus.remove();
              var para = document.createElement("P"); 
              para.id = 'faceStatus'
              para.className = 'pinkColor'
              para.innerText = "Vui vẽ";               // Insert text
              document.body.appendChild(para);    
              break;
            case 2:
              FaceStatus.remove();
              var para = document.createElement("P"); 
              para.id = 'faceStatus'
              para.className = 'purpleColor'
              para.innerText = "Buồn";               // Insert text
              document.body.appendChild(para);    
              break;
            case 3:
              FaceStatus.remove();
              var para = document.createElement("P"); 
              para.id = 'faceStatus'
              para.className = 'redColor'
              para.innerText = "Tức giận";               // Insert text
              document.body.appendChild(para);    
              break;
            case 4:
              FaceStatus.remove();
              var para = document.createElement("P"); 
              para.id = 'faceStatus'
              para.className = 'yellowColor'
              para.innerText = "Sợ hãi";               // Insert text
              document.body.appendChild(para);    
              break;
            case 5:
              FaceStatus.remove();
              var para = document.createElement("P"); 
              para.id = 'faceStatus'
              para.className = 'orgineColor'
              para.innerText = "Chán Ghét";               // Insert text
              document.body.appendChild(para);    
              break;
            case 6:
              FaceStatus.remove();
              var para = document.createElement("P"); 
              para.id = 'faceStatus'
              para.className = 'blueColor'
              para.innerText = "Ngạc nhiên";               // Insert text
              document.body.appendChild(para);    
              break;
          default:
            break;
          }
        }
      }
    } catch (error) {
      console.log('chưa nhận diện được khuôn mặt + trạng thái của bạn')
    }
     
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 100)
})