import { Table, Button } from 'react-bootstrap';
import { EditIcon, DeleteIcon } from '../../../../assets/icons/Icons.jsx';
import { truncateText } from '../../../../assets/utils/helpers.js';

const ProductTable = ({ products, onEdit, onDelete }) => {
    return (
        <Table striped bordered hover className="mt-4">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products && products.length > 0 ? (
                    products.map((product) => (
                        <tr key={product._id}>
                            <td>{truncateText(product.name, 15)}</td>
                            <td>${product.price}</td>
                            <td>{truncateText(product.category.name, 15)}</td>
                            <td>{product.stock}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    onClick={() => {onEdit('update', product); console.log("Edit button clicked!")}}
                                    className="me-2"
                                >
                                    <EditIcon />
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => onDelete(product._id)}
                                >
                                    <DeleteIcon />
                                </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="text-center">No products found.</td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
};

export default ProductTable;
