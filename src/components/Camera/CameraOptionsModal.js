// @flow

import * as React from "react";
import { Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { textStyles } from "../../styles/sharedComponents/modal";
import { ObsEditContext } from "../../providers/contexts";

type Props = {
  closeModal: ( ) => void
}

const CameraOptionsModal = ( { closeModal }: Props ): React.Node => {
  // ObsEditProvider will not be loaded yet the first time a user opens camera options
  // so useContext will return undefined
  const observation = React.useContext( ObsEditContext );
  const currentObs = observation && observation.currentObs;
  const navigation = useNavigation( );

  const hasSound = currentObs && currentObs.observationSounds && currentObs.observationSounds.uri;

  const navAndCloseModal = ( screen, params ) => {
    // access nested screen
    navigation.navigate( "camera", { screen, params } );
    closeModal( );
  };

  const navToPhotoGallery = ( ) => navAndCloseModal( "PhotoGallery" );

  const navToSoundRecorder = ( ) => navAndCloseModal( "SoundRecorder" );

  const navToNormalCamera = ( ) => navAndCloseModal( "NormalCamera" );

  const navToObsEdit = ( ) => navAndCloseModal( "ObsEdit", { obsToEdit: [{
    observationPhotos: []
  }] } );

  return (
    <View>
       <Pressable
        onPress={navToNormalCamera}
      >
        <Text style={textStyles.whiteText}>take photo with camera</Text>
      </Pressable>
      {!observation && (
        <Pressable
          onPress={navToPhotoGallery}
        >
          <Text style={textStyles.whiteText}>upload photo from gallery</Text>
        </Pressable>
      )}
      {!hasSound && (
        <Pressable
          onPress={navToSoundRecorder}
        >
          <Text style={textStyles.whiteText}>record a sound</Text>
        </Pressable>
      )}
      {!observation && (
        <Pressable
          onPress={navToObsEdit}
        >
          <Text style={textStyles.whiteText}>submit without evidence</Text>
        </Pressable>
      )}
    </View>
  );
};

export default CameraOptionsModal;
