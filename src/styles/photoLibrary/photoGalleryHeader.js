// @flow strict-local

import { StyleSheet } from "react-native";

import type { ViewStyleProp, TextStyleProp, ImageStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const pickerContainer = {
  alignItems: "center",
  flexDirection: "row",
  flexWrap: "nowrap",
  paddingHorizontal: 30
};

const pickerText = {
  fontSize: 20,
  marginTop: 20
};

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  header: {
    height: 70,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center"
  },
  inputIOSContainer: pickerContainer,
  inputAndroidContainer: pickerContainer,
  // $FlowFixMe
  inputIOS: pickerText,
  // $FlowFixMe
  inputAndroid: pickerText,
  footer: {
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between"
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  header: {
    marginLeft: 10
  }
} );

const imageStyles: { [string]: ImageStyleProp } = StyleSheet.create( {

} );

export {
  viewStyles,
  textStyles,
  imageStyles
};
