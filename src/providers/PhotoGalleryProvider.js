// @flow
import React, { useState, useEffect } from "react";
import type { Node } from "react";

import { PhotoGalleryContext } from "./contexts";
import usePhotos from "../components/PhotoLibrary/hooks/usePhotos";

type Props = {
  children: any
}

const options = {
  first: 28,
  assetType: "Photos",
  include: ["location"]
};

const PhotoGalleryProvider = ( { children }: Props ): Node => {
  const [photoGallery, setPhotoGallery] = useState( {} );
  const [isScrolling, setIsScrolling] = useState( true );
  const [photoOptions, setPhotoOptions] = useState( options );
  const [selectedPhotos, setSelectedPhotos] = useState( {} );

  // photos are fetched from the server on initial render
  // and anytime a user scrolls through the photo gallery
  const photosFetched = usePhotos( photoOptions, isScrolling );

  useEffect( ( ) => {
    if ( photosFetched ) {
      // $FlowFixMe
      const selectedAlbum = photoOptions.groupName || "All";

      if ( photoGallery[selectedAlbum]
        && photoGallery[selectedAlbum].length === photosFetched.length ) {
        return;
      }

      // store photo details in state so it's possible
      // to select mutiple photos across albums

      const updatedPhotoGallery = {
        ...photoGallery,
        [selectedAlbum]: photosFetched
      };

      setPhotoGallery( updatedPhotoGallery );
    }
  }, [photosFetched, photoGallery, photoOptions, setPhotoGallery] );

  const photoGalleryValue = {
    photoGallery,
    setPhotoGallery,
    isScrolling,
    setIsScrolling,
    photoOptions,
    setPhotoOptions,
    selectedPhotos,
    setSelectedPhotos
  };

  return (
    <PhotoGalleryContext.Provider value={photoGalleryValue}>
      {children}
    </PhotoGalleryContext.Provider>
  );
};

export default PhotoGalleryProvider;
