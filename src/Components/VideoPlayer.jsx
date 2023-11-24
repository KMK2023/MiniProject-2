// Coding to Include a video Player in the main page

import { useState, useRef } from 'react';

export default function VideoPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null); // 1. Create the ref

    function handleClick() {
        // use the current property of the ref object to access play and pause functions
        isPlaying ? videoRef.current.pause() : videoRef.current.play(); // 3. Use the ref to call DOM functions
        setIsPlaying(!isPlaying);
    }
console.log('rendering')
    return (
        <div className="VideoPlayer componentBox" style={{border:'solid 2px', margin:'10em', padding: '10px'}}>
            {/* button to play or pause the video */}
            <button onClick={handleClick}>{isPlaying ? 'Pause' : 'Play'}</button>
            {/* 2. Initialise the ref */}
            <video ref={videoRef} width="400">
                <source type="video/mp4"
                    src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" />
            </video>
        </div>
    );
}
// see https://react.dev/learn/manipulating-the-dom-with-refs for more examples