// @flow

import React, { useContext } from "react";
import { Pressable, Image, FlatList, ActivityIndicator, View } from "react-native";
import type { Node } from "react";
import { useNavigation } from "@react-navigation/native";

// import useAndroidPermission from "./hooks/useAndroidPermission";
import { imageStyles, viewStyles } from "../../styles/photoLibrary/photoGallery";
import PhotoGalleryHeader from "./PhotoGalleryHeader";
import { PhotoGalleryContext } from "../../providers/contexts";
import ViewNoFooter from "../SharedComponents/ViewNoFooter";
import RoundGreenButton from "../SharedComponents/Buttons/RoundGreenButton";

const options = {
  first: 28,
  assetType: "Photos",
  include: ["location"]
};

const PhotoGallery = ( ): Node => {
  const {
    photoGallery,
    setPhotoGallery,
    setIsScrolling,
    photoOptions,
    setPhotoOptions,
    selectedPhotos,
    setSelectedPhotos
  } = useContext( PhotoGalleryContext );

  const navigation = useNavigation( );
  // const hasAndroidPermission = useAndroidPermission( );

  const updateAlbum = album => {
    const newOptions = {
      ...options,
      groupTypes: ( album === null ) ? "All" : "Album"
    };

    if ( album !== null ) {
      // $FlowFixMe
      newOptions.groupName = album;
    }
    setPhotoOptions( newOptions );
  };

  const selectedAlbum = photoOptions.groupName || "All";
  const photosByAlbum = photoGallery[selectedAlbum];
  const photosSelectedInAlbum = selectedPhotos[selectedAlbum] || [];

  const updatePhotoGallery = ( rerenderFlatList ) => {
    setPhotoGallery( {
      ...photoGallery,
      // there might be a better way to do this, but adding this key forces the FlatList
      // to rerender anytime an image is unselected
      rerenderFlatList
     } );
  };

  const selectPhoto = ( isSelected, item ) => {
    if ( !isSelected ) {
      setSelectedPhotos( {
        ...selectedPhotos,
        [selectedAlbum]: photosSelectedInAlbum.concat( item )
      } );
      updatePhotoGallery( false );
    } else {
      const newSelection = photosSelectedInAlbum;
      const selectedIndex = photosSelectedInAlbum.indexOf( item );
      newSelection.splice( selectedIndex, 1 );

      setSelectedPhotos( {
        ...selectedPhotos,
        [selectedAlbum]: newSelection
      } );

      updatePhotoGallery( true );
    }
  };

  const renderImage = ( { item } ) => {
    const isSelected = photosSelectedInAlbum.some( photo => photo.uri === item.uri );

    const handlePress = ( ) => selectPhoto( isSelected, item );

    const imageUri = { uri: item.uri };
    return (
      <Pressable
        onPress={handlePress}
        testID={`PhotoGallery.${item.uri}`}
      >
        <Image
          testID="PhotoGallery.photo"
          source={imageUri}
          style={[
            imageStyles.galleryImage,
            isSelected ? imageStyles.selected : null
          ]}
        />
      </Pressable>
    );
  };

  const extractKey = ( item, index ) => `${item}${index}`;

  const fetchMorePhotos = ( ) => setIsScrolling( true );

  const navToGroupPhotos = ( ) => navigation.navigate( "GroupPhotos" );

  const renderFooter = ( ) => {
    if ( Object.keys( selectedPhotos ).length > 0 ) {
      return (
        <View style={viewStyles.createObsButton}>
          <RoundGreenButton
            buttonText="create observations"
            handlePress={navToGroupPhotos}
            testID="PhotoGallery.createObsButton"
          />
        </View>
      );
    }
    return <></>;
  };

  return (
    <ViewNoFooter>
      <PhotoGalleryHeader updateAlbum={updateAlbum} />
      <FlatList
        data={photosByAlbum}
        extraData={selectedPhotos}
        initialNumToRender={4}
        keyExtractor={extractKey}
        numColumns={4}
        renderItem={renderImage}
        onEndReached={fetchMorePhotos}
        testID="PhotoGallery.list"
        ListEmptyComponent={( ) => <ActivityIndicator />}
      />
      {renderFooter( )}
    </ViewNoFooter>
  );
};

export default PhotoGallery;
