import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
            <div class="grid h-screen px-4 bg-white place-content-center">
                <div class="text-center">
                    <h1 class="font-black text-gray-200 text-9xl">404</h1>
                    <img src="/images/error.avif" alt="사진" />
                    <p class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Uh-oh!
                    </p>
                    <p class="mt-4 text-gray-500">We can't find that page.</p>
                    <Link
                        to="/"
                        className="inline-block px-5 py-3 mt-6 text-sm font-medium text-black bg-[#ffd700] rounded hover:bg-[#ffd700]-700 focus:outline-none focus:ring"
                    >
                        Go Back Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
