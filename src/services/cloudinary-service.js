export const cloudinaryServices = {
  uploadImg,
  uploadDragImg,
  uploadUrlImg
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

async function uploadDragImg(ev) {
  const CLOUD_NAME = 'du1jrse2t'
  const UPLOAD_PRESET = 'jcpcvfbz'
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  const FORM_DATA = new FormData()

  FORM_DATA.append('file', ev.dataTransfer.files[0])
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

async function uploadUrlImg(input) {
  const CLOUD_NAME = 'du1jrse2t';
  const UPLOAD_PRESET = 'jcpcvfbz';
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  const FORM_DATA = new FormData();

  if (typeof input === 'string') {
    const response = await fetch(input);
    const blob = await response.blob();
    FORM_DATA.append('file', blob, 'image.jpg');
  } else {
    console.error('Invalid input');
    return;
  }
  FORM_DATA.append('upload_preset', UPLOAD_PRESET);
  try {
    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: FORM_DATA,
    });
    const { url } = await res.json();
    console.log(url);
    return url;
  } catch (err) {
    console.error(err);
  }
}