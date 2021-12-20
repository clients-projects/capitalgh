import React from 'react'
import testimonial1 from '../../../images/testimonial-1.jpg'
import testimonial2 from '../../../images/testimonial-2.jpg'
import testimonial3 from '../../../images/testimonial-3.jpg'

import { AiFillStar } from 'react-icons/ai'

const Testimonial = () => (
    <div className='testimonials'>
        <div className='testimonial'>
            <div className='testimonial__img'>
                <img
                    src={testimonial2}
                    className='testimonial__img--item'
                    alt=''
                />
            </div>{' '}
            <h2 className='testimonial__name'>Andrew Marks</h2>
            <p className='testimonial__location'>Canada</p>
            <p className='testimonial__text'>
                Your professionalism and willingness to do whatever it takes
                means so much to me, my hats off to the team for an outstanding
                job. Always a pleasure doing business!
            </p>
            <div className='testimonial__rating'>
                <AiFillStar className='testimonial__rating--star' />
                <AiFillStar className='testimonial__rating--star' />
                <AiFillStar className='testimonial__rating--star' />
                <AiFillStar className='testimonial__rating--star' />
                <AiFillStar className='testimonial__rating--star' />
            </div>
        </div>
        <div className='testimonial'>
            <div className='testimonial__img'>
                <img
                    src={testimonial1}
                    className='testimonial__img--item'
                    alt=''
                />
            </div>{' '}
            <h2 className='testimonial__name'>Kristine Marion</h2>
            <p className='testimonial__location'>Norway</p>
            <p className='testimonial__text'>
                In my history of working with Bitcoin investment companies, I
                can honestly say that there is not one company that I've ever
                worked with that has better service than fxcryptotokeninvestment
            </p>
            <div className='testimonial__rating'>
                <AiFillStar className='testimonial__rating--star' />
                <AiFillStar className='testimonial__rating--star' />
                <AiFillStar className='testimonial__rating--star' />
                <AiFillStar className='testimonial__rating--star' />
                <AiFillStar className='testimonial__rating--star' />
            </div>
        </div>
        <div className='testimonial'>
            <div className='testimonial__img'>
                <img
                    src={testimonial3}
                    className='testimonial__img--item'
                    alt=''
                />
            </div>
            <h2 className='testimonial__name'>Micheal Dalton</h2>
            <p className='testimonial__location'>United States</p>
            <p className='testimonial__text'>
                fxcryptotokeninvestment is above and beyond their competitors.
                They follow up promptly on my account enquiries and resolve any
                issues within 24 hours. I'm glad to do business with them
            </p>

            <div className='testimonial__rating'>
                <AiFillStar className='testimonial__rating--star' />
                <AiFillStar className='testimonial__rating--star' />
                <AiFillStar className='testimonial__rating--star' />
                <AiFillStar className='testimonial__rating--star' />
                <AiFillStar className='testimonial__rating--star' />
            </div>
        </div>
    </div>
)

export default Testimonial
