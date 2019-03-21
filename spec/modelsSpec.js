const library = require('../app/models');

describe("Library Models", function() {
  it("creates a new album with artist, title, and played info", function() {
    let album = new library.Album("Beyonce", "Lemonade");
    expect(album.artist).toBe("Beyonce");
    expect(album.title).toBe("Lemonade");
    expect(album.played).toBe(false);
  });

  it("creates a new artist with name, and array of albums", function() {
    let artist = new library.Artist("AC/DC", "The Razors Edge");
    expect(artist.name).toBe("AC/DC");
    expect(artist.albums).toEqual(["The Razors Edge"]);

    artist.albums.push("Stiff Upper Lip")
    expect(artist.albums).toEqual(["The Razors Edge", "Stiff Upper Lip"]);
  });
});
