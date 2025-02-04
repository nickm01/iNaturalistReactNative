import Photo from "./Photo";
class Taxon {
  static mimicRealmMappedPropertiesSchema( taxon ) {
    return {
      ...taxon,
      default_photo: Photo.mapApiToRealm( taxon.default_photo ),
      preferredCommonName: taxon.preferred_common_name
    };
  }

  static mapApiToRealm( taxon, realm ) {
    return {
      ...taxon,
      default_photo: Photo.mapApiToRealm( taxon.default_photo )
    };
  }

  static uri = ( item ) => ( item && item.default_photo ) && { uri: item.default_photo.url };

  static schema = {
    name: "Taxon",
    primaryKey: "id",
    properties: {
      id: "int",
      default_photo: { type: "Photo?", mapTo: "defaultPhoto" },
      name: "string?",
      preferred_common_name: { type: "string?", mapTo: "preferredCommonName" },
      rank: "string?"
    }
  }
}

export default Taxon;
