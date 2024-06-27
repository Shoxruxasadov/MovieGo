import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Link from "next/link"

export default function Movies() {

  const { data: movies, isLoading, isError, isSuccess, error, refetch } = useQuery({
    queryKey: ['allUsers'],
    queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/movies`).then(({ data }) => data)
  })

  return (
    <section id='movies'>
      <div className="container">
        <h2>Movies</h2>
        <div className="wrapper">
          <div className="left">

          </div>
          <div className="movies">
            {isSuccess ? movies.map((item, index) => (
              <Link
                style={{ backgroundImage: `url(${item.image.poster})` }}
                href={`/movie/${item.module}/${item.name}`}
                className="card"
                key={item._id}
              >
                <div className="shadow" />
                <div className="title">
                  <span className="resolution">{item.resolution}</span>
                  <span className="format">{item.format}</span>
                  <h3>{item.title.en}</h3>
                </div>
              </Link>
            )) : <>
              <div className="card skeleton" >
                <div className="title">
                  <div className="resolution" />
                  <div className="format" />
                  <div className="text" />
                </div>
              </div><div className="card skeleton" >
                <div className="title">
                  <div className="resolution" />
                  <div className="format" />
                  <div className="text" />
                </div>
              </div><div className="card skeleton" >
                <div className="title">
                  <div className="resolution" />
                  <div className="format" />
                  <div className="text" />
                </div>
              </div><div className="card skeleton" >
                <div className="title">
                  <div className="resolution" />
                  <div className="format" />
                  <div className="text" />
                </div>
              </div><div className="card skeleton" >
                <div className="title">
                  <div className="resolution" />
                  <div className="format" />
                  <div className="text" />
                </div>
              </div><div className="card skeleton" >
                <div className="title">
                  <div className="resolution" />
                  <div className="format" />
                  <div className="text" />
                </div>
              </div><div className="card skeleton" >
                <div className="title">
                  <div className="resolution" />
                  <div className="format" />
                  <div className="text" />
                </div>
              </div>
            </>}
          </div>

          <div className="right">

          </div>
        </div>
      </div>
    </section>
  )
}
