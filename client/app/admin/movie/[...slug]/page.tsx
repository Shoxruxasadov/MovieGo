"use client"

import Admins from "@/layouts/admins"
import { useEffect, useState, ChangeEvent } from "react"
import { useParams, usePathname } from "next/navigation"
import { useStore } from "@/store/zustand"
import Loading from "@/components/others/loading"
import NotFoundPage from "@/app/not-found"
import { useTranslation } from "react-i18next"
import Link from "next/link"
import { useForm } from "react-hook-form"
import LangDto from "@/types/movies/lang.dto"

import { BsCollectionPlay } from "react-icons/bs";
import { RiFileCopyLine } from "react-icons/ri";

import { success } from "@/utils/toast"
import MoviesDto from "@/types/movies/movies.dto"
import api from "@/library/axios"
import { useRouter } from 'next/navigation'

// interface MovieProps {
//   path: string
//   title: LangDto;
//   description: LangDto;
// }

export default function AppMovie() {
  const { register, handleSubmit, formState: { errors }, } = useForm<MoviesDto>();
  const getMovie = useStore(state => state.getMovie);
  const movie = useStore(state => state.movie) as (MoviesDto | null);
  const [movieload, setMovieload] = useState(true)
  const [imageload, setImageload] = useState(true)
  const pathname = usePathname()
  const params = useParams()
  const { t, i18n } = useTranslation()
  const router = useRouter();

  const onSubmit = async (updatedMovie: MoviesDto) => {

    const source = () => {
      if ((updatedMovie.source as any)?.['2160p'] == "" &&
        (updatedMovie.source as any)?.['1080p'] == "" &&
        (updatedMovie.source as any)?.['720p'] == "" &&
        (updatedMovie.source as any)?.['uz'] == "" &&
        (updatedMovie.source as any)?.['ru'] == "" &&
        (updatedMovie.source as any)?.['en'] == "") return null
      return {
        "2160p": (updatedMovie.source as any)?.['2160p'] != "" ? (updatedMovie.source as any)?.['2160p'] : null,
        "1080p": (updatedMovie.source as any)?.['1080p'] != "" ? (updatedMovie.source as any)?.['1080p'] : null,
        "720p": (updatedMovie.source as any)?.['720p'] != "" ? (updatedMovie.source as any)?.['720p'] : null,
        "uz": (updatedMovie.source as any)?.['uz'] != "" ? (updatedMovie.source as any)?.['uz'] : null,
        "ru": (updatedMovie.source as any)?.['ru'] != "" ? (updatedMovie.source as any)?.['ru'] : null,
        "en": (updatedMovie.source as any)?.['en'] != "" ? (updatedMovie.source as any)?.['en'] : null,
      }
    }


    const merged = {
      path: updatedMovie.path,
      title: updatedMovie.title,
      description: updatedMovie.description,
      image: updatedMovie.image,
      source: source(),
      trailer: movie?.trailer || [],
      type: updatedMovie.type,
      module: updatedMovie.module,
      carousel: movie?.carousel || null,
      purchase: movie?.purchase || false,
      format: updatedMovie.format,
      duration: movie?.duration || 0,
      release: movie?.release,
      timeline: movie?.timeline,
      grossing: movie?.grossing,
      budget: movie?.budget,
      mpaa: movie?.mpaa,
      content: movie?.content,
      resolution: movie?.resolution,
      languages: movie?.languages,
      ratings: movie?.ratings,
      country: movie?.country?._id,
      studio: movie?.studio?._id,
      category: movie?.category?._id,
      genres: movie?.genres?.map((g) => g._id),
      directors: movie?.directors || [],
      producers: movie?.producers || [],
      scenarists: movie?.scenarists || [],
      cast: movie?.cast || []
    }

    api.put(`/admin/movies/${movie?._id}`, merged).then(({ data }) => {
      success(data)
      setTimeout(() => router.push("/admin/movies"), 1000)

    }).catch(error => { throw error })
  }

  const resolutions = {
    '2160p': '4K',
    '1080p': 'FHD',
    '720p': 'HD',
    '480p': 'SD'
  };

  useEffect(() => {
    setMovieload(true)
    setImageload(true)
    if (pathname) getMovie(pathname.split('/')[3]).finally(() => setMovieload(false))
  }, [pathname])

  useEffect(() => {
    if (!movieload && movie?.image?.screen) {
      const img = new Image()
      img.src = movie.image.screen
      img.onload = () => { setImageload(false) }
      img.onerror = () => { setImageload(false) }
    } else if (!movie?.image?.screen) {
      setImageload(false)
    }
  }, [movie, movieload])

  if (!((movieload || imageload) && movieload) && !movie) return <NotFoundPage />
  return (
    <Admins page="admin-movies">
      <header><div id="wrapper">
        <h1><Link href={'/admin/movies'} className="navigate-back">{t("admin.sidebar.movies")}</Link> <span> / </span> <span className="current-path">{t("admin.movies.information")}</span></h1>
        <button onClick={handleSubmit(onSubmit)}>
          <span>Save</span>
        </button>
      </div></header>
      <div id="content">
        {((movieload || imageload) && movieload) ? <Loading admin={true} /> : <div id="movie-edit">
          <div className="top">
            <div className="left">
              <label htmlFor="path" className="path">
                <p>Ссылка фильма</p>
                <div className="wrapper">
                  <input type="text" id="path" defaultValue={movie?.path} placeholder="Ссылка" {...register("path", { required: true })} />
                </div>
              </label>
              <div className="names">
                <label htmlFor="nameuz" className="name">
                  <p>Узбекский название</p>
                  <div className="wrapper">
                    <input type="text" id="nameuz" defaultValue={movie?.title.uz} placeholder="Название" {...register("title.uz", { required: true })} />
                  </div>
                </label>
                <label htmlFor="nameru" className="name">
                  <p>Русский название</p>
                  <div className="wrapper">
                    <input type="text" id="nameru" defaultValue={movie?.title.ru} placeholder="Название" {...register("title.ru", { required: true })} />
                  </div>
                </label>
                <label htmlFor="nameen" className="name">
                  <p> Английский название</p>
                  <div className="wrapper">
                    <input type="text" id="nameen" defaultValue={movie?.title.en} placeholder="Название" {...register("title.en", { required: true })} />
                  </div>
                </label>
              </div>
              <div className="descriptions">
                <label htmlFor="descriptionuz" className="description">
                  <p>Узбекский описание</p>
                  <div className="wrapper wrapper-area">
                    <textarea className="description" id="descriptionuz" defaultValue={movie?.description.uz} placeholder="Описание" {...register("description.uz", { required: true })} />
                  </div>
                </label>
                <label htmlFor="descriptionru" className="description">
                  <p>Русский описание</p>
                  <div className="wrapper wrapper-area">
                    <textarea className="description" id="descriptionru" defaultValue={movie?.description.ru} placeholder="Описание" {...register("description.ru", { required: true })} />
                  </div>
                </label>
                <label htmlFor="descriptionen" className="description">
                  <p> Английский описание</p>
                  <div className="wrapper wrapper-area">
                    <textarea className="description" id="descriptionen" defaultValue={movie?.description.en} placeholder="Описание" {...register("description.en", { required: true })} />
                  </div>
                </label>
              </div>
              {/* <div className="images-wrapper">
              <div className="images image-banner">
                <img src={movie?.image.banner} alt={"Image Banner"} />
              </div>
              <div className="images image-poster">
                <img src={movie?.image.poster} alt={"Image Poster"} />
              </div>
              {movie?.image.preview && <div className="images image-preview">
                <img src={movie?.image.preview} alt={"Image Preview"} />
              </div>}
              <div className="images image-logo">
                <img src={movie?.image.logo} alt={"Image Logo"} />
              </div>
            </div> */}
              <div className="images-text">
                <label htmlFor="banner" className="images-input">
                  <p>Ссилька баннера</p>
                  <div className="wrapper">
                    <textarea id="banner" defaultValue={movie?.image.banner} placeholder="Ссилька баннера" {...register("image.banner", { required: true })} />
                  </div>
                </label>
                <label htmlFor="poster" className="images-input">
                  <p>Ссилька постера</p>
                  <div className="wrapper">
                    <textarea id="poster" defaultValue={movie?.image.poster} placeholder="Ссилька постера" {...register("image.poster", { required: true })} />
                  </div>
                </label>
                <label htmlFor="preview" className="images-input">
                  <p>Ссилька застави</p>
                  <div className="wrapper">
                    <textarea id="preview" defaultValue={(movie?.image as any)?.preview} placeholder="Ссилька застави" {...register("image.preview", { required: true })} />
                  </div>
                </label>
                <label htmlFor="logo" className="images-input">
                  <p>Ссилька лагатипа</p>
                  <div className="wrapper">
                    <textarea id="logo" defaultValue={movie?.image.logo} placeholder="Ссилька лагатипа" {...register("image.logo", { required: true })} />
                  </div>
                </label>
              </div>
            </div>
            <div className="right">
              <div className="player-emded">
                <Link href={`/movies/${movie?.path}`} className="preview">
                  <img src={movie?.image.screen} alt={movie?.path} />

                  <div className="watch">
                    <BsCollectionPlay />
                    <span>Посмотреть</span>
                  </div>
                </Link>

                <div className="link">

                  <div className="path box">
                    <h5>Ссылка фильма:</h5>
                    <Link href={`/movies/${movie?.path}`}>{`https://moviego.uz/movies/${movie?.path}`}</Link>
                  </div>

                  <button onClick={() => {
                    navigator.clipboard.writeText(`https://moviego.uz/movies/${movie?.path}`)
                    success("Ссылка скопирована")
                  }}>
                    <RiFileCopyLine />
                  </button>

                </div>

                <div className="quality box">
                  <h5>Качество фильма:</h5>
                  <div className="labels">
                    <span>{movie?.format}</span>
                    {movie?.resolution.map((resolution) => (
                      <span key={resolution}>{resolutions[resolution as keyof typeof resolutions]}</span>
                    ))}
                  </div>
                </div>

                <div className="language box">
                  <h5>Языки фильма:</h5>
                  <div className="labels">
                    {movie?.languages.map((item, i) => (<span key={i}>{item} </span>))}
                  </div>
                </div>

              </div>

              {/* <div className="image-screen">
                <img src={movie?.image.screen} alt={"Image Screen"} />
              </div> */}

              <div className="images-text">
                <label htmlFor="screen" className="images-input">
                  <p>Ссилька экрана</p>
                  <div className="wrapper">
                    <textarea id="screen" defaultValue={movie?.image.screen} placeholder="Ссилька экрана" {...register("image.screen", { required: true })} />
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="movie-quality">
              <label htmlFor="4k" className="qlng">
                <p>Качество фильма 4K</p>
                <div className="wrapper">
                  <textarea id="4k" defaultValue={(movie?.source as any)?.['2160p']} placeholder="Качество 4K" {...register("source.2160p", { required: false })} />
                </div>
              </label>
              <label htmlFor="fhd" className="qlng">
                <p>Качество фильма Full HD</p>
                <div className="wrapper">
                  <textarea id="fhd" defaultValue={(movie?.source as any)?.['1080p']} placeholder="Качество Full HD" {...register("source.1080p", { required: false })} />
                </div>
              </label>
              <label htmlFor="hd" className="qlng">
                <p>Качество фильма HD</p>
                <div className="wrapper">
                  <textarea id="hd" defaultValue={(movie?.source as any)?.['720p']} placeholder="Качество HD" {...register("source.720p", { required: false })} />
                </div>
              </label>
            </div>
            <div className="movie-language">
              <label htmlFor="uzl" className="qlng">
                <p>Узбекский язык фильма</p>
                <div className="wrapper">
                  <textarea id="uzl" defaultValue={(movie?.source as any)?.uz} placeholder="Узбекский язык" {...register("source.uz", { required: false })} />
                </div>
              </label>
              <label htmlFor="rul" className="qlng">
                <p>Русский язык фильма</p>
                <div className="wrapper">
                  <textarea id="rul" defaultValue={(movie?.source as any)?.ru} placeholder="Русский язык" {...register("source.ru", { required: false })} />
                </div>
              </label>
              <label htmlFor="enl" className="qlng">
                <p>Английский язык фильма</p>
                <div className="wrapper">
                  <textarea id="enl" defaultValue={(movie?.source as any)?.en} placeholder="Английский язык" {...register("source.en", { required: false })} />
                </div>
              </label>
            </div>

            <div className="selectable-options">
              <label htmlFor="select-type" className="selectoption">
                <p>Type</p>
                <div className="wrapper">
                  <select id="select-type" defaultValue={movie?.type} {...register("type", { required: true })}>
                    <option disabled>—— Please choose an type ——</option>
                    <option value="movie">Movie</option>
                    <option value="serie">Serie</option>
                  </select>
                </div>
              </label>
              <label htmlFor="select-module" className="selectoption">
                <p>Module</p>
                <div className="wrapper">
                  <select id="select-module" defaultValue={movie?.module} {...register("module", { required: true })}>
                    <option disabled>—— Please choose an module ——</option>
                    <option value="movies">Movies</option>
                    <option value="series">Series</option>
                    <option value="cartoon">Cartoon</option>
                    <option value="anime">Anime</option>
                  </select>
                </div>
              </label>
              <label htmlFor="select-format" className="selectoption">
                <p>Format</p>
                <div className="wrapper">
                  <select id="select-format" defaultValue={movie?.format} {...register("format", { required: true })}>
                    <option disabled>—— Please choose an format ——</option>
                    <option value="IMAX">IMAX</option>
                    <option value="BluRay">BluRay</option>
                    <option value="WebRip">WebRip</option>
                    <option value="WEB-DL">WEB-DL</option>
                  </select>
                </div>
              </label>
            </div>
          </div>
        </div>
        }
      </div>
    </Admins>
  )
}
