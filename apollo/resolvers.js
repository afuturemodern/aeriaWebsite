

export const resolvers = {
    Query: {
        songs: (_parent, args, _context) => {
            return db
              .select('*')
              .from('songs_spotify')
            //   .orderBy("releaseYear", "asc")
              .limit(Math.min(args.first, 30))
              .offset(args.skip)
        }
    },

    // Song: {
    //     name: (_paren, _args, _context) => songs.name
    // }
}