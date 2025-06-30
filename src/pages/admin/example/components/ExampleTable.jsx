import { Table, Button } from 'react-bootstrap';
import { EditIcon, DeleteIcon } from '../../../../assets/icons/Icons.jsx';
import { truncateText } from '../../../../assets/utils/helpers.js';

const ExampleTable = ({ examples, onEdit, onDelete }) => {
    return (
        <Table striped bordered hover className="mt-4">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {examples && examples.length > 0 ? (
                    examples.map((example) => (
                        <tr key={example._id}>
                             <td>{truncateText(example.name, 10)}</td>
                             <td>{truncateText(example.description, 10)}</td>
                            <td>
                                    <Button
                                        variant="warning"
                                        onClick={() => onEdit('update', example)} // Call onEdit with 'update' action and example data
                                        className="me-2"
                                    >
                                        <EditIcon />
                                    </Button>

                                    <Button
                                        variant="danger"
                                        onClick={() => onDelete(example._id)} // Call onDelete with example ID
                                    >
                                        <DeleteIcon />
                                    </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3" className="text-center">No examples found.</td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
};

export default ExampleTable;