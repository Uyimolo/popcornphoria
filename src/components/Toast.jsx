import { useSelector } from 'react-redux';

const Toast = () => {
  const toast = useSelector((state) => state.toast);
  const { toastType, toastMessage } = toast;

  return (
    toastMessage && (
      <div className={`toast-container ${toastType}`}>
        <div className='toast-message'>{toastMessage}</div>
        <div className='toast-progress-bar'></div>
      </div>
    )
  );
};

export default Toast;
