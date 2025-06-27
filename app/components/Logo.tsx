import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  linkToHome?: boolean;
}

export default function Logo({ className = '', linkToHome = true }: LogoProps) {
  const logoElement = (
    <Image
      src="/logo.png"
      alt="StoryWeaver Logo"
      width={200}
      height={80}
      className={`${className}`}
      priority
    />
  );

  if (linkToHome) {
    return (
      <Link href="/" className="inline-block">
        {logoElement}
      </Link>
    );
  }

  return logoElement;
}