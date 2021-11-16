// @flow
import * as React from "react";
import { View } from "react-native";

import { viewStyles } from "../../styles/obsDetails";
import RoundGreenButton from "../SharedComponents/Buttons/RoundGreenButton";

const EditButtons = ( ): React.Node => {
  const handlePress = ( ) => console.log( "pressed" );

  return (
    <View style={viewStyles.greenButtonRow}>
      <RoundGreenButton buttonText="comment" handlePress={handlePress}/>
      <RoundGreenButton buttonText="suggest id" handlePress={handlePress} />
    </View>
  );
};

export default EditButtons;

