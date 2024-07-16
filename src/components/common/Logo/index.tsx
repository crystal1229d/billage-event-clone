import Image from 'next/image';
import styles from './Logo.module.css';

interface LogoProps {
    with_service_name?: boolean;
}

export default function Logo({ with_service_name = true }: LogoProps) {
    return (
        <div className={with_service_name ? styles.logo_with_name : styles.logo}>
            {with_service_name ? (
                <Image src="/assets/images/logo_with_name.webp" alt="bbillage logo" width={131} height={35} />
            ) : (
                <Image src="/assets/images/logo.png" alt="bbillage logo" width={131} height={35} />
            )}
        </div>
    );
}
