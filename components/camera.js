import { ArrowPathIcon, CameraIcon } from "@heroicons/react/20/solid";
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setImage } from '../services/guest';

export default function WebcamCapture() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const image = useSelector(state => state.guestReducer.image)

    const dispatch = useDispatch()

    const capture = (e) => {
        e.preventDefault()
        const context = canvasRef.current.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        dispatch(setImage(canvasRef.current.toDataURL('image/png')));
    };

    const startWebcam = async () => {
        try {
            const stream = await window.navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
            await videoRef.current.play();
        } catch (error) {
            // toast.error('Camera can only run in https, check log please')
            console.log(error)
        }
    };

    useEffect(() => {
        startWebcam()
    }, [image]) //image untuk reload camera setelah submit

    const reset = (e) => {
        e.preventDefault()
        dispatch(setImage(null))
        startWebcam()
    }

    return (
        <div>
            {!image && <video ref={videoRef} width="640" height="480" />}
            <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }} />
            {image && <Image src={image} width={640} height={480} alt="captured" />}
            {image ?
                <button className='bg-yellow-500 text-yellow-50 py-2 px-6 mt-[-6px] rounded-b-md' onClick={(e) => reset(e)}><ArrowPathIcon width={20} /></button>
                :
                <button className='bg-green-500 text-green-50 py-2 px-6 rounded-b-md' onClick={(e) => capture(e)}><CameraIcon width={20} /></button>
            }
        </div>
    );
}