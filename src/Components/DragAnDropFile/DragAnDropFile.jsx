import React, {useEffect} from 'react'
import './DragAnDropFile.css'

const DragAnDropFile = ({onChange}) => {

    const updateThumbnail = (file) => {
        let thumbnailElem = document.querySelector('.drop-zone__thumb')

        if(document.querySelector('.drop-zone__prompt')) {
            document.querySelector('.drop-zone__prompt').remove()
        }

        if(!thumbnailElem) {
            thumbnailElem = document.createElement('div')
            thumbnailElem.classList.add('drop-zone__thumb')
            document.querySelector('.drop-zone').appendChild(thumbnailElem)
        }
        thumbnailElem.dataset.label = file.name

        if(file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                thumbnailElem.style.backgroundImage = `url('${reader.result}')`
            }
        } else {
            thumbnailElem.style.backgroundImage = null
        }
    }

    const uploadImage = (e) => {
        updateThumbnail(e.target.files[0])
        console.log('changed')
        onChange(e.target.files[0])
    }

    useEffect(() => {
        document.querySelector('.drop-zone').addEventListener('dragover', e => {
            e.preventDefault()
            document.querySelector('.drop-zone').classList.add('drop-zone--hover')
        })

        document.querySelector('.drop-zone').addEventListener('dragleave', e => {
            document.querySelector('.drop-zone').classList.remove('drop-zone--hover')
        })

        document.querySelector('.drop-zone').addEventListener('dragend', e => {
            document.querySelector('.drop-zone').classList.remove('drop-zone--hover')
        })

        document.querySelector('.drop-zone').addEventListener('drop', e => {
            e.preventDefault()

            if(e.dataTransfer.files.length) {
                document.querySelector('.drop-zone__input').files = e.dataTransfer.files
                updateThumbnail(e.dataTransfer.files[0])
                //car onChange de l'imput pas activé
                onChange(e.dataTransfer.files[0])
            }

            document.querySelector('.drop-zone').classList.remove('drop-zone--hover')
        })
    },[])

    return (
        <div 
            className='drop-zone'
            onClick={() => document.querySelector('.drop-zone__input').click()}
        >
            <span className='drop-zone__prompt'>Drop une image ici ou clique pour upload</span> 
    
            <input 
                type="file" 
                className='drop-zone__input'
                onChange={(e) => uploadImage(e)}
            />
        </div>
    )
}

export default DragAnDropFile
