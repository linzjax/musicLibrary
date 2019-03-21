# Music Library

(Submission for Primary's Take Home Assignment)

A small system for managing your music collection, accessed through the command line.

## Requirements
- node.js
- npm

## Build
```bash
$ npm install
$ chmod u+x music
$ ./music
```

# Commands
```bash
> add "Album" "Artist"
> play "Album"
> show [ all | unplayed | all by "Artist" | unplayed by "Artist" ]
```

Make sure your albums and artists are always entered with "double quotes". Otherwise, the program won't run properly.

## Testing

```bash
$ npm test
```
