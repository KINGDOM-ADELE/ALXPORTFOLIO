import React from 'react';

function MyOptionalVideo() {
  return (
    <section className="optional-video">
      <iframe
        className="myiframe"
        src="https://www.youtube.com/embed/88cdrM5XkMM?si=Qmwka7CJBH9IvFw-"
        title="YouTube video player"
        frameborder="0"
        sandbox
        allow="payment 'none'; camera 'none'; microphone 'none'; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </section>
  );
}

export default MyOptionalVideo;
