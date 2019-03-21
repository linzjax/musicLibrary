const show    = require('../app/show');
const add     = require('../app/add');
const play    = require('../app/play');
const error   = require('../app/error');
const library = require('../app/models');

function resetLibrary() {
  library.artists = {};
  library.albums = {};
  add.album("add \"28 Days In The Valley\" \"Dorothy\"");
  add.album("add \"ROCKISDEAD\" \"Dorothy\"");
  add.album("add \"Broken Machine\" \"Nothing But Thieves\"");
  add.album("add \"Nothing But Thieves\" \"Nothing But Thieves\"");
}

// These tests are a little weird because the functions don't return anything,
// so I'm mostly just making sure they don't throw errors.
describe("Show Functions", function() {
  // SHOW ALL FUNCTIONS
  it("successfully shows all albums", function() {
    resetLibrary();
    expect(show.all()).toEqual(["\"28 Days In The Valley\" by Dorothy (unplayed)",
                                "\"ROCKISDEAD\" by Dorothy (unplayed)",
                                "\"Broken Machine\" by Nothing But Thieves (unplayed)",
                                "\"Nothing But Thieves\" by Nothing But Thieves (unplayed)"]);

    play.album("play \"ROCKISDEAD\"");
    expect(show.all()).toEqual(["\"28 Days In The Valley\" by Dorothy (unplayed)",
                                "\"ROCKISDEAD\" by Dorothy (played)",
                                "\"Broken Machine\" by Nothing But Thieves (unplayed)",
                                "\"Nothing But Thieves\" by Nothing But Thieves (unplayed)"]);
  });

  it("successfully shows all albums by an artist", function() {
    resetLibrary();
    expect(show.allByArtist("show all by \"Dorothy\""))
                .toEqual(["\"28 Days In The Valley\" by Dorothy (unplayed)",
                          "\"ROCKISDEAD\" by Dorothy (unplayed)"]);

    play.album("play \"ROCKISDEAD\"");
    expect(show.allByArtist("show all by \"Dorothy\""))
                .toEqual(["\"28 Days In The Valley\" by Dorothy (unplayed)",
                          "\"ROCKISDEAD\" by Dorothy (played)"]);
  });

  it("doesn't throw an error if the artist is improperly formatted", function() {
    resetLibrary();
    expect(show.allByArtist("show all by Dorothy")).toEqual([error.unknownArtist(undefined)]);
    expect(show.allByArtist("show all by")).toEqual([error.unknownArtist(undefined)]);
  });

  it("doesn't throw an error if the artist is unknown", function() {
    resetLibrary();
    expect(show.allByArtist("show all by \"Not An Artist\""))
               .toEqual([error.unknownArtist("Not An Artist")]);
  });

  // SHOW UNPLAYED FUNCTIONS
  it("successfully shows all unplayed albums", function() {
    resetLibrary();
    expect(show.unplayed()).toEqual(["\"28 Days In The Valley\" by Dorothy (unplayed)",
                                "\"ROCKISDEAD\" by Dorothy (unplayed)",
                                "\"Broken Machine\" by Nothing But Thieves (unplayed)",
                                "\"Nothing But Thieves\" by Nothing But Thieves (unplayed)"]);

    play.album("play \"ROCKISDEAD\"");
    expect(show.unplayed()).toEqual(["\"28 Days In The Valley\" by Dorothy (unplayed)",
                                     "\"Broken Machine\" by Nothing But Thieves (unplayed)",
                                     "\"Nothing But Thieves\" by Nothing But Thieves (unplayed)"]);
  });

  it("successfully shows all unplayed albums by an artist", function() {
    resetLibrary();
    expect(show.unplayedByArtist("show unplayed by \"Dorothy\""))
               .toEqual(["\"28 Days In The Valley\" by Dorothy (unplayed)",
                          "\"ROCKISDEAD\" by Dorothy (unplayed)"]);

    play.album("play \"ROCKISDEAD\"");
    expect(show.unplayedByArtist("show unplayed by \"Dorothy\""))
               .toEqual(["\"28 Days In The Valley\" by Dorothy (unplayed)"]);

    play.album("play \"28 Days In The Valley\"");
    expect(show.unplayedByArtist("show unplayed by \"Dorothy\""))
               .toEqual([error.emptyUnplayed()]);
  });

  it("doesn't throw an error if the artist is improperly formatted", function() {
    resetLibrary();
    expect(show.unplayedByArtist("show unplayed by Dorothy")).toEqual([error.unknownArtist(undefined)]);
    expect(show.unplayedByArtist("show unplayed by")).toEqual([error.unknownArtist(undefined)]);
  });

  it("doesn't fail if there are no albums", function() {
    // reset albums to empty
    library.artists = {};
    library.albums = {};
    expect(show.all()).toEqual([error.emptyLibrary()]);
    expect(show.unplayed()).toEqual([error.emptyLibrary()]);
    expect(show.allByArtist("show all by \"Dorothy\"")).toEqual([error.emptyLibrary()]);
    expect(show.unplayed()).toEqual([error.emptyLibrary()]);
    expect(show.unplayedByArtist("play unplayed by \"Nothing But Thieves\"")).toEqual([error.emptyLibrary()]);
  });
});
