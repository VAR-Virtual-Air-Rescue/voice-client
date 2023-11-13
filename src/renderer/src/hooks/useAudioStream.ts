export const useAudioStream = () => {
    const getStream = () => navigator.mediaDevices
    .getUserMedia({
        audio: true,
        video: {
            width: {
                min: 640,
                max: 1920
            },
            height: {
                min: 400,
                max: 1080
            }
        }})

    return {getStream}
}