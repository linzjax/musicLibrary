const show    = require('../app/show');
const add     = require('../app/add');
const play    = require('../app/play');
const library = require('../app/models');

// These tests are a little weird because the functions don't return anything,
// so I'm mostly just making sure they don't throw errors.
describe("Show Functions", function() {
  it("successfully shows all albums", function() {
    expect(show.all()).toBe(undefined);
  });

  it("successfully shows all albums by an artist", function() {
    add.album("add \"28 Days In The Valley\" \"Dorothy\"");
    add.album("add \"ROCKISDEAD\" \"Dorothy\"");
    expect(show.allByArtist("show all by \"Dorothy\"")).toBe(undefined);
  });

  it("doesn't throw an error if the artist is improperly formatted", function() {
    expect(show.allByArtist("show all by Dorothy")).toBe(undefined);
    expect(show.allByArtist("show all by")).toBe(undefined);
  });

  it("doesn't throw an error if the artist is unknown", function() {
    expect(show.allByArtist("show all by \"Not An Artist\"")).toBe(undefined);
  });

  it("successfully shows all unplayed albums", function() {
    expect(show.unplayed()).toBe(undefined);
  });

  it("successfully shows all unplayed albums by an artist", function() {
    add.album("add \"Broken Machine\" \"Nothing But Thieves\"");
    add.album("add \"Nothing But Thieves\" \"Nothing But Thieves\"");
    expect(show.unplayedByArtist("play unplayed by \"Nothing But Thieves\"")).toBe(undefined);

    play.album("play \"Broken Machine\"");
    expect(show.unplayedByArtist("play unplayed by \"Nothing But Thieves\"")).toBe(undefined);
    play.album("play \"Nothing But Thieves\"");
    expect(show.unplayedByArtist("play unplayed by \"Nothing But Thieves\"")).toBe(undefined);
  });

  it("doesn't throw an error if the artist is improperly formatted", function() {
    expect(show.unplayedByArtist("show unplayed by Dorothy")).toBe(undefined);
    expect(show.unplayedByArtist("show unplayed by")).toBe(undefined);
  });

  it("doesn't fail if there are no albums", function() {
    // reset albums to empty
    library.artists = {};
    library.albums = {};
    expect(show.all()).toBe(undefined);
    expect(show.unplayed()).toBe(undefined);
    expect(show.allByArtist("show all by \"Dorothy\"")).toBe(undefined);
    expect(show.unplayed()).toBe(undefined);
    expect(show.unplayedByArtist("play unplayed by \"Nothing But Thieves\"")).toBe(undefined);
  });
});
