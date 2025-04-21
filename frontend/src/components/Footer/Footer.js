import styles from './Footer.module.css'
import facebookIcon from '../../assets/img/facebook.svg';
import zaloIcon from '../../assets/img/zalo.svg';
import messengerIcon from '../../assets/img/messenger.svg';

function Footer() {
    return (
        <div className={styles.footer}>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 col-md-6'>
                        <span className={styles.webName}>/place link of website/</span>
                        <div className={styles.webSlogan}>Luôn đặt lợi ích của thí sinh lên hàng đầu</div>
                        <ul className={styles.contact}>
                            <li className={styles.contactItem}>
                                <a href='#' className={styles.contactLink}>
                                    <img src={zaloIcon} alt="Facebook" className={styles.img} />
                                    0000.000.000
                                </a>
                            </li>
                            <li className={styles.contactItem}>
                                <a href='#' className={styles.contactLink}>
                                    <img src={messengerIcon} alt="Facebook" className={styles.img} />
                                    Luyen thi Meomeo
                                </a>
                            </li>
                            <li className={styles.contactItem}>
                                <a href='#' className={styles.contactLink}>
                                    <img src={facebookIcon} alt="Facebook" className={styles.img} />
                                    Luyen thi Meomeo
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className='col-6 col-md-3'>
                        <div className={styles.sectionTitle}>Dịch vụ</div>
                        <ul className={styles.sectionList}>
                            <li className={styles.sectionItem}>
                                <a href='#' className={styles.sectionLink}>Thi thử</a>
                            </li>
                            <li className={styles.sectionItem}>
                                <a href='#' className={styles.sectionLink}>Luyện đề</a>
                            </li>
                            <li className={styles.sectionItem}>
                                <a href='#' className={styles.sectionLink}>Tài khoản VIP</a>
                            </li>
                        </ul>
                    </div>
                    <div className='col-6 col-md-3'>
                    <div className={styles.sectionTitle}>Thông tin</div>
                        <ul className={styles.sectionList}>
                            <li className={styles.sectionItem}>
                                <a href='#' className={styles.sectionLink}>Lịch sử</a>
                            </li>
                            <li className={styles.sectionItem}>
                                <a href='#' className={styles.sectionLink}>Hướng dẫn sử dụng</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer