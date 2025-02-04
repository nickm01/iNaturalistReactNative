import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";

import factory from "../../../factory";
import Explore from "../../../../src/components/Explore/Explore";
import ExploreProvider from "../../../../src/providers/ExploreProvider";
import { ExploreContext } from "../../../../src/providers/contexts";

const mockLatLng = {
  latitude: 37.77,
  longitude: -122.42
};

// Mock the hooks we use on Map since we're not trying to test them here
jest.mock( "../../../../src/sharedHooks/useUserLocation" , ( ) => ( {
  useUserLocation: ( ) => {
    return mockLatLng;
  }
} ) );

jest.mock( "../../../../src/providers/ExploreProvider" );

// Mock ExploreProvider so it provides a specific array of observations
// without any current observation or ability to update or fetch
// observations
const mockExploreProviderWithObservations = observations =>
  ExploreProvider.mockImplementation( ( { children }: Props ): Node => (
    <ExploreContext.Provider value={{
      exploreList: observations,
      setExploreList: ( ) => {},
      setLoading: ( ) => {},
      exploreFilters: {},
      setExploreFilters: ( ) => {},
      clearFilters: ( ) => {}
    }}>
      {children}
    </ExploreContext.Provider>
  ) );

jest.mock( "@react-navigation/native", ( ) => {
  const actualNav = jest.requireActual( "@react-navigation/native" );
  return {
    ...actualNav,
    useRoute: ( ) => ( {
      name: "Explore"
    } )
  };
} );

const renderExplore = ( ) => render(
  <NavigationContainer>
    <ExploreProvider>
      <Explore />
    </ExploreProvider>
  </NavigationContainer>
);

// the next three tests are duplicates from ObsList.test.js, with Explore data
// instead of ObsList data
it( "renders an observation", ( ) => {
  const observations = [
    factory( "LocalObservation" ),
    factory( "LocalObservation" )
  ];
  // Mock the provided observations so we're just using our test data
  mockExploreProviderWithObservations( observations );
  const { getByTestId } = renderExplore( );

  const obs = observations[0];
  const list = getByTestId( "Explore.observations" );
  // Test that there isn't other data lingering
  expect( list.props.data.length ).toEqual( observations.length );

  // Test that a card got rendered for the our test obs
  const card = getByTestId( `ObsList.obsCard.${obs.uuid}` );
  expect( card ).toBeTruthy( );
} );

it( "renders multiple observations", ( ) => {
  const observations = [
    factory( "LocalObservation" ),
    factory( "LocalObservation" )
  ];
  mockExploreProviderWithObservations( observations );
  const { getByTestId } = renderExplore( );
  observations.forEach( obs => {
    expect( getByTestId( `ObsList.obsCard.${obs.uuid}` ) ).toBeTruthy( );
  } );
} );

it( "renders grid view on button press", ( ) => {
  const observations = [
    factory( "LocalObservation" )
  ];
  mockExploreProviderWithObservations( observations );
  const { getByTestId } = renderExplore( );
  const button = getByTestId( "ObsList.toggleGridView" );

  fireEvent.press( button );
  observations.forEach( obs => {
    expect( getByTestId( `ObsList.gridItem.${obs.uuid}` ) ).toBeTruthy( );
  } );
} );

it( "renders map view on button press", ( ) => {
  const observations = [
    factory( "LocalObservation" )
  ];
  mockExploreProviderWithObservations( observations );
  const { getByTestId } = renderExplore( );
  const button = getByTestId( "Explore.toggleMapView" );

  fireEvent.press( button );
  expect( getByTestId( "MapView" ) ).toBeTruthy( );
} );

// TODO: is there a way to test the dropdown pickers? maybe this will be easier
// when we write our own custom dropdown picker with search
