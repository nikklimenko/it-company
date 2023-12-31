const CyrillicToTranslit = require('cyrillic-to-translit-js');

module.exports = {
  async up(db, client) {
    const cyrillicToTranslit = new CyrillicToTranslit();
    let categories = [
      {
        name: 'Freelance',
      },
      {
        name: 'Design',
      },
      {
        name: 'SMM',
      },
      {
        name: 'Target',
      },
      {
        name: 'Copywriting',
      },
    ];
    categories = categories.map(item => {
      item.url = cyrillicToTranslit.transform(item.name, "_").toLowerCase();
      return item;
    });

    await db.collection('categories').insertMany(categories);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
