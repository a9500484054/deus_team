import { useState, useRef, useEffect } from 'react'
import Popup from 'reactjs-popup';

import './showreel.scss';


class MutedVideo extends HTMLVideoElement {
    constructor() {
      super();
      this.muted = true;
      this.autoPlay = true;
    }
  }

customElements.define("x-muted", MutedVideo, { extends: "video" });

const apiUrl = process.env.NODE_ENV === 'production'
    ? 'http://188.120.232.38'
    : 'http://localhost:4554';

const Showreel = (props) => {
    const [open, setOpen] = useState(false);

    const videoRef = useRef(null);
    const showReelRef = useRef(null)

    const closeModal = () => setOpen(false);
    const openModal = () => {
        setOpen(true);
        videoRef.current.pause();
    };

    const { data, isMain } = props;

    useEffect(() => {
        const videoElement = videoRef.current;
        const showreelElement = showReelRef.current;
        if (videoElement && showreelElement) {
            videoElement.addEventListener("play", () => {
              showreelElement.classList.remove("showreel__s");
            });
        
            videoElement.addEventListener("pause", () => {
              showreelElement.classList.add("showreel__s");
            });
        }
        
          return () => {
            if (videoElement && showreelElement) {
              videoElement.removeEventListener("play", () => {
                showreelElement.classList.remove("showreel__s");
              });
        
              videoElement.removeEventListener("pause", () => {
                showreelElement.classList.add("showreel__s");
              });
            }
          };
    }, []);


    return (
        <div className="showreel">
            <div className="showreel__title">{data.name} <span> — {data.year}</span></div>
            {
                isMain ? (
                    <div ref={showReelRef} className="showreel__s playIcon">
                        {
                            data.video && data.video !== 'undefined' && data.video !== 'null' ?
                            <video ref={videoRef} autoPlay muted controls loop  playsInline>
                                <source src={data.video ? `${apiUrl}/uploads/${data.video.filename}` : null} type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" />
                            </video> :
                            data.videoUrl && data.videoUrl !== 'undefined' && data.videoUrl !== 'null' ?
                                <div dangerouslySetInnerHTML={{ __html: data.videoUrl }}></div> :
                                <video is="x-muted" loop  playsInline>
                                    <source src={data.video ? `${apiUrl}/uploads/${data.video.filename}` : null} type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" />
                                </video>
                        }
                    </div>
                ) : (
                    <div className="showreel__s" onClick={openModal}>
                        {
                            data.video && data.video !== 'undefined' && data.video !== 'null' ?
                            <video ref={videoRef} muted controls loop  playsInline>
                                <source src={data.video ? `${apiUrl}/uploads/${data.video.filename}` : null} type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" />
                            </video> :
                            data.videoUrl && data.videoUrl !== 'undefined' && data.videoUrl !== 'null' ?
                                <div dangerouslySetInnerHTML={{ __html: data.videoUrl }}></div> :
                                <video is="x-muted" loop  playsInline>
                                    <source src={data.video ? `${apiUrl}/uploads/${data.video.filename}` : null} type="video/mp4; codecs=&quot;avc1.42E01E, mp4a.40.2&quot;" />
                                </video>
                        }
                    </div>
                )
            }

            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                <div>
                    <div className="popup__close" onClick={closeModal}>
                        &times;
                    </div>
                    {
                        data.videoUrl && data.videoUrl !== 'undefined' && data.videoUrl !== 'null' ?
                            <div dangerouslySetInnerHTML={{ __html: data.videoUrl }}></div> :
                            <video src={data.video ? `${apiUrl}/uploads/${data.video.filename}` : null} playsInline loop is="x-muted" className="popup__video"></video>
                    }
                </div>
            </Popup>
        </div>
    )

}

export default Showreel;
