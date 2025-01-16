import Root from "@/layouts/root";
import { useEffect } from "react";
import SceletLoading from "../loading/loading";

export default function Loading() {
    return (
        <Root page="loading">
            <main>
                <SceletLoading />
            </main>
        </Root>
    )
}
