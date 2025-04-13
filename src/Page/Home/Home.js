import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.homeBanner}>
        <div className={`container`}>
          <div className={`row ${styles.banner}`}>
            <div className="col-md-6 d-flex flex-column align-items-center">
              <div className={styles.bannerTitle}>Thi thử trực tuyến miễn phí</div>
              <div className={styles.bannerDesc}>
                Nơi cung cấp đề thi và lời giải chi tiết cùng việc hỗ trợ các câu hỏi khó
                meo meo meo meo meo
              </div>
              <button className={styles.bannerBtn}>Vào thi ngay</button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.homeService}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 d-flex align-items-center">
              <div>
                <div className={styles.homeItemHeading}>Dịch vụ của chúng tôi</div>
                <div className={styles.serviceDesc}>
                  Được thiết kế để đem lại tối đa lợi ích cho thí sinh trong quá
                  trình ôn luyện thi, meo meo meo meo meo meo meo meo
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <img src="/illustration-3.png" className={styles.serviceImg}></img>
            </div>
          </div>
          <div className={`row ${styles.serviceRow}`}>
            <div className={`col-lg-6 ${styles.serviceWrap}`}>
              <div className={styles.serviceBorder}>
                <div className={styles.serviceItemHead}>Phần mềm thi thử</div>
                <div className={styles.serviceItemDesc}>
                  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" width="1em" height="1em" stroke="#2c7be5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                    <path d="M14.25 8.75c-.5 2.5-2.38 4.85-5.03 5.38-2.65.53-5.33-.7-6.66-3.05C1.23 8.73 1.56 5.8 3.38 3.8c1.81-2 4.87-2.55 7.38-1.55" />
                    <polyline points="5.75 7.75 8.25 10.25 14.25 3.75" />
                  </svg>
                  Làm quen với giao diện, các chức năng của phần mềm thi trên máy tính.
                </div>
                <div className={styles.serviceItemDesc}>
                  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" width="1em" height="1em" stroke="#2c7be5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                    <path d="M14.25 8.75c-.5 2.5-2.38 4.85-5.03 5.38-2.65.53-5.33-.7-6.66-3.05C1.23 8.73 1.56 5.8 3.38 3.8c1.81-2 4.87-2.55 7.38-1.55" />
                    <polyline points="5.75 7.75 8.25 10.25 14.25 3.75" />
                  </svg>
                  Nắm rõ được định dạng đề thi, các bước làm bài thi.
                </div>
                <div className={styles.serviceItemDesc}>
                  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" width="1em" height="1em" stroke="#2c7be5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                    <path d="M14.25 8.75c-.5 2.5-2.38 4.85-5.03 5.38-2.65.53-5.33-.7-6.66-3.05C1.23 8.73 1.56 5.8 3.38 3.8c1.81-2 4.87-2.55 7.38-1.55" />
                    <polyline points="5.75 7.75 8.25 10.25 14.25 3.75" />
                  </svg>
                  Ôn luyện không giới hạn với kho đề thi khổng lồ được cập nhật mới thường xuyên.
                </div>
                <div className={styles.serviceItemDesc}>
                  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" width="1em" height="1em" stroke="#2c7be5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                    <path d="M14.25 8.75c-.5 2.5-2.38 4.85-5.03 5.38-2.65.53-5.33-.7-6.66-3.05C1.23 8.73 1.56 5.8 3.38 3.8c1.81-2 4.87-2.55 7.38-1.55" />
                    <polyline points="5.75 7.75 8.25 10.25 14.25 3.75" />
                  </svg>
                  Tương thích với mọi thiết bị: máy tính, điện thoại... Bạn có thể ôn luyện ở bất cứ đâu.
                </div>
              </div>
              <div className={styles.serviceBorder}>
                <div className={styles.serviceItemHead}>Chấm thi</div>
                <div className={styles.serviceItemDesc}>
                  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" width="1em" height="1em" stroke="#2c7be5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                    <path d="M14.25 8.75c-.5 2.5-2.38 4.85-5.03 5.38-2.65.53-5.33-.7-6.66-3.05C1.23 8.73 1.56 5.8 3.38 3.8c1.81-2 4.87-2.55 7.38-1.55" />
                    <polyline points="5.75 7.75 8.25 10.25 14.25 3.75" />
                  </svg>
                  Có ngay kết quả bài thi trắc nghiệm, tự đánh giá được năng lực hiện tại.
                </div>
                <div className={styles.serviceItemDesc}>
                  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" width="1em" height="1em" stroke="#2c7be5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                    <path d="M14.25 8.75c-.5 2.5-2.38 4.85-5.03 5.38-2.65.53-5.33-.7-6.66-3.05C1.23 8.73 1.56 5.8 3.38 3.8c1.81-2 4.87-2.55 7.38-1.55" />
                    <polyline points="5.75 7.75 8.25 10.25 14.25 3.75" />
                  </svg>
                  Chấm bài meo meo meo meo
                </div>
              </div>
            </div>
            <div className={`col-lg-6 ${styles.serviceWrap}`}>
              <div className={styles.serviceBorder}>
                <div className={styles.serviceItemHead}>Luyện đề</div>
                <div className={styles.serviceItemDesc}>
                  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" width="1em" height="1em" stroke="#2c7be5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                    <path d="M14.25 8.75c-.5 2.5-2.38 4.85-5.03 5.38-2.65.53-5.33-.7-6.66-3.05C1.23 8.73 1.56 5.8 3.38 3.8c1.81-2 4.87-2.55 7.38-1.55" />
                    <polyline points="5.75 7.75 8.25 10.25 14.25 3.75" />
                  </svg>
                  Ôn luyện không giới hạn với kho đề thi khổng lồ được cập nhật mới thường xuyên.
                </div>
                <div className={styles.serviceItemDesc}>
                  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" width="1em" height="1em" stroke="#2c7be5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                    <path d="M14.25 8.75c-.5 2.5-2.38 4.85-5.03 5.38-2.65.53-5.33-.7-6.66-3.05C1.23 8.73 1.56 5.8 3.38 3.8c1.81-2 4.87-2.55 7.38-1.55" />
                    <polyline points="5.75 7.75 8.25 10.25 14.25 3.75" />
                  </svg>
                  Tương thích với mọi thiết bị: máy tính, điện thoại... Bạn có thể ôn luyện ở bất cứ đâu.
                </div>
                <div className={styles.serviceItemDesc}>
                  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" width="1em" height="1em" stroke="#2c7be5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                    <path d="M14.25 8.75c-.5 2.5-2.38 4.85-5.03 5.38-2.65.53-5.33-.7-6.66-3.05C1.23 8.73 1.56 5.8 3.38 3.8c1.81-2 4.87-2.55 7.38-1.55" />
                    <polyline points="5.75 7.75 8.25 10.25 14.25 3.75" />
                  </svg>
                  Luyện thi với lời giải chi tiết và sự hỗ trợ nhiệt tình của admin.
                </div>
              </div>
              <div className={styles.serviceBorder}>
                <div className={styles.serviceItemHead}>Các dịch vụ khác</div>
                <div className={styles.serviceItemDesc}>
                  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" width="1em" height="1em" stroke="#2c7be5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                    <path d="M14.25 8.75c-.5 2.5-2.38 4.85-5.03 5.38-2.65.53-5.33-.7-6.66-3.05C1.23 8.73 1.56 5.8 3.38 3.8c1.81-2 4.87-2.55 7.38-1.55" />
                    <polyline points="5.75 7.75 8.25 10.25 14.25 3.75" />
                  </svg>
                  Meo meo meo.
                </div>
                <div className={styles.serviceItemDesc}>
                  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" width="1em" height="1em" stroke="#2c7be5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                    <path d="M14.25 8.75c-.5 2.5-2.38 4.85-5.03 5.38-2.65.53-5.33-.7-6.66-3.05C1.23 8.73 1.56 5.8 3.38 3.8c1.81-2 4.87-2.55 7.38-1.55" />
                    <polyline points="5.75 7.75 8.25 10.25 14.25 3.75" />
                  </svg>
                  Hỗ trợ dự đoán tài xỉu.
                </div>
                <div className={styles.serviceItemDesc}>
                  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" width="1em" height="1em" stroke="#2c7be5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                    <path d="M14.25 8.75c-.5 2.5-2.38 4.85-5.03 5.38-2.65.53-5.33-.7-6.66-3.05C1.23 8.73 1.56 5.8 3.38 3.8c1.81-2 4.87-2.55 7.38-1.55" />
                    <polyline points="5.75 7.75 8.25 10.25 14.25 3.75" />
                  </svg>
                  Đầu tư không lời tại đây.
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.homeGoal}>
        <div className="container">
          <div className="row">
            <div className={styles.homeItemHeading}>Thành tựu của chúng tôi</div>
          </div>
          <div className={`row ${styles.goalRow}`}>
            <div className={`col-xl col-md-6 col-12 ${styles.goalItem}`}>
              <div className={styles.goalWrap}>
                <div>
                  <div className={styles.goalTitle}> Lượt thi </div>
                  <div className={styles.goalCount}> 9,999,999 </div>
                </div>
                <div className={styles.goalImg}>
                  <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="transparent">
                    <path
                      fill="#95AAC9"
                      d="M15.198 3.52a1.612 1.612 0 012.223 2.336L6.346 16.421l-2.854.375 1.17-3.272L15.197 3.521zm3.725-1.322a3.612 3.612 0 00-5.102-.128L3.11 12.238a1 1 0 00-.253.388l-1.8 5.037a1 1 0 001.072 1.328l4.8-.63a1 1 0 00.56-.267L18.8 7.304a3.612 3.612 0 00.122-5.106zM12 17a1 1 0 100 2h6a1 1 0 100-2h-6z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className={`col-xl col-md-6 col-12 ${styles.goalItem}`}>
              <div className={styles.goalWrap}> 
                <div>
                  <div className={styles.goalTitle}> Thí sinh </div>
                  <div className={styles.goalCount}> 5 </div>
                </div>
                <div className={styles.goalImg}>
                  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" strokeWidth="6" stroke="#95AAC9" fill="none" transform="matrix(-1, 0, 0, 1, 0, 0)">
                    <circle cx="32" cy="18.14" r="11.14" />
                    <path
                      d="M54.55,56.85A22.55,22.55,0,0,0,32,34.3h0A22.55,22.55,0,0,0,9.45,56.85Z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className={`col-xl col-md-6 col-12 ${styles.goalItem}`}>
              <div className={styles.goalWrap}>
                <div>
                  <div className={styles.goalTitle}> Ngân hàng câu hỏi </div>
                  <div className={styles.goalCount}> 9,999,999 </div>
                </div>
                <div className={styles.goalImg}>
                  <svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#95AAC9">
                    <path
                      d="M9 17H15M9 13H15M9 9H10
                        M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V9
                        M13 3L19 9
                        M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19"
                      stroke="#95AAC9"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.homeGuide}>
        <div className="container">
        <div className="row">
            <div className="col-lg-5">
              <div>
                <div className={styles.homeItemHeading}>Phần mềm thi thử mô phỏng 100% phần mềm thi chính thức</div>
                <div className={styles.guideDesc}>
                  Phần mềm được phát triển hoạt động trên mọi nền tảng từ laptop đến điện thoại để 
                  phục vụ nhu cầu ôn luyện, thi thử của các bạn thí sinh trước mỗi kỳ thi. 
                  Đăng ký thi dễ dàng với quy trình thi như sau:
                </div>
                  <ol className={styles.descList}>
                    <li><Link to='/register'>Đăng ký</Link> tài khoản trực tuyến</li>
                    <li>Hệ thống tự động cấp tài khoản thi trực tuyến ngay sau khi đăng ký, đồng thời gửi thông tin qua email</li>
                    <li>Đăng nhập hệ thống</li>
                    <li>Nhận đề, vào thi</li>
                    <li>Bấm <strong>Nộp bài</strong> khi làm xong</li>
                    <li>Nhận ngay điểm thi và kết quả cùng lời giải</li>
                  </ol>
              </div>
            </div>
            <div className="col-lg-7">
              <img src="/illustration-3.png" className={styles.serviceImg}></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
