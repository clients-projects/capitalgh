import React from 'react'
import { connect } from 'react-redux'
import * as orderAction from '../../store/actions/burgerIndex'

const UserCard = (props) => {
   

    return (
        <div className='card card-user'>
            <div className='image'>
                <img src={props.bgImage} alt='...' />
            </div>
            <div className='content'>
                <div className='author'>
                    <a href='#pablo'>
                        <img
                            className='avatar border-gray'
                            src={props.avatar}
                            alt='...'
                        />
                        <h4 className='title' style={{ color: 'white' }}>
                            {props.name}
                            <br />
                            <small>{props.userName}</small>
                        </h4>
                    </a>
                </div>
                {/* <p className="description text-center">{props.description}</p> */}
                {/* <form
                    style={{
                        display: 'grid',
                        justifyContent: 'center',
                        justifyItems: 'center',
                        marginTop: '2rem',
                    }}
                >
                    <input
                        onChange={handleFileChange}
                        type='file'
                        id='file'
                        name='file'
                        className='custom-file-input'
                    />
                    {imagePreview && (
                        <>
                            <div className='image'>
                                <img src={imagePreview} alt='...' />
                            </div>

                            {/* <button
                                className='button'
                                style={{ marginTop: '1rem' }}
                                type='submit'
                            >
                                Select
                            </button> *
                        </>
                    )}
                </form> 
                            <hr />*/}
            </div>
            {/* <div className="text-center">{props.socials}</div> */}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.user.loading,
        err: state.auth.error,
        tokenId: state.auth.tokenId,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInitFundAccount: (data, token, userId) =>
            dispatch(orderAction.initFundAccount(data, token, userId)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserCard)
