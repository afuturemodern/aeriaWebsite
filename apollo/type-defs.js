import gql from 'graphql-tag';

export const typeDefs = gql`
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