import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import ContextMenu from "./ContextMenu";
import PhotoPicker from "./PhotoPicker";
import PhotoLibrary from "./PhotoLibrary";
import CapturePhoto from "./CapturePhoto";

function Avatar({type, image, setImage}) {
  const [hover, setHover] = useState(false);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [contextMenuCordinates, setContextMenuCordinates] =useState({ x: 0, y:0 });

  const showContextMenu = (e) => {
    e.preventDefault();
    setContextMenuCordinates({ x: e.pageX, y: e.pageY });
    setIsContextMenuVisible(true);
  }

  const ContextMenuOptions = [
    {name: 'Take Photo', cb: () => {setShowCapturePhoto(true)}},
    {name: 'Choose From Library', cb: () => {setShowPhotoLibrary(true)}},
    {name: 'Upload Photo', cb: () => {setGrabPhoto(true)}},
    {name: 'Remove Photo', cb: () => {setImage('/default_avatar.png')}}
  ];

  const [grabPhoto, setGrabPhoto] = useState(false);

  const PhotoPickerChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const data = document.createElement('img');
    reader.onload = function(event) {
      data.src= event.target.result;
      data.setAttribute('data-src', event.target.result);
    };
    reader.readAsDataURL(file);
    setTimeout(() => {
      setImage(data.src);
    }, 500);
  }

  useEffect(() => {
    if(grabPhoto) {
      const data = document.getElementById('photo-picker');
      data.click();
      document.body.onfocus = (e) => {
        setGrabPhoto(false);
      }
    }
  }, [grabPhoto]);

  const [showPhotoLibrary, setShowPhotoLibrary] = useState(false);

  const [showCapturePhoto, setShowCapturePhoto] = useState(false);
  
  return (
    <div className="flex items-center justify-center">
      {
        type ==='sm' &&
        <div className="h-10 w-10 relative">
           <Image src={image} alt="avatar" className="rounded-full" fill />
        </div>
      }
      { 
        type ==='lg' && 
        <div className="h-14 w-14 relative">
          <Image src={image} alt="avatar" className="rounded-full" fill />
        </div>
      }
      { 
        type ==='xl' &&
        <div className="relative cursor-pointer z-0" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          <div className={`bg-photopicker-overlay-background z-10 h-60 w-60 absolute top-0 left-0 flex items-center rounded-full justify-center flex-col text-center gap-2
          ${hover ? 'visible' : 'hidden'}`}
          onClick={(e) => showContextMenu(e)}
          id='context-opener'
          >
            <FaCamera className="text-2xl" id="context-opener" 
            onClick={(e) => showContextMenu(e)}
            />
            <span onClick={(e) => showContextMenu(e)} id='context-opener'>Change your photo</span>
          </div>
          <div className="h-60 w-60">
            <Image src={image} alt="avatar" className="rounded-full" fill />
          </div>
        </div>
      }
      {
        isContextMenuVisible && 
        <ContextMenu 
        options={ContextMenuOptions}
        cordinates={contextMenuCordinates}
        contextMenu={isContextMenuVisible}
        setContextMenu={setIsContextMenuVisible}
        />
      }
      {
        showPhotoLibrary && <PhotoLibrary setImage={setImage} hidePhotoLibrary={setShowPhotoLibrary} />
      }
      {
        grabPhoto &&
        <PhotoPicker onChange={PhotoPickerChange} />
      }
      {
        showCapturePhoto && <CapturePhoto setImage={setImage} hide={setShowCapturePhoto} />
      }
    </div>
  );
}

export default Avatar;
