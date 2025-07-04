import { useEffect } from 'react';
import { Button, Alert, OverlayTrigger, Tooltip, Form, Row, Col, Spinner } from 'react-bootstrap';
import useProducts from '../../../hooks/useProduct.js';
import usePagination from '../../../hooks/usePagination.js';
import { CreateIcon } from '../../../assets/icons/Icons.jsx';
import Loader from '../../../components/loader/Loader.jsx';
import Pagination from '../../../components/pagination/Pagination.jsx';
import ProductModal from './components/ProductModal.jsx';
import ProductTable from './components/ProductTable.jsx';
import useCategories from '../../../hooks/useCategory.js';

const ProductsPage = () => {

const {
  products,
  productData,
  isLoading,
  error,
  showModal,
  modalAction,
  selectedFilterCategory,
  getAllProducts,
  handleSubmitForm,
  handleShowModal,
  handleCloseModal,
  handleDeleteProduct,
  handleInputChange,
  getProductsByCategory, 
  setSelectedFilterCategory,
} = useProducts();

const {
        getAllCategories,
        categories,
} = useCategories();

    const { currentPage, currentItems, totalPages, handlePageChange } =
        usePagination(products, 10);

    useEffect(() => {
        getAllProducts();
        getAllCategories();
    }, []);
    useEffect(() => {
        getProductsByCategory(selectedFilterCategory);
    }, [selectedFilterCategory]); 


   return (
        <div className="container mt-4">
            {error && <Alert variant="danger">{error}</Alert>}

            <div className='d-flex justify-content-between align-items-center mb-3'> 
                <h1>Products List</h1>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="create-tooltip"> Create a new Product </Tooltip>}
                >
                    <Button
                        variant="primary"
                        onClick={() => handleShowModal('create', null)} 
                        disabled={isLoading}
                    >
                        Add Product
                    </Button>
                </OverlayTrigger>
            </div>

            {/* Filter Section */}
            <Row className="mb-4 d-flex align-items-end"> 
                <Col md={4}>
                    <Form.Group controlId="categoryFilter">
                        <Form.Label>Filter by Category:</Form.Label>
                        <Form.Select
                            value={selectedFilterCategory}
                            onChange={(e) => setSelectedFilterCategory(e.target.value)}
                            disabled={isLoading}
                        >
                            <option value="">All Categories</option> 
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={8} className="d-flex justify-content-end align-items-end">
                </Col>
            </Row>


            {isLoading ? (
                <Loader />
            ) : (
                <>
                    {currentItems && currentItems.length > 0 ? (
                        <ProductTable
                            products={currentItems}
                            onEdit={handleShowModal}
                            onDelete={handleDeleteProduct}
                        />
                    ) : (
                        <Alert variant="info" className="text-center">
                            No products found. {selectedFilterCategory ? "Try selecting 'All Categories'." : "Add a new product to get started!"}
                        </Alert>
                    )}


                    {!error && currentItems?.length > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}

                    <ProductModal
                        show={showModal}
                        onHide={handleCloseModal}
                        action={modalAction}
                        productData={productData}
                        onInputChange={handleInputChange}
                        onSubmit={handleSubmitForm}
                        isLoading={isLoading}
                        categories={categories} 
                    />
                </>
            )}

        </div>
    );
};

export default ProductsPage;
