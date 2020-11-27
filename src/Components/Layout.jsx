import React from 'react'
import {useHistory} from 'react-router-dom'

import '../styles/Layout.css'

const Layout = ({children}) => {
    const history = useHistory()

    const goBack = () => {
        history.goBack()
    }
    return (
        <div className='Layout'>
            <button
                className='Layout__btn'
                onClick={goBack}
            >
                Retour
            </button>
            <main>{children}</main>
        </div>
    )
}

export default Layout
