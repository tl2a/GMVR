import { gql } from "@apollo/client"

const ADD_PROJECT = gql`
    mutation addProject($name: String!, $description: String!, $status: ProjectStatus!, $clientID: ID!){
        addProject(name: $name, description: $description, status: $status, clientID: $clientID){
            id
            name
            description
            status
            client {
                id
                name
                email
                phone
            }
        }
    }
`

const UPDATE_PROJECT = gql`
    mutation updateProject($id: ID!, $name: String!, $description: String!, $status: ProjectStatusUpdate!){
        updateProject(id: $id, name: $name, description: $description, status: $status){
            id
            name
            description
            status
            client {
                id
                name
                email
                phone
            }
        }
    }
`

const DELETE_PROJECT =gql`
    mutation DeleteProject($id: ID!) {
        deleteProject(id: $id) {
            id
        }
    }
`

export { ADD_PROJECT, UPDATE_PROJECT, DELETE_PROJECT }