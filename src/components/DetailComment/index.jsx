import classNames from 'classnames'
import React from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import css from "./style.module.css"

const DetailComment = ( {comment, setComment,}) => {


  const handleComment = (e) => {
    setComment(e.target.value)
  }

  return (
    <legend className={css.comment__wrapper}>
      <label className={css.comment__label} htmlFor="comment">Comment</label>
      <input className={css.comment__input} value={comment} onChange={(e) => handleComment(e)} type="text" name='comment' placeholder='Leave your comment...'/>
    </legend>
  )
}

export default DetailComment