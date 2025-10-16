import Image from "next/image";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center gap-8 p-8">
            <Image
                className="dark:invert"
                src="/next.svg"
                alt="Next.js logo"
                width={180}
                height={38}
                priority
            />
            <h1 className="text-3xl font-bold text-center">
                Welcome on Home Page!
            </h1>
        </div>
    );
}
