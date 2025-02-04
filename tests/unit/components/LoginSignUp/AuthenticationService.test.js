import nock from "nock";
import { isLoggedIn, getAPIToken, getUsername, registerUser, authenticateUser, signOut } from "../../../../src/components/LoginSignUp/AuthenticationService";

const USERNAME = "some_user";
const PASSWORD = "123456";
const ACCESS_TOKEN = "some_token";
const ACCESS_TOKEN_AUTHORIZATION_HEADER = `Bearer ${ACCESS_TOKEN}`;
const JWT = "jwt_token";

test( "authenticates user", async ( ) => {
  const scope = nock( "https://www.inaturalist.org" )
    .post( "/oauth/token" )
    .reply( 200, { access_token: ACCESS_TOKEN } )
    .get( "/users/edit.json" )
    .reply( 200, { login: USERNAME } );

  const scope2 = nock( "https://www.inaturalist.org" , {
    reqheaders: {
      authorization: ACCESS_TOKEN_AUTHORIZATION_HEADER
    }} )
    .get( "/users/api_token.json" )
    .reply( 200, { api_token: JWT } );

  // Authenticate the user
  await expect( isLoggedIn() ).resolves.toEqual( false );
  await expect( authenticateUser( USERNAME, PASSWORD ) ).resolves.toEqual( true );

  // Make sure user is logged in
  await expect( getUsername() ).resolves.toEqual( USERNAME );
  await expect( isLoggedIn() ).resolves.toEqual( true );

  // Make sure access token is returned correctly in all different cases (with/without JWT)
  await expect( getAPIToken( false ) ).resolves.toEqual( ACCESS_TOKEN_AUTHORIZATION_HEADER );
  await expect( getAPIToken( true ) ).resolves.toEqual( JWT );

  // Sign out
  await signOut();
  await expect( isLoggedIn() ).resolves.toEqual( false );
  await expect( getAPIToken() ).resolves.toBeNull();

  scope.done();
  scope2.done();
} );


test( "registers user", async ( ) => {
  const scope = nock( "https://www.inaturalist.org" )
    .post( "/oauth/token" )
    .reply( 200, { access_token: ACCESS_TOKEN } )
    .get( "/users/edit.json" )
    .reply( 200, { login: USERNAME } )
    .post( "/users.json" )
    .reply( 200 );

  // Register the user
  await expect( isLoggedIn() ).resolves.toEqual( false );
  await expect( registerUser( "some@mail.com", USERNAME, PASSWORD ) ).resolves.toBeNull( );

  // Log back in
  await expect( authenticateUser( USERNAME, PASSWORD ) ).resolves.toEqual( true );

  // Make sure user is logged in
  await expect( getUsername() ).resolves.toEqual( USERNAME );
  await expect( isLoggedIn() ).resolves.toEqual( true );
  await expect( getAPIToken( false ) ).resolves.toEqual( ACCESS_TOKEN_AUTHORIZATION_HEADER );

  // Sign out
  await signOut();
  await expect( isLoggedIn() ).resolves.toEqual( false );
  await expect( getAPIToken() ).resolves.toBeNull();

  scope.done();
} );
