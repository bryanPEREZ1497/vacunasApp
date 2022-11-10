import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const messageService = {
    success: (title, text) => {
        MySwal.fire({
            title: title,
            text: text,
            icon: 'success',
            confirmButtonText: 'OK'
        })
    },
    error: (title) => {
        MySwal.fire({
            title: title,
            // text: text,
            icon: 'error',
            confirmButtonText: 'OK'
        })
    },
    warning: (title, text) => {
        MySwal.fire({
            title: title,
            text: text,
            icon: 'warning',
            confirmButtonText: 'OK'
        })
    },
    info: (title, text) => {
        MySwal.fire({
            title: title,
            text: text,
            icon: 'info',
            confirmButtonText: 'OK'
        })
    },
    question: (title, text) => {
        MySwal.fire({
            title: title,
            text: text,
            icon: 'question',
            confirmButtonText: 'OK'
        })
    }
}
