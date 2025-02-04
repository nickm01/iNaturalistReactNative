import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";

import factory from "../../../factory";
import ObsDetails from "../../../../src/components/ObsDetails/ObsDetails";

const mockedNavigate = jest.fn( );
const mockObservation = factory( "LocalObservation" );

jest.mock( "../../../../src/components/ObsDetails/hooks/useObservation", ( ) => ( {
  useObservation: ( ) => {
    return mockObservation;
  }
} ) );

jest.mock( "@react-navigation/native", ( ) => {
  const actualNav = jest.requireActual( "@react-navigation/native" );
  return {
    ...actualNav,
    useRoute: ( ) => ( {
      params: {
        uuid: mockObservation.uuid
      }
    } ),
    useNavigation: ( ) => ( {
      navigate: mockedNavigate
    } )
  };
} );

const renderObsDetails = ( ) => render(
  <NavigationContainer>
    <ObsDetails />
  </NavigationContainer>
);

test( "renders obs details from remote call", ( ) => {
  const { getByTestId, getByText } = renderObsDetails( );

  expect( getByTestId( `ObsDetails.${mockObservation.uuid}` ) ).toBeTruthy( );
  expect(
    getByTestId( "PhotoScroll.photo" ).props.source
  ).toStrictEqual( { "uri": mockObservation.observationPhotos[0].photo.url } );
  expect( getByText( mockObservation.taxon.name ) ).toBeTruthy( );
  // TODO: figure out how to test elements which are mapped to camelCase via Observation model
  // right now, these elements are not rendering in renderObsDetails( ).debug( ) at all
} );


test( "renders data tab on button press", ( ) => {
  const { getByTestId, getByText } = renderObsDetails( );
  const button = getByTestId( "ObsDetails.DataTab" );

  fireEvent.press( button );
  expect( getByText( mockObservation.description ) ).toBeTruthy( );
} );

test( "navigates to observer profile on button press", ( ) => {
  const { getByTestId } = renderObsDetails( );

  fireEvent.press( getByTestId( "ObsDetails.currentUser" ) );
  expect( mockedNavigate ).toHaveBeenCalledWith( "UserProfile", { userId: mockObservation.user.id } );
} );

test( "navigates to identifier profile on button press", ( ) => {
  const { getByTestId } = renderObsDetails( );

  fireEvent.press( getByTestId( `ObsDetails.identifier.${mockObservation.identifications[0].user.id}` ) );
  expect( mockedNavigate ).toHaveBeenCalledWith( "UserProfile", {
    userId: mockObservation.identifications[0].user.id
  } );
} );

test( "navigates to taxon details on button press", ( ) => {
  const { getByTestId } = renderObsDetails( );

  fireEvent.press( getByTestId( `ObsDetails.taxon.${mockObservation.taxon.id}` ) );
  expect( mockedNavigate ).toHaveBeenCalledWith( "TaxonDetails", {
    id: mockObservation.taxon.id
  } );
} );

test.todo( "should not have accessibility errors" );
// test( "should not have accessibility errors", ( ) => {
//   const obsDetails = (
//     <NavigationContainer>
//       <ObsDetails />
//     </NavigationContainer>
//   );
//   expect( obsDetails ).toBeAccessible( );
// } );
