import React from "react";
import styles from "../../pages/Home/Home.module.css";

import aboutImg from "../../assets/images/home/plant1.jpg";
import historyImg from "../../assets/images/home/plant1.jpg";
import specificImg from "../../assets/images/home/plant1.jpg";
import delicaciesImg from "../../assets/images/home/plant1.jpg";

const AboutSection = () => {
  return (
    <section id="about" className={styles.about}>
      <div className="container" data-aos="fade-up">
        <div className="row gy-4">
          {/* About Restaurant */}
          <div
            className={`col-lg-7 position-relative ${styles.aboutImg}`}
            style={{ backgroundImage: `url(${aboutImg})` }}
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <div className={styles.callUs}>
              <h2>About</h2>
            </div>
          </div>

          <div
            className={`col-lg-5 d-flex align-items-end ${styles.contentBlock}`}
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className={`content ps-0 ps-lg-5 ${styles.contentText}`}>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis veritatis assumenda placeat, hic maxime
                exercitationem ratione soluta doloremque odit possimus eum! Esse
                quaerat nam mollitia nulla optio debitis laboriosam nobis. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Quas odit
                quis reprehenderit voluptatibus eaque nam cupiditate architecto
                itaque eligendi temporibus quibusdam rem officiis hic veritatis,
                laborum nihil exercitationem eveniet repellat.
              </p>
            </div>
          </div>

          <hr className={styles.divider} />

          {/* Our History */}
          <div className="row gy-4">
            <div
              className={`col-lg-5 d-flex align-items-end ${styles.contentBlock}`}
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className={`content ps-0 ps-lg-5 ${styles.contentText}`}>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                  ab tenetur nesciunt quibusdam placeat id harum voluptate
                  veritatis sed minus. Accusantium ad corrupti soluta tempora
                  nesciunt in aspernatur ducimus autem. Lorem ipsum dolor sit
                  amet consectetur adipisicing elit. Minus ullam animi ratione
                  veniam. Error dignissimos fugit, distinctio repellat,
                  asperiores ea laboriosam fuga earum, architecto doloribus
                  minima quisquam similique aperiam quod!
                </p>
              </div>
            </div>

            <div
              className={`col-lg-7 position-relative ${styles.aboutImg}`}
              style={{ backgroundImage: `url(${historyImg})` }}
              data-aos="fade-up"
              data-aos-delay="150"
            >
              <div className={styles.callUs}>
                <h2>Our History</h2>
              </div>
            </div>
          </div>

          <hr className={styles.divider} />

          {/* Specific & Delicacies */}
          <div className="row gy-4">
            <div
              className={`col-lg-4 position-relative ${styles.aboutImg}`}
              style={{ backgroundImage: `url(${specificImg})` }}
              data-aos="fade-up"
              data-aos-delay="150"
            >
              <div className={styles.callUs}>
                <h2>Specific</h2>
              </div>
            </div>

            <div
              className={`col-lg-4 d-flex align-items-end ${styles.contentBlock}`}
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className={`content ps-0 ps-lg-5 ${styles.contentText}`}>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
                  quos enim, ullam inventore nobis aliquam sed ipsam cupiditate
                  provident ad cum corrupti, exercitationem labore rerum itaque
                  minima sequi, facere laboriosam. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Sed ab delectus dolor obcaecati
                  corrupti inventore ipsum perferendis et quidem, reprehenderit
                  distinctio, recusandae eius veniam modi. Eius corporis
                  perspiciatis fugit quaerat?
                </p>
              </div>
            </div>

            <div
              className={`col-lg-4 position-relative ${styles.aboutImg}`}
              style={{ backgroundImage: `url(${delicaciesImg})` }}
              data-aos="fade-up"
              data-aos-delay="150"
            >
              <div className={styles.callUs}>
                <h2>Delicacies</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
