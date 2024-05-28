import React from 'react';
import Image from 'next/image'
import styles from './features.module.css'

const Features = () => {
    return (
        <div id="features" className={styles.features}>
            <div className={styles.featureListContainer}>
                <div className={styles.featureItem}>
                    <h4 className={styles.featureBullet}>Visualize contributions with dynamic charts</h4>
                    <Image src="/TeamToken_PieChart.png" alt="Pie Chart" width="200" height="400" className={styles.mobileScreenshot} />
                </div>
                <div className={styles.featureItem}>
                    <h4 className={styles.featureBullet}>Effortlessly log time and financial investments</h4>
                    <Image src="/AddEntry.png" alt="Add Entry" width="200" height="400" className={styles.mobileScreenshot} />
                </div>
                <div className={styles.featureItem}>
                    <h4 className={styles.featureBullet}>Comprehensive cap table with detailed contributions</h4>
                    <Image src="/CapTable.png" alt="Cap Table" width="200" height="400" className={styles.mobileScreenshot} />
                </div>
                <div className={styles.featureItem}>
                    <h4 className={styles.featureBullet}>Fairly manage team membership through proposal tracking</h4>
                    <Image src="/Proposals.png" alt="Proposals" width="200" height="400" className={styles.mobileScreenshot} />
                </div>
            </div>
        </div>
    )
}

export default Features