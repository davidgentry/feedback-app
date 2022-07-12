import {useState, useContext, useEffect} from 'react'
import React from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './shared/RatingSelect'
import FeedbackContext from '../context/FeedbackContext'


function FeedbackForm() {

    const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)
    const [text, setText] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(false)
    const [message, setMessage] = useState('')
    const [rating, setRating] = useState(10)

    useEffect(() => {
        if(feedbackEdit.edit === true) {
            setBtnDisabled(false)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    }, [feedbackEdit])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(text.trim().length >= 10) {
            const newFeedback = {
                text: text,
                rating: rating,
            }
            if (feedbackEdit.edit === true) {
                updateFeedback(feedbackEdit.item.id, newFeedback)
            } else {
                addFeedback(newFeedback)
            }   
        } 
    }

    const handleTextChange = (e) => {
        if(text === '') {
            setBtnDisabled(true)
            setMessage(null)
        } else if(text !== '' && text.trim().length <= 10) {
            setBtnDisabled(true)
            setMessage('Review must be more than 10 characters')
        } else {
            setBtnDisabled(false)
            setMessage('Valid Text Length')
        }
        setText(e.target.value)
    }

  return (
     <Card>
         <form onSubmit={handleSubmit}>
            <h2>How would you rate your service with us?</h2>
            <RatingSelect
                select={(rating) => setRating(rating)}
            />

            <div className="input-group">
                <input 
                    onChange={handleTextChange}
                    type='text'
                    value={text} 
                    placeholder="Write a review" 
                />
                <Button type='submit' version='secondary' isDisabled={btnDisabled}>
                    Send
                </Button>
            </div>
            {message && 
                <div className="message">
                    {message}
                </div>
            }
            
         </form>
         



     </Card>
  )
}

export default FeedbackForm