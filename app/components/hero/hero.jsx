import React from 'react'
import styles from './hero.module.css'
import { getServerSession } from "next-auth/next"
import { options } from "../../api/auth/[...nextauth]/options"

const Hero = async () => {
    const session = await getServerSession(options)
    if (session) {
        console.log("logged-in")
    } else {
        console.log("logged-out")
    }
    console.log("token: ", session)

    return (
        <div className={styles.hero}>
            <h1>Manage Equity Splits with Ease</h1>
            <p>TeamTokens helps startups handle dynamic equity distribution seamlessly.</p>
            <a href="https://apps.apple.com/app/teamtokens/id6450320210" className={styles.ctaButton}>Download App</a>
        </div>
    )
}

export default Hero