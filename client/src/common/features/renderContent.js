export const renderContent = (data, Video, Img, idx) => {
  if (data.type === "viode/mp4") {
    return (
      <Video autoPlay controls>
        <source src={data.image} type="video/mp4" />
      </Video>
    );
  } else {
    return <Img fig={data.image} key={idx} />;
  }
};
