import React from 'react';

function MyOptionalVideo() {
  return (
    <section className="optional-video">
      <iframe
        className="myiframe"
        src="https://www.youtube.com/embed/97b2YF7RtQU?si=JYTDJKkqbzj1LGmI"
        title="YouTube video player"
        frameborder="0"
        sandbox
        allow="payment 'none'; camera 'none'; microphone 'none'; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
        
      <iframe
        className="myiframe"
        src="https://www.youtube.com/embed/5voYKb-8BzY?si=mqCL-O2Nbujd8xAP"
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
