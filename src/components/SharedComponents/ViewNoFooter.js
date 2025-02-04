// @flow strict-local

import * as React from "react";
import { SafeAreaView, StatusBar } from "react-native";

import viewStyles from "../../styles/sharedComponents/viewWithFooter";

type Props = {
  children: React.Node,
  testID?: string
}

const ViewWithFooter = ( { children, testID }: Props ): React.Node => (
  <SafeAreaView style={viewStyles.safeAreaContainer} testID={testID}>
    <StatusBar barStyle="dark-content" />
    {children}
  </SafeAreaView>
);

export default ViewWithFooter;
