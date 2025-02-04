// @flow
import * as React from "react";
import { Pressable, Text } from "react-native";

import { viewStyles, textStyles } from "../../../styles/sharedComponents/buttons/roundGreenButton";

type Props = {
  buttonText: string,
  handlePress: any,
  testID: string
}

const RoundGreenButton = ( { buttonText, handlePress, testID }: Props ): React.Node => (
  <Pressable style={viewStyles.greenButton} onPress={handlePress} testID={testID}>
    <Text style={textStyles.greenButtonText}>
      {buttonText}
    </Text>
  </Pressable>
);

export default RoundGreenButton;
