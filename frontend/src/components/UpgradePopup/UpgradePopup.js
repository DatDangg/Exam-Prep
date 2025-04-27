import styles from './UpgradePopup.module.css';

function UpgradePopup({
  showPayment,
  onClose,
  onSwitchToPayment,
  onConfirmPayment
}) {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        {!showPayment ? (
          <>
            <h2 className={styles.popupTitle}>🎯 Nâng cấp tài khoản VIP</h2>
            <ul className={styles.benefitList}>
              <li>✅ Truy cập toàn bộ đề thi hiện có</li>
              <li>✅ Làm bài không giới hạn số lần</li>
              <li>✅ Cập nhật đề mới liên tục</li>
            </ul>
            <div className={styles.price}>99.000đ / tháng</div>
            <div className={styles.buttonGroup}>
              <button 
                className={styles.upgradeButton}
                onClick={onSwitchToPayment}
              >
                Nâng cấp ngay
              </button>
              <button 
                className={styles.cancelButton}
                onClick={onClose}
              >
                Hủy
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className={styles.popupTitle}>💳 Thanh toán</h2>
            <div className={styles.qrSection}>
              <img src="/QR.jpeg" alt="QR thanh toán" className={styles.qrImage} />
              <p>Quét QR để thanh toán 50.000đ</p>
            </div>
            <div className={styles.buttonGroup}>
              <button 
                className={styles.upgradeButton}
                onClick={onConfirmPayment}
              >
                Tôi đã thanh toán
              </button>
              <button 
                className={styles.cancelButton}
                onClick={onClose}
              >
                Hủy
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UpgradePopup;
