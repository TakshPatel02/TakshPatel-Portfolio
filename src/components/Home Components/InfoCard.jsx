const InfoCard = () => {
  return (
    <section className="w-full border-b border-border">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <div className="border-x border-border bg-bg-card">
          <div className="flex items-start">
            {/* Circular Avatar */}
            <div className="border-r border-border">
              <img
                src="https://res.cloudinary.com/portfolioblog/image/upload/v1771491501/ghibli_q2zccw.png"
                alt="Taksh Patel"
                className="h-[125px] w-[125px] flex-shrink-0 rounded-full border border-border object-cover sm:h-[150px] sm:w-[150px]"
              />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col mt-8 sm:mt-20">
              {/* Name */}
              <div className="flex items-center gap-2 border-y border-border">
                <h2 className="font-display text-lg font-bold text-text-primary sm:text-2xl lg:text-3xl">
                  Taksh Patel
                </h2>
              </div>

              {/* Tagline */}
              <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
                Creating with code. Small details matter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoCard;
