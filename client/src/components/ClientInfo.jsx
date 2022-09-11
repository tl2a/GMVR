import { FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa"

export default function ClientInfo({ client }) {
  return (
    <>
        <h5 className="mt-5">Client Information</h5>
        <ul className="list-group">
            <li className="list-group-item">
                <FaIdBadge className="mr-3" /> {client.name}
            </li>
            <li className="list-group-item">
                <FaEnvelope className="mr-3" /> {client.email}
            </li>
            <li className="list-group-item">
                <FaPhone className="mr-3" /> {client.phone}
            </li>
        </ul>
    </>
  )
}
