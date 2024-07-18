interface ModalProps {
  onClose: () => void
  onConfirm: () => void
}

const Modal = ({ onClose, onConfirm }: ModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10">
        <h2 className="text-xl font-semibold mb-4">차단 해제 확인</h2>
        <p className="mb-4">선택된 사용자의 차단을 해제하시겠습니까?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            차단 해제
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
