import { Table, Button } from 'react-bootstrap';
import { EditIcon, DeleteIcon } from '../../../../assets/icons/Icons.jsx';
import { truncateText } from '../../../../assets/utils/helpers.js';

const UserTable = ({ users, onEdit, onDelete }) => {
    return (
        <Table striped bordered hover className="mt-4">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Image</th>
                    <th>Admin</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users && users.length > 0 ? (
                    users.map((user) => (
                        <tr key={user._id}>
                            <td>{truncateText(user.name, 20)}</td>
                            <td>{truncateText(user.email, 25)}</td>
                            <td>
                                {user.image ? (
                                    <img
                                        src={user.image}
                                        alt={user.name}
                                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }}
                                    />
                                ) : (
                                    'N/A'
                                )}
                            </td> 
                            <td>{user.isAdmin ? 'Yes' : 'No'}</td> 
                            <td>
                                <Button
                                    variant="warning"
                                    onClick={() => onEdit('update', user)}
                                    className="me-2"
                                >
                                    <EditIcon />
                                </Button>

                                <Button
                                    variant="danger"
                                    onClick={() => onDelete(user._id)}
                                >
                                    <DeleteIcon />
                                </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="text-center">No users found.</td> 
                    </tr>
                )}
            </tbody>
        </Table>
    );
};

export default UserTable;