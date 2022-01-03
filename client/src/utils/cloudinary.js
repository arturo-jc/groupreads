

const large = url => {
    const displaySize = 300
    return url.replace("/upload", `/upload/ar_1.0,g_face,c_fill,w_${displaySize}`)
}

const small = url => {
    const displaySize = 40
    return url.replace("/upload", `/upload/c_thumb,g_face,h_${displaySize},w_${displaySize}`)
}

export default {large, small};