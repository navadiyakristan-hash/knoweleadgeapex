// module.exports = {
//   /**
//    * @param db {import('mongodb').Db}
//    * @param client {import('mongodb').MongoClient}
//    * @returns {Promise<void>}
//    */
//   async up(db, client) {
//     // TODO write your migration here.
//     // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
//     // Example:
//     // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
//   },

//   /**
//    * @param db {import('mongodb').Db}
//    * @param client {import('mongodb').MongoClient}
//    * @returns {Promise<void>}
//    */
//   async down(db, client) {
//     // TODO write the statements to rollback your migration (if possible)
//     // Example:
//     // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
//   }
// };


module.exports = {
  async up(db) {
    // This will add an "isActive: true" field to all brands
    await db.collection('brands').updateMany({}, { $set: { isActive: true } });
  },

  async down(db) {
    // This will remove the "isActive" field from all brands
    await db.collection('brands').updateMany({}, { $unset: { isActive: "" } });
  }
};
