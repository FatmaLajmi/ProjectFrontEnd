import { useEffect } from "react";
import { Button, Alert, OverlayTrigger, Tooltip } from "react-bootstrap";
import useCategories from "../../../hooks/useCategory.js";
import usePagination from "../../../hooks/usePagination.js";
import Loader from "../../../components/loader/Loader.jsx";
import Pagination from "../../../components/pagination/Pagination.jsx";
import CategoryModal from "./components/CategoryModal.jsx";
import CategoryTable from "./components/CategoryTable.jsx";

const CategoriesPage = () => {
  const {
    categories,
    categoryData,
    isLoading,
    error,
    showModal,
    modalAction,
    getAllCategories,
    handleSubmitForm,
    handleShowModal,
    handleCloseModal,
    handleDeleteCategory,
    handleInputChange,
    getCategoryById,
  } = useCategories();

  const { currentPage, currentItems, totalPages, handlePageChange } =
    usePagination(categories, 10);

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="container mt-4">
      {error && <Alert variant="danger">{error}</Alert>}

      <div className="d-flex justify-content-between">
        <h1>Categories List</h1>
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip id="create-tooltip"> Create a new Category </Tooltip>
          }
        >
          <Button
            variant="primary"
            onClick={() => handleShowModal("create")}
            disabled={isLoading}
          >
            Add Category
          </Button>
        </OverlayTrigger>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <CategoryTable
            categories={currentItems}
            onEdit={handleShowModal}
            onDelete={handleDeleteCategory}
          />

          {!error && currentItems?.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}

          <CategoryModal
            show={showModal}
            onHide={handleCloseModal}
            action={modalAction}
            categoryData={categoryData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmitForm}
            isLoading={isLoading}
            error={error}
          />
        </>
      )}
    </div>
  );
};

export default CategoriesPage;
