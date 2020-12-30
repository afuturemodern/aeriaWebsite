import {ApolloServer, gql} from "apollo-server-micro";
import Knex from "knex";
import { schema } from '../../../apollo/schema.js'
import songs from "../songs";

var db = new Knex({
    client: 'mysql',
    connection: {
        host: process.env.HOST,
        database: process.env.DATABASE,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    },
    migrations: {
      tableName: 'songs_spotify'
    }
  });

const typeDefs = gql`
    type Query {
        songs(first: Int = 25, skip: Int = 0): [Songs!]!
    }
    type Songs{
        name: String!,
        artists: String!,
        danceability: Float!,
        energy: Float!,
        key: Int!,
        loudness: Float!,
        mode: Int!,
        speeechiness: Float!,
        acousticness: Float!,
        instrumentalness: Float!,
        liveness: Float!,
        valence: Float!,
        tempo: Float!,
        duration_ms: Float!,
        releaseYear: Int!,
    }
`;
'SELECT * from songs_spotify LIMIT 30'
const resolvers = {
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


const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
    // context: db,
});

const handler = apolloServer.createHandler({ path: "/api/graphql"})

export const config = {
    api: {
        bodyParser: false
    }
}


export default handler;

