// @flow strict-local

import { StyleSheet } from "react-native";

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import { colors } from "../../global";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  greenButton: {
    backgroundColor: colors.inatGreen,
    borderRadius: 40,
    paddingHorizontal: 25,
    paddingVertical: 5
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  greenButtonText: {
    color: colors.white
  }
} );

export {
  viewStyles,
  textStyles
};
