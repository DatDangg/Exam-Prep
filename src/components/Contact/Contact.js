import styles from './Contact.module.css'
import phoneIcon from '../../assets/img/phone.svg';
import zaloIcon from '../../assets/img/zalo.svg';
import messengerIcon from '../../assets/img/messenger.svg';

function Contact() {
    return (
        <div className={styles.contact}>
            <ul className={styles.contactList}>
                <li className={styles.contactItem}>
                    <a href='#' className={styles.contactLink}>
                        <img src={zaloIcon} alt="Facebook" className={styles.img} />
                    </a>
                </li>
                <li className={styles.contactItem}>
                    <a href='#' className={styles.contactLink}>
                        <img src={messengerIcon} alt="Facebook" className={styles.img} />
                    </a>
                </li>
                <li className={styles.contactItem}>
                    <a href='#' className={styles.contactLink}>
                        <img src={phoneIcon} alt="phone" className={styles.img} />
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Contact