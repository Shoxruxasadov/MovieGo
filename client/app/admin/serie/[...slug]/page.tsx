"use client"

import React, { ChangeEvent, useEffect, useState } from "react"
import { useParams, usePathname, useRouter } from "next/navigation"
import { useStore } from "@/store/zustand"
import Loading from "@/components/others/loading"
import NotFoundPage from "@/app/not-found"
import { useTranslation } from "react-i18next"
import Admins from "@/layouts/admins"
import Link from "next/link"
import { useForm } from "react-hook-form"
import LangDto from "@/types/movies/lang.dto"

import Rodal from "rodal";

import { BsCollectionPlay, BsPlusLg } from "react-icons/bs";
import { RiFileCopyLine } from "react-icons/ri";

import { success } from "@/utils/toast"
import MoviesDto from "@/types/movies/movies.dto"
import api from "@/library/axios"
import EpisodeSeriesDto from "@/types/movies/episode.series.dto"
import SourceSeriesDto from "@/types/movies/source.series.dto"
// import Series from "@/components/serie/series"

// interface MovieProps {
//   path: string
//   title: LangDto;
//   description: LangDto;
// }

export default function AppSerie() {
  const { register, handleSubmit, formState: { errors }, } = useForm<MoviesDto>();
  const getMovie = useStore(state => state.getMovie);
  const movie = useStore(state => state.movie) as (MoviesDto | null);
  const [movieload, setMovieload] = useState(true)
  const [imageload, setImageload] = useState(true)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [episodeModal, setEpisodeModal] = useState<boolean>(false)
  const [episodeIndex, setEpisodeIndex] = useState<number>(0)
  const pathname = usePathname()
  const params = useParams()
  const { t, i18n } = useTranslation()
  const router = useRouter();

  const onSubmit = async (updatedMovie: MoviesDto) => {
    const merged = {
      path: updatedMovie.path,
      title: updatedMovie.title,
      description: updatedMovie.description,
      image: updatedMovie.image,
      source: movie?.source,
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
        <h1><Link href={'/admin/movies'} className="navigate-back">{t("admin.sidebar.movies")}</Link> <span> / </span> <span className="current-path">{t("admin.series.information")}</span></h1>
        <button onClick={handleSubmit(onSubmit)}>
          <span>Save</span>
        </button>
      </div></header>
      <div id="content">
        {((movieload || imageload) && movieload) ? <Loading admin={true} /> : <div id="serie-edit">
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
                    <input type="text" id="banner" defaultValue={movie?.image.banner} placeholder="Ссилька баннера" {...register("image.banner", { required: true })} />
                  </div>
                </label>
                <label htmlFor="poster" className="images-input">
                  <p>Ссилька постера</p>
                  <div className="wrapper">
                    <input type="text" id="poster" defaultValue={movie?.image.poster} placeholder="Ссилька постера" {...register("image.poster", { required: true })} />
                  </div>
                </label>
                <label htmlFor="logo" className="images-input">
                  <p>Ссилька лагатипа</p>
                  <div className="wrapper">
                    <input type="text" id="logo" defaultValue={movie?.image.logo} placeholder="Ссилька лагатипа" {...register("image.logo", { required: true })} />
                  </div>
                </label>
                <label htmlFor="screen" className="images-input">
                  <p>Ссилька экрана</p>
                  <div className="wrapper">
                    <input type="text" id="screen" defaultValue={movie?.image.screen} placeholder="Ссилька экрана" {...register("image.screen", { required: true })} />
                  </div>
                </label>
              </div>
            </div>
            <div className="right">
              <div className="player-emded">
                <Link href={`/series/${movie?.path}`} className="preview">
                  <img src={movie?.image.screen} alt={movie?.path} />

                  <div className="watch">
                    <BsCollectionPlay />
                    <span>Посмотреть</span>
                  </div>
                </Link>

                <div className="link">

                  <div className="path box">
                    <h5>Ссылка фильма:</h5>
                    <Link href={`/series/${movie?.path}`}>{`https://moviego.uz/series/${movie?.path}`}</Link>
                  </div>

                  <button onClick={() => {
                    navigator.clipboard.writeText(`https://moviego.uz/series/${movie?.path}`)
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

            </div>
          </div>
          <div className="bottom">
            {movie?.source && "episode" in movie.source && <Series movie={movie || {}} isEdit={isEdit} setIsEdit={setIsEdit} episodeModal={episodeModal} setEpisodeModal={setEpisodeModal} setEpisodeIndex={setEpisodeIndex} />}

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
                  </select>
                </div>
              </label>
            </div>
          </div>

          <Modal movie={movie || {}} isEdit={isEdit} setIsEdit={setIsEdit} episodeModal={episodeModal} setEpisodeModal={setEpisodeModal} episodeIndex={episodeIndex} />
        </div>
        }
      </div>
    </Admins>
  )
}

function Series({ movie, isEdit, setIsEdit, episodeModal, setEpisodeModal, setEpisodeIndex }: { movie: Partial<MoviesDto>, isEdit: boolean, setIsEdit: React.Dispatch<React.SetStateAction<boolean>>, episodeModal: boolean, setEpisodeModal: React.Dispatch<React.SetStateAction<boolean>>, setEpisodeIndex: React.Dispatch<React.SetStateAction<number>>, }) {
  const { t, i18n } = useTranslation()

  return <div id="series-list">
    <div className="child">
      {movie?.source && "episode" in movie.source &&
        movie.source.episode?.map((item, i) => (<div
          key={i}
          className="card"
          onClick={() => {
            setIsEdit(true)
            setEpisodeModal(true)
            setEpisodeIndex(i)
          }}
          style={{ backgroundImage: `url(${item.preview})` }}
        >
          <div className="title">
            <div className="info">
              <p>{t("serie.episode")} {i + 1}</p>
              <p>{item.duration}{t("movie.m")}</p>
            </div>
            <h4>{item.title[i18n.language as keyof typeof movie.title]}</h4>
          </div>
          <div className="shadow" />
        </div>
        ))}

      <div className="create" onClick={() => {
        setIsEdit(false)
        setEpisodeModal(true)
      }}>
        <div className="plus">
          <BsPlusLg />
          <span>Добавить</span>
        </div>
      </div>
    </div>
  </div >
}

function Modal({ movie, isEdit, setIsEdit, episodeModal, setEpisodeModal, episodeIndex }: { movie: Partial<MoviesDto>, isEdit: boolean, setIsEdit: React.Dispatch<React.SetStateAction<boolean>>, episodeModal: boolean, setEpisodeModal: React.Dispatch<React.SetStateAction<boolean>>, episodeIndex: number, }) {
  const { register, handleSubmit, reset } = useForm<EpisodeSeriesDto>({
    defaultValues: (movie?.source as SourceSeriesDto)?.episode?.[episodeIndex],
  });

  const getMovie = useStore(state => state.getMovie);
  const { t, i18n } = useTranslation()
  const pathname = usePathname()

  const createEpisode = async (newEpisode: EpisodeSeriesDto) => {
    const watching = () => {
      return {
        "2160p": ((newEpisode.watching as any)?.['2160p'] != null && (newEpisode.watching as any)?.['2160p'] != "") ? (newEpisode.watching as any)?.['2160p'] : null,
        "1080p": ((newEpisode.watching as any)?.['1080p'] != null && (newEpisode.watching as any)?.['1080p'] != "") ? (newEpisode.watching as any)?.['1080p'] : null,
        "720p": ((newEpisode.watching as any)?.['720p'] != null && (newEpisode.watching as any)?.['720p'] != "") ? (newEpisode.watching as any)?.['720p'] : null,
        "uz": ((newEpisode.watching as any)?.['uz'] != null && (newEpisode.watching as any)?.['uz'] != "") ? (newEpisode.watching as any)?.['uz'] : null,
        "ru": ((newEpisode.watching as any)?.['ru'] != null && (newEpisode.watching as any)?.['ru'] != "") ? (newEpisode.watching as any)?.['ru'] : null,
        "en": ((newEpisode.watching as any)?.['en'] != null && (newEpisode.watching as any)?.['en'] != "") ? (newEpisode.watching as any)?.['en'] : null,
      }
    }

    const newEpisodes = () => {
      let episodeList = [...((movie?.source as SourceSeriesDto)?.episode || [])]

      episodeList.push({
        title: newEpisode.title,
        duration: newEpisode.duration,
        preview: newEpisode.preview,
        watching: watching()
      })
      return episodeList
    }

    const merged = {
      path: movie?.path,
      title: movie?.title,
      description: movie?.description,
      image: movie?.image,
      source: {
        seasons: (movie?.source as SourceSeriesDto)?.seasons,
        episode: newEpisodes(),
      },
      trailer: movie?.trailer || [],
      type: movie?.type,
      module: movie?.module,
      carousel: movie?.carousel || null,
      purchase: movie?.purchase || false,
      format: movie?.format,
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
      setEpisodeModal(false)
      window.location.reload();
    }).catch(error => { throw error })
  }

  const editEpisode = async (updatedEpisode: EpisodeSeriesDto) => {
    const watching = () => {
      return {
        "2160p": ((updatedEpisode.watching as any)?.['2160p'] != null && (updatedEpisode.watching as any)?.['2160p'] != "") ? (updatedEpisode.watching as any)?.['2160p'] : null,
        "1080p": ((updatedEpisode.watching as any)?.['1080p'] != null && (updatedEpisode.watching as any)?.['1080p'] != "") ? (updatedEpisode.watching as any)?.['1080p'] : null,
        "720p": ((updatedEpisode.watching as any)?.['720p'] != null && (updatedEpisode.watching as any)?.['720p'] != "") ? (updatedEpisode.watching as any)?.['720p'] : null,
        "uz": ((updatedEpisode.watching as any)?.['uz'] != null && (updatedEpisode.watching as any)?.['uz'] != "") ? (updatedEpisode.watching as any)?.['uz'] : null,
        "ru": ((updatedEpisode.watching as any)?.['ru'] != null && (updatedEpisode.watching as any)?.['ru'] != "") ? (updatedEpisode.watching as any)?.['ru'] : null,
        "en": ((updatedEpisode.watching as any)?.['en'] != null && (updatedEpisode.watching as any)?.['en'] != "") ? (updatedEpisode.watching as any)?.['en'] : null,
      }
    }

    const newEpisodes = () => {
      let episodeList = [...((movie?.source as SourceSeriesDto)?.episode || [])]

      episodeList[episodeIndex] = {
        title: updatedEpisode.title,
        duration: updatedEpisode.duration,
        preview: updatedEpisode.preview,
        watching: watching()
      }
      return episodeList
    }

    const merged = {
      path: movie?.path,
      title: movie?.title,
      description: movie?.description,
      image: movie?.image,
      source: {
        seasons: (movie?.source as SourceSeriesDto)?.seasons,
        episode: newEpisodes(),
      },
      trailer: movie?.trailer || [],
      type: movie?.type,
      module: movie?.module,
      carousel: movie?.carousel || null,
      purchase: movie?.purchase || false,
      format: movie?.format,
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
      setEpisodeModal(false)
      window.location.reload();
    }).catch(error => { throw error })
  }

  useEffect(() => {
    if (isEdit && (movie?.source as SourceSeriesDto)?.episode?.[episodeIndex]) {
      reset({
        title: (movie?.source as SourceSeriesDto)?.episode?.[episodeIndex].title,
        duration: (movie?.source as SourceSeriesDto)?.episode?.[episodeIndex].duration,
        preview: (movie?.source as SourceSeriesDto)?.episode?.[episodeIndex].preview,
        watching: (movie?.source as SourceSeriesDto)?.episode?.[episodeIndex].watching,
      });
    } else {
      reset({
        title: {
          uz: "",
          ru: "",
          en: "",
        },
        duration: 0,
        preview: "",
        watching: {
          '2160p': "",
          '1080p': "",
          '720p': "",
          uz: "",
          ru: "",
          en: "",
        },
      });
    }
  }, [movie, episodeIndex, reset, isEdit]);

  return <Rodal visible={episodeModal} onClose={() => setEpisodeModal(false)}>
    <form onSubmit={handleSubmit(isEdit ? editEpisode : createEpisode)}>
      <div className="form">
        <div className="names">
          <label htmlFor="nameuz" className="name">
            <p>Узбекский название</p>
            <div className="wrapper">
              <input type="text" id="nameuz" placeholder="Название" {...register("title.uz", { required: true })} />
            </div>
          </label>
          <label htmlFor="nameru" className="name">
            <p>Русский название</p>
            <div className="wrapper">
              <input type="text" id="nameru" placeholder="Название" {...register("title.ru", { required: true })} />
            </div>
          </label>
          <label htmlFor="nameen" className="name">
            <p> Английский название</p>
            <div className="wrapper">
              <input type="text" id="nameen" placeholder="Название" {...register("title.en", { required: true })} />
            </div>
          </label>
        </div>

        <div className="preview-duration">
          <label htmlFor="preview" className="preview">
            <p>Ссилька застави</p>
            <div className="wrapper">
              <input
                type="text"
                id="preview"
                placeholder="Ссилька застави"
                {...register("preview", { required: true })}
              />
            </div>
          </label>
          <label htmlFor="duration" className="duration">
            <p>Продолжительность</p>
            <div className="wrapper">
              <input type="number" id="duration" placeholder="Duration" {...register("duration", { required: true })} />
            </div>
          </label>
        </div>

        <div className="movie-quality">
          <label htmlFor="4k" className="qlng">
            <p>Качество сериала 4K</p>
            <div className="wrapper">
              <textarea id="4k" placeholder="Качество 4K" {...register("watching.2160p", { required: false })} />
            </div>
          </label>
          <label htmlFor="fhd" className="qlng">
            <p>Качество сериала Full HD</p>
            <div className="wrapper">
              <textarea id="fhd" placeholder="Качество Full HD" {...register("watching.1080p", { required: false })} />
            </div>
          </label>
          <label htmlFor="hd" className="qlng">
            <p>Качество сериала HD</p>
            <div className="wrapper">
              <textarea id="hd" placeholder="Качество HD" {...register("watching.720p", { required: false })} />
            </div>
          </label>
        </div>

        <div className="movie-language">
          <label htmlFor="uzl" className="qlng">
            <p>Узбекский язык сериала</p>
            <div className="wrapper">
              <textarea id="uzl" placeholder="Узбекский язык" {...register("watching.uz", { required: false })} />
            </div>
          </label>
          <label htmlFor="rul" className="qlng">
            <p>Русский язык сериала</p>
            <div className="wrapper">
              <textarea id="rul" placeholder="Русский язык" {...register("watching.ru", { required: false })} />
            </div>
          </label>
          <label htmlFor="enl" className="qlng">
            <p>Английский язык сериала</p>
            <div className="wrapper">
              <textarea id="enl" placeholder="Английский язык" {...register("watching.en", { required: false })} />
            </div>
          </label>
        </div>
      </div>

      <div className="wrapper">
        <button type="button" className="cancel" onClick={() => setEpisodeModal(false)}>
          {t("header.cancel")}
        </button>
        <button type="submit" className="confirm">
          {isEdit ? "Edit" : "Create"}
        </button>
      </div>
    </form>
  </Rodal>

}