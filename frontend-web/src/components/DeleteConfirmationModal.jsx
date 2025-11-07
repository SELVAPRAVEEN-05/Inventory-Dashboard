import Button from "./Button";
import Modal from "./Modal";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, productName, isLoading }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Product"
    >
      <div className="space-y-4">
        <div className="py-2">
          <p className="text-gray-600">
            Are you sure you want to delete the product{' '}
            <span className="font-medium text-gray-900">{productName}</span>?
            This action cannot be undone.
          </p>
        </div>
        <div className="flex justify-end space-x-3 gap-4 pt-4">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            loading={isLoading}
          >
            Delete Product
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;