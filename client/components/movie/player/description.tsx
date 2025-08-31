import MovieDto from '@/types/movies/movies.dto'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Description({ movie }: { movie: MovieDto }) {
    const { t, i18n } = useTranslation()
    return (
        <div className="box description">
            <h3>Description</h3>
            <p>{movie.description[i18n.language as keyof typeof movie.description]}</p>
        </div>
    )
}
