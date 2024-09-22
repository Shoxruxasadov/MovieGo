import Root from "@/layouts/root";
import { useEffect } from "react";

export default function Loading() {
    return (
        <Root page="loading">
            <main className="loader">
                <div className="loader_filmstrip" />
                <p className="loader_text">loading</p>
            </main>
        </Root>
    )
}
