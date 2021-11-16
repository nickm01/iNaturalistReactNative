// @flow

import * as React from "react";
import { Text, Pressable } from "react-native";
import ViewWithFooter from "../SharedComponents/ViewWithFooter";

import fetchProjects from "./fetchProjects";

const Projects = ( ): React.Node => (
  <ViewWithFooter>
    <Text>search projects -- projects/autocomplete</Text>
    <Pressable>
      <Text>joined -- projects/fetch, member_id = user id</Text>
    </Pressable>
    <Pressable onPress={fetchProjects}>
      <Text>featured -- projects/fetch, featured = true</Text>
    </Pressable>
    <Pressable>
      <Text>nearby -- projects/fetch, lat, lng, radius</Text>
    </Pressable>
    <Text>include join, leave, news, about</Text>
  </ViewWithFooter>
);

export default Projects;
