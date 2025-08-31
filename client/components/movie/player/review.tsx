import { FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";
import { useRef } from "react";
import Stars from "@/components/widgets/stars";
import MovieDto from "@/types/movies/movies.dto";

export default function Review({ movie }: {movie: MovieDto}) {
    const scrollDemoRef = useRef<HTMLDivElement | null>(null);

    return (
        <div className="box reviews">
            <div className="title-reviews">
                <h3>Reviews</h3>
                <button><FaPlus /> <span>Add Your Review</span></button>
            </div>

            <div className="wrapper-reviews" ref={scrollDemoRef} style={{ scrollBehavior: "smooth" }}>
                <div className="review">
                    <div className="theme">
                        <div className="user">
                            <img src="/sign/user.webp" alt="" />
                            <div className="name">
                                <h4>Shoxrux Asadov</h4>
                                <h5>Owner moviego</h5>
                            </div>
                        </div>
                        <div className="rating">
                            <Stars stars={9} />
                            <p>9.0</p>
                        </div>
                    </div>
                    <p>This movie was recommended to me by a very dear friend who went for the movie by herself. I went to the cinemas to watch but had a houseful board so couldn’t watch it.</p>
                </div>

                <div className="review">
                    <div className="theme">
                        <div className="user">
                            <img src="/sign/user.webp" alt="" />
                            <div className="name">
                                <h4>Aniket Roy</h4>
                                <h5>From India</h5>
                            </div>
                        </div>
                        <div className="rating">
                            <Stars stars={4} />
                            <p>4.0</p>
                        </div>
                    </div>
                    <p>A restless king promises his lands to the local tribals in exchange of a stone (Panjurli, a deity of Keradi Village) wherein he finds solace and peace of mind.</p>
                </div>

                <div className="review">
                    <div className="theme">
                        <div className="user">
                            <img src="/sign/user.webp" alt="" />
                            <div className="name">
                                <h4>Swaraj</h4>
                                <h5>From Russion</h5>
                            </div>
                        </div>
                        <div className="rating">
                            <Stars stars={7} />
                            <p>7.0</p>
                        </div>
                    </div>
                    <p>This movie was recommended to me by a very dear friend who went for the movie by herself. I went to the cinemas to watch but had a houseful board so couldn’t watch it.</p>
                </div>
            </div>

            <div className="navigate">
                <button onClick={() => { if (scrollDemoRef.current) scrollDemoRef.current.scrollLeft -= 700 }}><FaChevronLeft /></button>
                <div className="indicators">
                    <span className="active" />
                    <span className="" />
                    <span className="" />
                    <span className="" />
                </div>
                <button onClick={() => { if (scrollDemoRef.current) scrollDemoRef.current.scrollLeft += 700 }}><FaChevronRight /></button>
            </div>

        </div>
    )
}
