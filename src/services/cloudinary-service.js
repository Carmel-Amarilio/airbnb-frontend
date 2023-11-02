export const cloudinaryServices = {
  uploadImg,
}

async function uploadImg(ev) {
  const CLOUD_NAME = 'du1jrse2t'
  const UPLOAD_PRESET = 'jcpcvfbz'
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  const FORM_DATA = new FormData()

  FORM_DATA.append('file', ev.target.files[0])
  FORM_DATA.append('upload_preset', UPLOAD_PRESET)


  try {
    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: FORM_DATA,
    })
    const { url } = await res.json()
    console.log(url);
    return url
  } catch (err) {
    console.error(err)
  }
}