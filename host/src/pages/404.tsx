import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button } from '@/components/ui/button';

export default function NotFound() {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>404 - Page Not Found | Ali</title>
                <meta
                    name="description"
                    content="The page you are looking for does not exist."
                />
            </Head>
            <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4 py-16">
                <div className="text-center">
                    <h1 className="pr-2 text-7xl font-bold text-gray-300 md:text-9xl dark:text-gray-700">
                        404
                    </h1>
                    <h2 className="mt-4 text-3xl font-semibold text-gray-800 dark:text-gray-200">
                        Page Not Found
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        Sorry, we couldn't find the page you're looking for.
                    </p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Button
                            onClick={() => router.back()}
                            variant="outline"
                            size="lg"
                            className="font-bold">
                            Go Back
                        </Button>
                        <Link href="/">
                            <Button
                                size="lg"
                                className="font-bold text-white">
                                Go to Homepage
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
