import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function Movies() {

  const { data: movies, isLoading, isError, isSuccess, error, refetch } = useQuery({
    queryKey: ['allUsers'],
    queryFn: () => axios.get(`http://localhost:8080/api/movies`).then(({ data }) => data)
  })

  return (
    <section id='movies'>
      <div className="container">
        <h2>Movies</h2>
        <div className="wrapper">
          <div className="left">

          </div>
          <div className="movies">
            {isSuccess && movies.map((item, index) => (
              <div key={index} className="card" style={{ backgroundImage: `url(${item.image.poster})` }}>
                <div className="shadow"></div>
                <div className="title">
                  <h3>{item.title.uz}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="right">

          </div>
        </div>
        {/* <img src={movies[0].image.poster} alt="" /> */}
      </div>
    </section>
  )
}
