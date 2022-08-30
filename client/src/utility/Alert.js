import swal from 'sweetalert'

export const CreateAlert = (title,text,icon) => {
    return swal(title, text, icon);
 
}