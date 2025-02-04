// @flow

import * as React from "react";
import { Text, Image, ImageBackground } from "react-native";
import { useRoute } from "@react-navigation/native";

import ViewWithFooter from "../SharedComponents/ViewWithFooter";
import { textStyles, imageStyles } from "../../styles/projects/projectDetails";
import useProjectDetails from "./hooks/useProjectDetails";
import ProjectObservations from "./ProjectObservations";

const ProjectDetails = ( ): React.Node => {
  const { params } = useRoute( );
  const { id } = params;
  const project = useProjectDetails( id );

  return (
    <ViewWithFooter>
        <ImageBackground
          source={{ uri: project.header_image_url }}
          style={imageStyles.headerImage}
          testID="ProjectDetails.headerImage"
        >
          <Image
            source={{ uri: project.icon }}
            style={imageStyles.icon}
            testID="ProjectDetails.projectIcon"
          />
        </ImageBackground>
        <Text style={textStyles.descriptionText}>{project.title}</Text>
        <Text style={textStyles.descriptionText}>{project.description}</Text>
        {/* TODO: support joining or leaving projects once oauth is set up */}
        <ProjectObservations id={id} />
    </ViewWithFooter>
  );
};

export default ProjectDetails;

