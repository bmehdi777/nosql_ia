import React from 'react'
import {useHistory} from 'react-router-dom'

const Layout = ({children}) => {
    const history = useHistory()

    const goBack = () => {
        history.goBack()
    }
    return (
        <div>
            <button
                onClick={goBack}
            >
                Retour
            </button>
            <main>{children}</main>
        </div>
    )
}

export default Layout
