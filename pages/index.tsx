import Link from "next/link";
import React from "react";

const index = () => {
    return (
        <div className="text-xl">
            <ul>
                <li>
                    <Link href="/report/1">Report 1 not fallback dynamic</Link>
                </li>
                <li>
                    <Link href="/report/2">Report 2 fallback dynamic</Link>
                </li>
                <li>
                    <Link href="/report/4">Report 4 not dynamic noIntl</Link>
                </li>
            </ul>
        </div>
    );
};

export default index;
