const previewImage = (e: any, setImagePreview: any, setImage: any) => {
  const file = e.target.files[0];
  // console.log(file);
  e.target.value = "";
  setImage(file);

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    console.log(reader.result);
    setImagePreview(reader.result);
  };
};

export default previewImage;
