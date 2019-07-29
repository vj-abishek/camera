const canvas = document.querySelector('#canvas')
const video = document.querySelector('#video')
const ctx = canvas.getContext('2d')
const strip = document.querySelector('#strip')

navigator.mediaDevices.getUserMedia({video:true,audio:false})
    .then(stream => {
        console.log(stream)
        video.srcObject = stream
        video.play()
})

const printToCanvas = () => {
 const width = video.videoWidth;
 const height = video.videoHeight

 canvas.width = width
 canvas.height = height

return setInterval(() => {
    ctx.drawImage(video,0,0,width,height)
    let pixels = ctx.getImageData(0,0,width,height)
    pixels = rgbSplit(pixels)
    ctx.globalAlpha = 0.3
    ctx.putImageData(pixels,0,0)
 },16)
}
const takePhoto = () => {
    const data = canvas.toDataURL('image/jpeg')
    const a = document.createElement('a')
    a.href = data
    a.setAttribute('download','abigo')
    a.textContent='download image'
    const img = document.createElement('img')
    img.src=data
    img.style.width= "90px"
    img.style.height = "90px"
    
    strip.insertBefore(a,strip.firstChild)
    strip.insertBefore(img,strip.lastChild)
    
}
function redEffect(pixless)  {
   
    for(let i = 0;i < pixless.data.length;i+=4){
       pixless.data[i + 0] =  pixless.data[i + 0] + 100
       pixless.data[i + 1] =  pixless.data[i + 1] - 50
       pixless.data[i + 2] =  pixless.data[i + 2] * 0.5
    }
    return pixless
}
function rgbSplit(pixless)  {
   
    for(let i = 0;i < pixless.data.length;i+=4){
       pixless.data[i - 150] =  pixless.data[i + 0] 
       pixless.data[i + 100] =  pixless.data[i + 1] 
       pixless.data[i - 150] =  pixless.data[i + 2] 
    }
    return pixless
}
video.addEventListener('canplay',printToCanvas)