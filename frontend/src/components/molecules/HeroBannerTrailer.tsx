const HeroBannerTrailer = ({ trailerUrl }: { trailerUrl: string }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full after:absolute after:inset-0 after:bg-linear-to-t after:from-page-header-bg after:to-transparent">
      <iframe
        src={trailerUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="w-full h-full object-cover object-center"
      ></iframe>
    </div>
  );
};

export default HeroBannerTrailer;
