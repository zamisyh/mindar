function checkWebRTC(){
    const webRtcStatus = document.getElementById('webrtc-status')
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        console.log('WebRTC is supported')
    }else{
        console.log('WebRTC is not supported')
    }
}

function checkWebGL(){
    const webGLStatus = document.getElementById('webgl-status')
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

    if (gl && gl instanceof WebGLRenderingContext) {
        console.log('WebGL is Supported')
    }else{
        console.log('WebGL is not supported')
    }
}