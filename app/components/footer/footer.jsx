import React from 'react';
import Image from 'next/image'
import Link from 'next/link';

const Footer = () => {
    return (
        <footer>
            <h1 className="text-2xl">TeamTokens</h1>
            <p className="text-sm"><Link href="/privacy">Privacy Policy</Link></p>
            <p>Copyright 2023</p>
        </footer>
    )
}

export default Footer