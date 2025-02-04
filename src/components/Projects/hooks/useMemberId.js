// @flow

import { useEffect, useState } from "react";
import inatjs from "inaturalistjs";
import { getJWTToken } from "../../LoginSignUp/AuthenticationService";

const useMemberId = ( ): ?number => {
  const [memberId, setMemberId] = useState( null );

  useEffect( ( ) => {
    let isCurrent = true;
    const fetchMemberId = async ( ) => {
      const apiToken = await getJWTToken( );
      try {
        const options = {
          api_token: apiToken
        };
        const { results } = await inatjs.users.me( options );
        if ( !isCurrent ) { return; }
        setMemberId( results[0].id );
      } catch ( e ) {
        if ( !isCurrent ) { return; }
        console.log( "Couldn't fetch current member id:", JSON.stringify( e.response ) );
      }
    };

    fetchMemberId( );
    return ( ) => {
      isCurrent = false;
    };
  }, [] );

  return memberId;
};

export default useMemberId;
