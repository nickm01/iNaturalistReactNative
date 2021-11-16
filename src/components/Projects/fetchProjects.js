// @flow

import inatjs from "inaturalistjs";

const PROJECT_FIELDS = {
  featured: true
};

const fetchProjects = async ( ) => {
  try {
    // const params = {
    //   per_page: 20,
    //   fields: PROJECT_FIELDS
    // };
    const response = await inatjs.projects.autocomplete( );
    const results = response.results;
    console.log( results, "results in fetch projects" );
  } catch ( e ) {
    console.log( "Couldn't fetch projects:", e.message, );
  }
};

export default fetchProjects;
