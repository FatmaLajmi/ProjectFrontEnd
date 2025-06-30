import { Table, Button } from 'react-bootstrap';
import { EditIcon, DeleteIcon } from '../../../../assets/icons/Icons.jsx';
import { truncateText } from '../../../../assets/utils/helpers.js';

const CategoryTable = ({ categories, onEdit, onDelete }) => {
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
                {categories && categories.length > 0 ? (
                    categories.map((category) => (
                        <tr key={category._id}>
                            <td>{truncateText(category.name, 10)}</td>
                            <td>{truncateText(category.description, 10)}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    onClick={() => onEdit('update', category)}
                                    className="me-2"
                                >
                                    <EditIcon />
                                </Button>

                                <Button
                                    variant="danger"
                                    onClick={() => onDelete(category._id)}
                                >
                                    <DeleteIcon />
                                </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3" className="text-center">No categories found.</td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
};

export default CategoryTable;
