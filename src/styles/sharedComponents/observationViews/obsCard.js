// @flow strict-local

import { StyleSheet, Dimensions } from "react-native";

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import { colors } from "../../global";

const { height } = Dimensions.get( "screen" );

// safe area heights: https://stackoverflow.com/questions/46376860/what-is-the-safe-region-for-iphone-x-in-pixels-that-factors-the-top-notch-an/49174154
const safeAreaViewPortraitMode = 78;

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  center: {
    height: height - safeAreaViewPortraitMode,
    alignItems: "center",
    justifyContent: "center"
  },
  imageBackground: {
    width: 75,
    height: 75,
    borderRadius: 10,
    backgroundColor: colors.black,
    marginHorizontal: 20
  },
  obsDetailsColumn: {
    width: 200
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    marginVertical: 10
  },
  photoContainer: {
    backgroundColor: colors.black,
    height: 200
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  text: { }
} );

export {
  viewStyles,
  textStyles
};
