import { useState } from "react"
import { FaList } from "react-icons/fa"
import { useMutation, useQuery } from "@apollo/client"
import { GET_PROJECTS } from "../queries/projectQueries"
import { GET_CLIENTS } from "../queries/clientQueries"
import { ADD_PROJECT } from "../mutations/projectMutations"

export default function AddProjectModal() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [clientID, setClientID] = useState('')
    const [status, setStatus] = useState('new')

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name, description, status, clientID },
        update(cache, { data: { addProject } }) {
            const { projects } = cache.readQuery({ query: GET_PROJECTS });
            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: [...projects, addProject] },
            })
        }
    })

    // Get clients for select
    const { loading, error, data } = useQuery(GET_CLIENTS)

    const onSubmit = (e) => {
        e.preventDefault();
        
        if(name === '' || description === '' || status === '') {
            return alert('Please fill in all fields')
        }

        addProject(name, description, status, clientID)

        setName('')
        setDescription('')
        setStatus('new')
        setClientID('')
    }


    if(loading) return null
    if(error) return 'Something Went Wrong'

  return (
    <>
        {!loading && !error && (<>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
            <div className="d-flex align-items-center">
                <FaList />
                <div className="ms-2">Add Project</div>
            </div>
        </button>

        <div className="modal fade" id="addProjectModal" tabIndex="-1" aria-labelledby="addProjectModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="addProjectModalLabel">New Project</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea type="text" className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Status</label>
                        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="form-select">
                            <option value="new">Not Started</option>
                            <option value="progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Client</label>
                        <select value={clientID} onChange={(e) => setClientID(e.target.value)} id="clientID" className="form-select">
                            <option value="">Select Client</option>
                            {data.clients.map(client => (
                                <option key={client.id} value={client.id}>{client.name}</option>
                            )) }
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Create</button>
                </form>
            </div>
            </div>
        </div>
        </div>
        </>
        )}
    </>
  )
}
